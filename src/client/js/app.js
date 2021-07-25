const streamSaver = require("streamsaver");
const yj = require("yieldable-json");
const renderer = require("../lib/renderer.js");
const dom = require("../../../lib/dom.js");
const events = require("../../../lib/events.js");
const vector = require("../../../lib/vector.js");
const shape = require("../../../lib/shape.js");
const mouse = require("../../../lib/mouse.js");
const key = require("../../../lib/key.js");
const utils = require("../../../lib/utils.js");
const config = require("../../../lib/config.js");
const vue = require("./vue/vue.js");
const rigModel = require("../lib/rig.model.js");
const history = require("../lib/history.js");
const extractKeyframes = require("../lib/extract.keyframes.js");
events.emit("loadedApps", vue);

//Adding joint affects all frames

window.rigModel = rigModel;

let jointCrop,
	activePane,
	materials = [],
	sleep = false,
	showOverlay = true,
	mirror = null,
	cameraDistance = config.world.zoom,
	cameraMovement = vector(),
	mouseLast = vector(),
	worldMouse = vector(),
	actions = {
		pan: "pan",
		select: "select",
		add: "add",
		move: "move",
		remove: "remove"
	},
	shortcuts = {
		KeyQ: actions.pan,
		KeyW: actions.select,
		KeyE: actions.move,
		KeyR: actions.add,
		KeyT: actions.remove
	},
	actionIconPaths = {},
	action = actions.pan;

actionIconPaths.add = "assets/svg/joint-plus.svg";
actionIconPaths.select = "assets/svg/joint-click.svg";
actionIconPaths.move = "assets/svg/joint-arrow.svg";
actionIconPaths.remove = "assets/svg/joint-trash.svg";
actionIconPaths.pan = "assets/svg/quad-arrow.svg";

//Add action button click event
const actionButtons = {
	add: dom.query("#addJoint"),
	select: dom.query("#selectJoint"),
	move: dom.query("#moveJoint"),
	remove: dom.query("#removeJoint"),
	pan: dom.query("#panCamera")
};

const actionButtonNames = Object.keys(actionButtons);

function setAction(_action) {
	action = _action;
	rigModel.action = _action;

	dom.query("#toolApp button", true).removeClass("active-tool");
	dom.query(actionButtons[_action].node).addClass("active-tool");
	actionPreview.query("img").prop("src", actionIconPaths[_action]);
}

for (let btn of actionButtonNames) {
	actionButtons[btn].on("click", () => {
		setAction(actions[btn]);
	});
}

//Disable some default events
const _preventDefault = e => e.preventDefault();
dom.query(document).on("contextmenu", _preventDefault);
dom.query("div", true).on("drag", _preventDefault);
dom.query("div", true).on("dragstart", _preventDefault);

//Add material/images events
const materialApp = dom.query("#materialApp");
const materialsComboBox = dom.query("#propertyApp #materials");

function configMaterial(id) {
	let mat = materials.find(m => m.id === id);
	if (mat) {
		materialsComboBox.value(mat.src);
		materialsComboBox.query("label", true).text(mat.file.name, true);
		events.emit("materialChange", materialsComboBox.value());
	}
}

function createMaterial(file) {
	const id = utils.uid();
	let fileURL = URL.createObjectURL(file);
	let button = dom.create("button");
	let img = button.create("img");

	button.addClass("item");
	img.attr("src", fileURL);

	button.node.addEventListener("click", () => {
		configMaterial(id);
	});

	materialApp.append(button);

	let option = materialsComboBox.query(".options").create("p");
	option.node.dataset.value = fileURL;
	option.node.dataset.parentId = "#materials";
	option.text(file.name);

	materialApp.node.scrollTop = materialApp.node.scrollHeight;

	return {
		id: id,
		file: file,
		src: fileURL,
		el: button
	};
}

function handleMaterialFiles(files) {
	const validImageTypes = ["image/gif", "image/jpeg", "image/png", "image/svg+xml"];
	for (var i = 0; i < files.length; i++) {
		let file = files[i];
		let exists;
		for (var j = 0; j < materials.length; j++) {
			let mat = materials[j];
			if (mat.file.name == file.name && mat.file.lastModified == file.lastModified && mat.file.size == file.size && mat.file.type == file.type) {
				exists = mat;
				break;
			}
		}

		if (validImageTypes.includes(file.type)) {
			let material = createMaterial(file);
			materials.push(material);
		}

		if (exists) {
			exists.el.remove();
		}
	}
}

//Custom checkbox
let checkBoxes = dom.query(".checkbox.checked", true);
for (var i = 0; i < checkBoxes.elements.length; i++) {
	let chkbox = checkBoxes.elements[i];
	chkbox.node.parentNode.checked = true;
}

dom.query(".custom-checkbox", true).on("click", event => {
	let el = dom.query(event.target).query(".checkbox");
	el.toggleClass("checked");
	dom.query(event.target).prop("checked", el.hasClass("checked"));

	//
	if (event.target.id == "animateSkin") {
		config.animateSkin = el.hasClass("checked");
	}
});

//Custom select
const selectOptions = dom.query("#selectOptions");
selectOptions.on("mousedown", event => {
	let value = event.target.dataset.value;
	let parentId = event.target.dataset.parentId;
	let parent = dom.query(parentId);
	parent.value(value);
	parent.query("label").text(event.target.innerText, true);

	if (parentId == "#materials") events.emit("materialChange", value);
});

dom.query("#propertyApp").on("mousewheel", () => {
	selectOptions.css("display", "none");
});

dom.query(".custom-select", true).on("mouseup", event => {
	let options = dom.query(event.target, true).query(".options");
	selectOptions.html(options.html(), true);
	if (selectOptions.node.style.display != "flex") {
		let parentBounds = options.node.parentNode.getBoundingClientRect();

		let x = parentBounds.x;
		let y = parentBounds.y + parentBounds.height + 5;

		selectOptions.css({
			display: "flex",
			left: `${x}px`,
			top: `${y}px`,
			width: `${parentBounds.width}px`
		});

		let selectOptionBounds = selectOptions.node.getBoundingClientRect();

		if (y + selectOptionBounds.height >= innerHeight) {
			selectOptions.css("top", `${parentBounds.y - selectOptionBounds.height - 5}px`);
		}

		if (x + selectOptionBounds.width >= innerWidth) {
			selectOptions.css("left", `${parentBounds.x - selectOptionBounds.width + parentBounds.width}px`);
		}
	} else {
		selectOptions.css("display", "none");
	}
});

materialApp.on("drop", event => {
	event.preventDefault();
	let files = event.dataTransfer.files;
	handleMaterialFiles(files);
	dom.query("#dropIcon").css("visibility", "hidden");
});

const addMaterialButton = dom.query("#addMaterial");
addMaterialButton.on("change", () => {
	let files = addMaterialButton.node.files;
	handleMaterialFiles(files);
});

materialApp.on("dragenter", event => {
	dom.query("#dropIcon").css("visibility", "visible");
});

materialApp.on("dragleave", event => {
	dom.query("#dropIcon").css("visibility", "hidden");
});

materialApp.on("dragover", event => {
	event.preventDefault();
});

materialApp.on("mousedown", event => {
	for (var i = 0; i < materialApp.node.children.length; i++) {
		let child = materialApp.node.children[i];
		child.classList.remove("selected");
	}
});

let overlayFrames = [];
events.on("saveProject", filename => {
	let btn = dom.query("#download");
	btn.addClass("disabled");
	btn.text("Processing...", true);

	let model = rigModel.toJSON(null, true);
	let config = {
		frameCount: vue.timeline.app.totalFrames,
		animationSpeed: vue.timeline.app.animationSpeed,
		start: vue.timeline.graph.playbackHandle.start.mark,
		end: vue.timeline.graph.playbackHandle.end.mark,
		overlay: {
			opacity: vue.overlayConfigApp.opacity,
			scale: vue.overlayConfigApp.scale,
			angle: vue.overlayConfigApp.angle,
			trimStart: vue.overlayConfigApp.trimStart,
			trimEnd: vue.overlayConfigApp.trimEnd,
			start: vue.overlayConfigApp.start
		}
	};

	let overlay = [];

	for (var i = 0; i < overlayFrames.length; i++) {
		let img = overlayFrames[i];
		overlay.push(img.src);
	}

	let data = {
		model: model,
		config: config,
		overlay: overlay
	};

	yj.stringifyAsync(data, (err, str) => {
		try {
			const uInt8 = new TextEncoder().encode(str);
			const fileStream = streamSaver.createWriteStream(`${filename}.rigme`);

			new Response(str).body
				.pipeTo(fileStream)
				.then(success => {

				}, error => {
					console.warn(error);
				});
		} catch (e) {
			console.warn(e);
		}

		dom.query("#download").removeClass("disabled");
		btn.text("Save", true);
	});
});

window.onunload = () => {
	writableStream.abort();
}

events.on("loadProject", data => {
	if (data.model) {
		let model = rigModel.fromJSON(data.model);
		rigModel.reset();
		rigModel.import(model);
	} else {
		console.warn("Couldn't load model.");
	}

	if (data.config) {
		if (typeof data.config.frameCount == "number") {
			document.getElementById("frameCount").value = data.config.frameCount;
		}

		if (typeof data.config.animationSpeed == "number") {
			document.getElementById("animationSpeed").value = data.config.animationSpeed;
		}

		vue.timeline.app.fixData();

		if (typeof data.config.start == "number") {
			vue.timeline.graph.playbackHandle.start.mark = data.config.start;
		}

		if (typeof data.config.end == "number") {
			vue.timeline.graph.playbackHandle.end.mark = data.config.end;
		}

		vue.timeline.graph.redraw();

		if (typeof data.config.overlay.opacity == "number") {
			vue.overlayConfigApp.opacity = data.config.overlay.opacity;
		}

		if (typeof data.config.overlay.scale == "number") {
			vue.overlayConfigApp.scale = data.config.overlay.scale;
		}

		if (typeof data.config.overlay.angle == "number") {
			vue.overlayConfigApp.angle = data.config.overlay.angle;
		}

		vue.overlayConfigApp.updateSliders();

		if (typeof data.config.overlay.trimStart == "number") {
			vue.overlayConfigApp.trimStart = data.config.overlay.trimStart;
		}

		if (typeof data.config.overlay.trimEnd == "number") {
			vue.overlayConfigApp.trimEnd = data.config.overlay.trimEnd;
		}

		if (typeof data.config.overlay.start == "number") {
			vue.overlayConfigApp.start = data.config.overlay.start;
		}
	} else {
		console.warn("Couldn't load configurations.");
	}

	if (data.overlay) {
		if (data.overlay.length > 0) {
			overlayFrames = [];
			vue.optionApp.overlayConfigHidden = false;
			for (var i = 0; i < data.overlay.length; i++) {
				let src = data.overlay[i];
				let img = new Image();
				img.src = src;
				overlayFrames.push(img);
			}
		}
	} else {
		console.warn("Couldn't load overlay.");
	}

	history.add({
		label: "Load",
		value: rigModel.clone(),
		group: "keyframe"
	});
});

events.on("extractFrames", (url, options) => {
	overlayFrames = [];
	let progressBarWrapper = document.getElementById("progressBarWrapper");
	progressBarWrapper.style.display = "flex";
	let progressBar = document.getElementById("progressBar");
	let cancelButton = document.querySelector("#progressBarWrapper button");

	let interval, cancelled;

	function done() {
		progressBarWrapper.style.display = "none";
		progressBar.style.width = "0";
		clearInterval(interval);
		interval = undefined;
		cancelButton.onclick = null;
		vue.optionApp.overlayConfigHidden = false;

		events.emit("overlayFrames", overlayFrames);
	}

	extractKeyframes(url, {
		frameCount: options.frameCount,
		frameRate: options.frameRate,
		start: options.start,
		end: options.end,
		quality: options.quality,
		drop: false,
		progress: function(img, pct) {
			if (cancelled) {
				this.drop = true;
			} else {
				overlayFrames.push(img);
				progressBar.style.width = `${pct}%`;
			}
		},
		done: function(images) {
			overlayFrames = images;
			done();
		}
	});

	cancelButton.onclick = function() {
		cancelled = true;
	};
});

events.on("removeOverlay", () => {
	overlayFrames = [];
	vue.optionApp.overlayConfigHidden = true;
});


events.on("exportSpritesheet", options => {
	let canvas = document.createElement("canvas");
	canvas.width = options.cellWidth * options.cols;
	canvas.height = options.cellHeight * options.rows;
	let ctx = canvas.getContext("2d");
	let lastExistingFrame;
	for (var frame = options.start - 1; frame <= options.end - 1; frame++) {
		let index = frame - options.start + 1;
		let x = Math.floor(index % options.cols) * options.cellWidth;
		let y = Math.floor(index / options.cols) * options.cellHeight;

		let keyframe = rigModel.keyframes[frame];
		if (keyframe) {
			lastExistingFrame = frame;
			rigModel.updateSkin(keyframe.joints);
		}

		rigModel.renderTo(ctx, {
			frame: rigModel.keyframes[frame] ? frame : lastExistingFrame,
			position: {
				x: x,
				y: y
			},
			showSkin: options.showSkin,
			showBones: options.showBones
		});
	}

	let img = canvas.toDataURL("image/png");
	let link = document.createElement("a");
	link.download = options.name;
	link.href = img;
	link.click();
});

events.on("exportFrames", options => {
	let btn = dom.query("#exportFrames");
	btn.text("Processing...", true);
	btn.addClass("disabled");
	let counter = 0,
		totalSize = 0;
	const readableZipStream = new ZIP({
		start(ctrl) {
			let lastExistingFrame;
			for (var frame = options.start - 1; frame <= options.end - 1; frame++) {
				let canvas = document.createElement("canvas");
				canvas.width = options.frameWidth;
				canvas.height = options.frameHeight;
				let ctx = canvas.getContext("2d");

				let index = frame - options.start + 1;
				let keyframe = rigModel.keyframes[frame];
				if (keyframe) {
					lastExistingFrame = frame;
					rigModel.updateSkin(keyframe.joints);
				}

				rigModel.renderTo(ctx, {
					frame: rigModel.keyframes[frame] ? frame : lastExistingFrame,
					showSkin: options.showSkin,
					showBones: options.showBones
				});

				canvas.toBlob(blob => {
					let file = {
						name: `frames/${index}.png`,
						stream: () => blob.stream()
					};

					ctrl.enqueue(file);

					counter++;
					totalSize += blob.size;

					if (counter >= options.totalFrames) {
						ctrl.close();

						const fileStream = streamSaver.createWriteStream(options.name + ".zip", {
							size: totalSize
						});

						readableZipStream.pipeTo(fileStream);
						btn.text("Export", true);
						btn.removeClass("disabled");
					}
				}, "image/png");
			}
		}
	});
});

events.on("exportGIF", options => {
	let btn = dom.query("#exportGIF");
	btn.text("Processing...", true);
	btn.addClass("disabled");
	const gif = new GIF({
		workers: 4,
		quality: 10,
		repeat: 0,
		width: options.width,
		height: options.height,
		dither: true,
		workerScript: "lib/gif.worker.js"
	});

	let lastExistingFrame;
	for (var frame = options.start - 1; frame <= options.end - 1; frame++) {
		let canvas = document.createElement("canvas");
		canvas.width = options.width;
		canvas.height = options.height;
		let ctx = canvas.getContext("2d");
		let keyframe = rigModel.keyframes[frame];
		if (keyframe) {
			lastExistingFrame = frame;
			rigModel.updateSkin(keyframe.joints);
		}

		ctx.fillStyle = options.background;
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		rigModel.renderTo(ctx, {
			frame: rigModel.keyframes[frame] ? frame : lastExistingFrame,
			showSkin: options.showSkin,
			showBones: options.showBones
		});

		gif.addFrame(canvas, {
			delay: 1000 / vue.timeline.app.animationSpeed
		});
	}

	gif.render();

	gif.on("finished", blob => {
		try {
			gif.abort();
			btn.text("Export", true);
			btn.removeClass("disabled");

			const fileStream = streamSaver.createWriteStream(`${options.name}.gif`, {
				size: blob.size
			});
			const readableStream = blob.stream();
			if (window.WritableStream && readableStream.pipeTo) {
				return readableStream.pipeTo(fileStream);
			}
		} catch (e) {
			console.warn(e);
		}
	});
});

const rigModeBtns = dom.query("#riggingMode button", true);
rigModeBtns.on("click", event => {
	rigModeBtns.removeClass("selected");;
	let btn = dom.query(event.target);
	btn.addClass("selected");

	if (btn.node.id == "inverseKinematics") {
		config.riggingMode = "inverseKinematics";
	} else if (btn.node.id == "forwardKinematics") {
		config.riggingMode = "forwardKinematics";
	} else {
		config.riggingMode = "linear";
	}
});

const autoAddKeyframeBtn = dom.query("#autoAddKeyframe");
autoAddKeyframeBtn.on("click", () => {
	autoAddKeyframeBtn.toggleClass("selected");

	if (autoAddKeyframeBtn.hasClass("selected")) {
		config.animation.autoAddKeyframe = true;
	} else {
		config.animation.autoAddKeyframe = false;
	}
});

dom.query("#focusRig").on("click", () => {
	if (rigModel.bounds) {
		if (!rigModel.joints.length) return;
		cameraMovement.x = (rigModel.bounds.min.x + rigModel.bounds.max.x) / 2;
		cameraMovement.y = (rigModel.bounds.min.y + rigModel.bounds.max.y) / 2;
	}
});

const cropBtn = dom.query("#displayCropApp");
cropBtn.on("click", () => {
	let activeJoint = rigModel.activeJoint;
	if (activeJoint) {
		if (activeJoint.skin) {
			if (activeJoint.skin.imageSrc) {
				let img = new Image();
				img.src = activeJoint.skin.imageSrc;

				img.onload = function() {
					if (activeJoint.skin._vueCrop) {
						vue.cropApp.cropFrom = activeJoint.skin._vueCrop.from;
						vue.cropApp.cropTo = activeJoint.skin._vueCrop.to;
					}

					vue.cropApp.show(img);
					jointCrop = activeJoint;
				}
			}
		}
	}
});

dom.query("#removeSkin").on("click", () => {
	let activeJoint = rigModel.activeJoint;
	if (activeJoint) {
		if (activeJoint.skin) {
			if (activeJoint.skin.imageSrc) {

				let skin = JSON.parse(JSON.stringify(activeJoint.skin));

				delete skin.imageSrc;
				delete skin.image;

				rigModel.editJoint(activeJoint.id, {
					skin: skin
				});

				history.add({
					label: "Remove joint skin",
					value: rigModel.clone(),
					group: "keyframe"
				});
			}
		}
	}
});

dom.query("#resetOffset").on("click", () => {
	let activeJoint = rigModel.activeJoint;
	if (activeJoint) {
		if (activeJoint.skin) {
			if (activeJoint.skin.offset) {
				if (activeJoint.skin.offset.x != 0 || activeJoint.skin.offset.y != 0 || activeJoint.skin.offset.scaleX != 1 || activeJoint.skin.offset.scaleY != 1 || activeJoint.skin.offset.angle != 0) {

					let skin = JSON.parse(JSON.stringify(activeJoint.skin));

					skin.offset.x = 0;
					skin.offset.y = 0;
					skin.offset.scaleX = 1;
					skin.offset.scaleY = 1;
					skin.offset.angle = 0;

					rigModel.editJoint(activeJoint.id, {
						skin: skin
					}, true);

					setJointProperties(activeJoint);

					history.add({
						label: "Reset transform offset",
						value: rigModel.clone(),
						group: "keyframe"
					});

					rigModel.updateSkin();
					rigModel.updateBounds();
				}
			}
		}
	}
});

events.on("crop", (crop, _vueCrop) => {
	rigModel.editJoints((joint, frame) => {
		if (joint.id === jointCrop.id) {
			joint.skin.crop = JSON.parse(JSON.stringify(crop));
			joint.skin._vueCrop = {
				from: {
					x: _vueCrop.from.x,
					y: _vueCrop.from.y
				},
				to: {
					x: _vueCrop.to.x,
					y: _vueCrop.to.y
				}
			}

			rigModel.updateSkin(frame.joints);
		}
	});

	rigModel.updateSubKeyframes();
	rigModel.updateBounds();

	history.add({
		label: "Crop skin",
		value: rigModel.clone(),
		group: "keyframe"
	});
});

events.on("materialChange", url => {
	let activeJoint = rigModel.activeJoint;
	if (url) {
		cropBtn.removeClass("disabled");
	} else {
		cropBtn.addClass("disabled");
		return;
	}

	utils.loadImage(url).then(res => {
		if (activeJoint) {
			let x = parseFloat(dom.query("#skinPositionX").value());
			let y = parseFloat(dom.query("#skinPositionY").value());
			let scaleX = parseFloat(dom.query("#skinScaleX").value());
			let scaleY = parseFloat(dom.query("#skinScaleY").value());
			let angle = parseFloat(dom.query("#skinAngle").value());

			let crop = {
				from: {
					x: 0,
					y: 0
				},
				to: {
					x: res.width,
					y: res.height
				}
			};

			if (activeJoint.skin) {
				if (activeJoint.skin.crop) {
					crop.from.x = activeJoint.skin.crop.from.x;
					crop.from.y = activeJoint.skin.crop.from.y;
					crop.to.x = activeJoint.skin.crop.to.x;
					crop.to.y = activeJoint.skin.crop.to.y;
				}

				activeJoint.skin.offset = {
					x: x || 0,
					y: y || 0,
					scaleX: scaleX || 0,
					scaleY: scaleY || 0,
					angle: utils.radians(utils.map(angle, 0, 360, -180, 180)) + Math.PI || 0
				};
			}

			rigModel.editJoints((joint, frame) => {
				if (joint.id === activeJoint.id) {
					joint.skin.imageSrc = res.url;
					joint.skin.image = new Image();
					joint.skin.image.src = res.url;
					joint.skin.crop = JSON.parse(JSON.stringify(crop));

					let _vc = activeJoint.skin._vueCrop;
					if (typeof _vc == "object" && _vc) {
						joint.skin._vueCrop = JSON.parse(JSON.stringify(_vc)) || null;
					}

					rigModel.updateSkin(frame.joints);
				}
			});

			rigModel.updateSubKeyframes();
			rigModel.updateBounds();

			history.add({
				label: "Change skin",
				value: rigModel.clone(),
				group: "keyframe"
			});
		}
	});
});

function createJointElement(id, name) {
	let jointEl = dom.create("div");
	jointEl.addClass("joint");
	let jointBtn = jointEl.create("button");
	jointBtn.addClass("name", "darko-d");
	let jointImg = jointBtn.create("img");
	jointImg.attr("src", "assets/svg/joint.svg");
	let jointText = jointBtn.create("p");
	jointText.text(name);
	let childWrapper = jointEl.create("div");
	childWrapper.addClass("children");

	jointEl.attr("id", id);

	dom.query("#jointApp button.name.active", true).removeClass("active");

	let joint = rigModel.joints.find(j => j.id === id);
	if (joint) {
		if (rigModel.activeJoint == joint) {
			jointBtn.addClass("active");
		}
	}

	let jointApp = dom.query("#jointApp");
	jointApp.node.scrollTop = jointApp.node.scrollHeight;
	jointApp.node.scrollLeft = jointApp.node.scrollWidth;

	jointBtn.on("click", () => {
		if (!jointBtn.hasClass("active")) {
			let prev = dom.query("#jointApp button.name.active");
			prev.removeClass("active");
			jointBtn.addClass("active");

			let joint = rigModel.joints.find(j => j.id === id);
			if (joint) {
				rigModel.selectJoint(joint.position.x, joint.position.y);
			}
		}

		if (vue.timeline.graph.state.isPlaying) {
			vue.timeline.graph.stop();
		}

		activePane = "joints";
	});

	jointBtn.on("dblclick", () => {
		cameraMovement.set(rigModel.activeJoint.position);
	});

	return jointEl;
}

function setJointProperties(joint) {
	let propertyApp = dom.query("#propertyApp");
	if (joint) {
		if (!vue.timeline.graph.state.isPlaying) {
			propertyApp.removeClass("disabled");
		}

		//Prop
		let nameEl = propertyApp.query("#jointName");
		let lengthEl = propertyApp.query("#jointLength");
		let zIndexEl = propertyApp.query("#jointZIndex");
		nameEl.value(joint.name);
		lengthEl.value(joint.length.toFixed(2));
		zIndexEl.value(parseInt(joint.zIndex));

		if (!zIndexEl.node._lastValue) {
			zIndexEl.node._lastValue = zIndexEl.value();
		}

		if (!nameEl.node._lastValue) {
			nameEl.node._lastValue = nameEl.value();
		}

		//Transform
		let xEl = propertyApp.query("#jointX");
		let yEl = propertyApp.query("#jointY");
		let angleEl = propertyApp.query("#jointAngle");

		xEl.value(joint.position.x.toFixed(2));
		yEl.value(joint.position.y.toFixed(2));
		let jointAngle = utils.degrees(utils.map(joint.angle, -Math.PI, Math.PI, 0, Math.PI * 2));
		angleEl.value(jointAngle.toFixed(2));

		//Skinning
		if (joint.skin) {
			if (joint.skin.imageSrc) {
				cropBtn.removeClass("disabled");
			} else {
				cropBtn.addClass("disabled");
			}

			if (joint.skin.offset) {
				let x = dom.query("#skinPositionX");
				let y = dom.query("#skinPositionY");
				let scaleX = dom.query("#skinScaleX");
				let scaleY = dom.query("#skinScaleY");
				let angle = dom.query("#skinAngle");

				x.value(joint.skin.offset.x.toFixed(2));
				y.value(joint.skin.offset.y.toFixed(2));
				scaleX.value(joint.skin.offset.scaleX.toFixed(2));
				scaleY.value(joint.skin.offset.scaleY.toFixed(2));
				let offsetAngle = utils.degrees(joint.skin.offset.angle);
				angle.value(offsetAngle.toFixed(2));

				if (!x.node._lastValue) {
					x.node._lastValue = x.value();
				}
				if (!y.node._lastValue) {
					y.node._lastValue = y.value();
				}
				if (!scaleX.node._lastValue) {
					scaleX.node._lastValue = scaleX.value();
				}
				if (!scaleY.node._lastValue) {
					scaleY.node._lastValue = scaleY.value();
				}
				if (!angle.node._lastValue) {
					angle.node._lastValue = angle.value();
				}
			}
		}
	} else {
		propertyApp.addClass("disabled");
	}
}

events.on("timelineSeeked", () => {
	if (vue.timeline.graph.state.isPlaying) return;
	let activeJoint = rigModel.activeJoint;
	if (activeJoint) {
		setJointProperties(activeJoint);
	}

	events.emit("jointChange", rigModel.joints);

	activePane = "timeline";
});

events.on("jointChange", joints => {
	joints = joints || rigModel.joints;
	//Joint Pane >
	//Adding elements
	let jointApp = dom.query("#jointApp");
	for (var i = 0; i < joints.length; i++) {
		let joint = joints[i];
		//Check if it exists in dom
		let check = jointApp.query("#" + joint.id);
		if (!check.node) {
			let el = createJointElement(joint.id, joint.name);
			jointApp.append(el);
		}
	}

	//Fix each element hierarchy
	let jointAppChildren = dom.query("#jointApp > *", true);
	for (var i = 0; i < jointAppChildren.elements.length; i++) {
		let el = jointAppChildren.elements[i];
		let joint = joints.find(j => j.id === el.node.id);
		//Search for parent
		if (joint) {
			if (joint.parent) {
				let parentEl = dom.query("#" + joint.parent.id + " > .children");
				parentEl.append(el);
			}
		}
	}

	//Updating elements
	let jointAppJoints = dom.query("#jointApp .joint", true);
	for (var i = 0; i < jointAppJoints.elements.length; i++) {
		let el = jointAppJoints.elements[i];
		let rigJoint = rigModel.joints.find(j => j.id === el.node.id);
		if (!rigJoint) {
			let parentEl = dom.query(el.node.parentNode.parentNode);

			//If a joint is deleted, its parent element will inherit its children elements
			if (parentEl) {
				let newParent;
				if (parentEl.hasClass("joint")) {
					newParent = dom.query("#" + parentEl.node.id + " > .children");
				} else {
					newParent = dom.query("#jointApp");
				}

				let children = dom.query("#" + el.node.id + " > .children > .joint", true);
				newParent.append(children);
			}

			el.remove();
		} else {
			if (el.node.id === rigModel.activeJoint.id) {
				el.query("button.name", true).addClass("active");
			} else {
				el.query("button.name.active", true).removeClass("active");
			}

			el.query("button.name").text(rigJoint.name, true);
		}
	}

	//Properties Pane >
	let activeJoint = rigModel.activeJoint;
	setJointProperties(activeJoint);

	//Hide angle, length, & skinning properties if there's no parent
	if (rigModel.activeJoint) {
		if (!rigModel.activeJoint.parent) {
			dom.query(dom.query("#jointAngle").node.parentNode).css("display", "none");
			dom.query(dom.query("#jointLength").node.parentNode).css("display", "none");
			dom.query(".section.skinning").css("display", "none");
		} else {
			dom.query(dom.query("#jointAngle").node.parentNode).css("display", "flex");
			dom.query(dom.query("#jointLength").node.parentNode).css("display", "flex");
			dom.query(".section.skinning", true).css("display", "flex");
		}
	}
});

events.on("jointNameInputChange", ignoreHistory => {
	let activeJoint = rigModel.activeJoint;
	if (activeJoint) {
		let name = dom.query("#jointName").value();
		activeJoint.name = name;

		rigModel.editJoint(activeJoint.id, {
			name: name
		});

		events.emit("jointChange");

		if (!ignoreHistory) {
			history.add({
				label: "Change joint name",
				value: rigModel.clone(),
				group: "keyframe"
			});
		}
	}
});

events.on("jointZIndexInputChange", ignoreHistory => {
	let activeJoint = rigModel.activeJoint;
	if (activeJoint) {
		let zIndex = dom.query("#jointZIndex").value();
		activeJoint.zIndex = zIndex;

		rigModel.editJoint(activeJoint.id, {
			zIndex: zIndex
		});

		events.emit("jointChange");

		if (!ignoreHistory) {
			history.add({
				label: "Change joint Z-Index",
				value: rigModel.clone(),
				group: "keyframe"
			});
		}
	}
})

events.on("jointSkinningInputChange", ignoreHistory => {
	let activeJoint = rigModel.activeJoint;
	if (activeJoint) {
		let activeJointSkin = activeJoint.skin;
		let x = parseFloat(dom.query("#skinPositionX").value());
		let y = parseFloat(dom.query("#skinPositionY").value());
		let scaleX = parseFloat(dom.query("#skinScaleX").value());
		let scaleY = parseFloat(dom.query("#skinScaleY").value());
		let angle = parseFloat(dom.query("#skinAngle").value());

		activeJointSkin.offset = {
			x: x,
			y: y,
			scaleX: scaleX,
			scaleY: scaleY,
			angle: utils.radians(utils.map(angle, 0, 360, -180, 180)) + Math.PI
		};

		if (!config.animateSkin) {
			rigModel.editJoint(activeJoint.id, {
				skin: activeJointSkin
			}, true);
		}

		if (!ignoreHistory) {
			history.add({
				label: "Change skin offset",
				value: rigModel.clone(),
				group: "keyframe"
			});
		}

		rigModel.updateSubKeyframes();
		rigModel.updateBounds();
	}
});

events.on("jointPositionInputChange", () => {
	let activeJoint = rigModel.activeJoint;
	if (activeJoint) {
		let x = parseFloat(dom.query("#jointX").value()) || 0;
		let y = parseFloat(dom.query("#jointY").value()) || 0;
		rigModel.moveJoint(x, y);
	}
});

events.on("jointAngleInputChange", () => {
	let activeJoint = rigModel.activeJoint;
	if (activeJoint) {
		if (activeJoint.parent) {
			let angle = parseFloat(dom.query("#jointAngle").value()) || 0;
			angle = utils.radians(utils.map(angle, 0, 360, -180, 180));
			let x = activeJoint.parent.position.x - Math.cos(angle) * activeJoint.length;
			let y = activeJoint.parent.position.y - Math.sin(angle) * activeJoint.length;
			rigModel.moveJoint(x, y);
		}
	}
});

events.on("jointLengthInputChange", () => {
	let activeJoint = rigModel.activeJoint;
	if (activeJoint) {
		let length = parseFloat(dom.query("#jointLength").value()) || 0;
		activeJoint.length = length;
		rigModel.moveJoint(activeJoint.position.x, activeJoint.position.y);
	}
});

function addHistoryEl(event) {
	let parent = dom.query("#historyApp");
	parent.query(".history.current", true).removeClass("current");
	let historyEl = parent.create("div");
	historyEl.attr("id", event.id);
	historyEl.addClass("history", "current");
	let descEl = historyEl.create("p");
	descEl.text(event.label);
	parent.node.scrollTop = parent.node.scrollHeight;

	historyEl.on("click", () => {
		if (event.group == "keyframe") {
			parent.query(".history.current", true).removeClass("current");
			historyEl.addClass("current");

			history.jump(event.id);
			rigModel.import(event.value);

			vue.timeline.graph.updateState();
			vue.timeline.graph.redraw();

			setJointProperties(rigModel.activeJoint);


			if (vue.timeline.graph.state.isPlaying) {
				vue.timeline.graph.stop();
			}
		}
	});
}

events.on("undo", () => {
	let prev = history.getPrevious();
	if (!prev) return;
	if (prev.group == "keyframe") {
		rigModel.import(prev.value);
		history.backward();

		vue.timeline.graph.updateState();
		vue.timeline.graph.redraw();

		setJointProperties(rigModel.activeJoint);
	}

	dom.query(".history.current", true).removeClass("current");
	let newCurrent = dom.query("#" + prev.id);
	newCurrent.addClass("current");
	let parent = dom.query("#historyApp");
	parent.node.scrollTop = newCurrent.node.offsetTop;
});

events.on("redo", () => {
	let next = history.getNext();
	if (!next) return;
	if (next.group == "keyframe") {
		rigModel.import(next.value);
		history.forward();

		vue.timeline.graph.updateState();
		vue.timeline.graph.redraw();

		setJointProperties(rigModel.activeJoint);
	}

	dom.query(".history.current", true).removeClass("current");
	let newCurrent = dom.query("#" + next.id);
	newCurrent.addClass("current");
	let parent = dom.query("#historyApp");
	parent.node.scrollTop = newCurrent.node.offsetTop;
});

events.on("historyChange", () => {
	//Autosave
	if (history.eventCount % config.autosave.threshold == 0) {
		let model = rigModel.toJSON(null, true);
		localStorage.setItem(config.autosave.label, JSON.stringify(model));
	}

	//Remove elements that aren't in the history anymore
	let historyElements = dom.query("#historyApp .history", true);
	for (var i = 0; i < historyElements.elements.length; i++) {
		let el = historyElements.elements[i].node;
		let event = history.events.find(e => e.id === el.id);
		if (!event) {
			el.remove();
		}
	}

	let latest = history.getLatest();
	addHistoryEl(latest);
});

//Loading autosaved data
utils.loadJSONData(config.autosave.label, data => {
	rigModel.import(rigModel.fromJSON(data));

	history.add({
		label: "Load autosave",
		value: rigModel.clone(),
		group: "keyframe"
	});
});

events.on("clearJoints", () => {
	if (rigModel.joints.length) {
		dom.query("#jointApp *").remove();
	}
	rigModel.reset();
	dom.query("#propertyApp").addClass("disabled");
});

events.on("resetTimeline", () => {
	//Config
	document.getElementById("frameCount").value = 30;
	document.getElementById("animationSpeed").value = 30;
	vue.timeline.app.fixData();

	//Scrollbar
	vue.timeline.graph.scrollbar.left = 0;
	vue.timeline.graph.scrollbar.right = vue.timeline.graph.canvas.width;
	vue.timeline.graph.scrollbar.width = vue.timeline.graph.canvas.width;

	//Timeline
	vue.timeline.graph.setCurrentMark(0);
	vue.timeline.graph.playbackHandle.start.mark = 0;
	vue.timeline.graph.playbackHandle.start._x = vue.timeline.graph.markToX(vue.timeline.graph.playbackHandle.start.mark);
	vue.timeline.graph.playbackHandle.end.mark = vue.timeline.app.totalFrames - 1;
	vue.timeline.graph.playbackHandle.end._x = vue.timeline.graph.markToX(vue.timeline.graph.playbackHandle.end.mark);

	vue.timeline.graph.redraw();
});

events.on("resetCamera", () => {
	mouseLast.reset();
	cameraMovement.reset();
	cameraDistance = config.world.zoom;
});

events.on("deleteKeyframe", () => {
	let frame = rigModel.getKeyframe("index", vue.timeline.graph.state.currentFrame);
	if (frame) {
		if (frame.type == "head" && !frame.locked) {
			rigModel.deleteKeyframe(frame.id);
			history.add({
				label: "Delete keyframe",
				value: rigModel.clone(),
				group: "keyframe"
			});
		}
	}
});

events.on("renderSleep", () => {
	sleep = true;
});

events.on("renderFocus", () => {
	sleep = false;
});

dom.query("#fileButton").on("mouseup", function() {
	let fileApp = vue.fileApp;
	if (fileApp.hidden) {
		fileApp.show(mouse.x + 5, mouse.y + 5);
	}
});

dom.query("#optionButton").on("mouseup", function() {
	let optionApp = vue.optionApp;
	if (optionApp.hidden) {
		optionApp.show(mouse.x + 5, mouse.y + 5);
	}
});

let previousAction;
key.on("keydown", function(event) {
	let pickedAction = actions[shortcuts[event.code]];
	if (pickedAction) {
		setAction(pickedAction);
		action = pickedAction;
	}

	if (event.ctrlKey) {
		if (event.keyCode == 90) {
			events.emit("undo");
		}

		if (event.keyCode == 89) {
			events.emit("redo");
		}
	}

	if (event.shiftKey) {
		if (action == actions.add) {
			if (rigModel.activeJoint) {
				if (!mirror) {
					mirror = rigModel.activeJoint;
				}
			}
		}
	}

	if (event.keyCode == 32) {
		if (action != actions.pan) {
			previousAction = action;
			setAction(actions.pan);
		}
	}

	//Delete
	if (event.keyCode == 46) {
		if (activePane == "joints") {
			let activeJoint = rigModel.activeJoint;
			if (activeJoint) {
				rigModel.removeJointById(activeJoint.id);
			}
		} else if (activePane == "timeline") {
			events.emit("deleteKeyframe");
		}
	}
});

key.on("keyup", function(event) {
	if (mirror) mirror = null;

	if (previousAction) {
		setAction(previousAction);
		previousAction = undefined;
	}
});

mouse.on("mouseup", function() {
	if (rigModel._moved) {
		history.add({
			label: "Move joint",
			value: rigModel.clone(),
			group: "keyframe"
		});

		//Properties Pane >
		let activeJoint = rigModel.activeJoint;
		setJointProperties(activeJoint);

		rigModel._moved = false;
	}
});

mouse.on("mousedown", function() {
	vue.fileApp.hide();
	vue.optionApp.hide();
	vue.contextMenuApp.hide();
	selectOptions.css("display", "none");
});

mouse.on("mousemove", function() {
	if (!mouse.dragged) {
		mouseLast.set(worldMouse);
	}

	if (mouse.x <= renderer.bounds.x || mouse.x >= renderer.bounds.x + renderer.bounds.width || mouse.y <= renderer.bounds.y || mouse.y >= renderer.bounds.y + renderer.bounds.height) {
		actionPreview.css("display", "none");
	} else {
		actionPreview.css({
			display: "block",
			top: `${mouse.y - 10}px`,
			left: `${mouse.x + 9}px`
		});
	}
});

let actionPreview = dom.query("#actionPreview");

renderer.canvas.addEventListener("mousemove", function(e) {
	if (mouse.dragged && !sleep) {
		if (action === actions.pan) {
			cameraMovement.set({
				x: mouseLast.x - worldMouse.x + renderer.camera.movement.x,
				y: mouseLast.y - worldMouse.y + renderer.camera.movement.y
			});

			cameraMovement.x = utils.clamp(cameraMovement.x, -9000, 9000);
			cameraMovement.y = utils.clamp(cameraMovement.y, -9000, 9000);
		}
	}

	if (action === actions.move && !sleep) {
		if (mouse.pressed) {
			activePane = "joints";
			rigModel.moveJoint(worldMouse.x, worldMouse.y);
		}
	}
});

renderer.canvas.addEventListener("click", function() {
	if (vue.overlayApp.hidden && vue.overlayConfigApp.hidden && vue.fileApp.hidden && vue.loadApp.hidden && vue.saveApp.hidden && vue.optionApp.hidden) {
		if (action == actions.add) {
			if (mirror) {
				let mirrorX = rigModel.activeJoint.position.x - worldMouse.x + mirror.position.x;
				let joint = rigModel.addJoint(mirrorX, worldMouse.y, {
					parent: mirror,
					ignoreHistory: true,
					ignoreDefaults: true
				});
				mirror = joint;
			}

			rigModel.addJoint(worldMouse.x, worldMouse.y);

			activePane = "joints";
		}

		if (action === actions.remove) {
			rigModel.selectJoint(worldMouse.x, worldMouse.y);
			rigModel.removeJointByPosition(worldMouse.x, worldMouse.y);
			activePane = "joints";
		}

		if (action === actions.select) {
			rigModel.selectJoint(worldMouse.x, worldMouse.y);
			activePane = "joints";
		}
	}
});

renderer.canvas.addEventListener("mousewheel", function() {
	if (mouse.scrollTop) {
		cameraDistance -= 100;
	} else {
		cameraDistance += 100;
	}

	cameraDistance = utils.clamp(cameraDistance, config.world.minZoom, config.world.maxZoom);
});

window.dom = dom;

function fixRendererSize() {
	let toolApp = dom.query("#toolApp");
	let canvasContainer = dom.query(".canvas-container");
	let nav = dom.query("#navigation");
	let width = canvasContainer.node.offsetWidth - 1 - toolApp.node.offsetWidth;
	let height = innerHeight - nav.node.offsetHeight - vue.timeline.app.$el.offsetHeight;
	renderer.setSize(width, height);
}

addEventListener("resize", function() {
	fixRendererSize();
	vue.fileApp.hide();
	vue.optionApp.hide();
	vue.contextMenuApp.hide();
});

fixRendererSize();
renderer.camera.setZoomSpeed(0.2);
renderer.camera.setMoveSpeed(0.4);

let showBounds = dom.query("#showBounds");
let showGrid = dom.query("#showGrid");
renderer.draw(() => {
	let focused = vue.overlayApp.hidden && vue.overlayConfigApp.hidden && vue.fileApp.hidden && vue.loadApp.hidden && vue.saveApp.hidden && vue.optionApp.hidden;

	worldMouse.set(renderer.camera.screenToWorld(mouse.x - renderer.bounds.x, mouse.y - renderer.bounds.y));

	//Background
	renderer.rect(0, 0, renderer.bounds.width, renderer.bounds.height, {
		fill: config.world.background
	});

	renderer.camera.begin(function() {
		renderer.camera.moveTo(cameraMovement.x, cameraMovement.y);
		renderer.camera.zoomTo(cameraDistance);

		//Draw overlay
		let overlayFramesOffset = new Array(vue.overlayConfigApp.start - 1);
		let trimStart = vue.overlayConfigApp.trimStart - 1;
		let trimEnd = vue.overlayConfigApp.trimEnd - 1
		let trimmedOverlayFrames = overlayFrames.slice(0).splice(trimStart, trimEnd - trimStart);
		let modifiedOverlayFrames = overlayFramesOffset.concat(trimmedOverlayFrames);

		let overlayIndex = vue.timeline.graph.state.currentMark;
		let overlayFrame = modifiedOverlayFrames[overlayIndex];
		if (overlayFrame && showOverlay) {
			renderer.save();
			renderer.context.globalAlpha = vue.overlayConfigApp.opacity;
			renderer.context.scale(vue.overlayConfigApp.scale, vue.overlayConfigApp.scale);
			renderer.context.rotate(vue.overlayConfigApp.angle);
			renderer.context.drawImage(overlayFrame, -overlayFrame.width / 2, -overlayFrame.height / 2);
			renderer.restore();
		}

		//
		if (focused) {
			if (action === actions.add) {
				let translucent = "rgba(240, 230, 255, 0.75)";
				renderer.save();
				renderer.context.globalCompositeOperation = "overlay";
				let parent = rigModel.activeJoint;
				if (parent) {
					renderer.line(worldMouse.x, worldMouse.y, parent.position.x, parent.position.y, {
						lineWidth: config.render.segment.width,
						lineCap: "round",
						stroke: translucent
					});

					if (mirror) {
						let mirrorX = parent.position.x - worldMouse.x + mirror.position.x;
						renderer.line(mirrorX, worldMouse.y, mirror.position.x, mirror.position.y, {
							lineWidth: config.render.segment.width,
							lineCap: "round",
							stroke: translucent
						});

						renderer.circle(mirrorX, worldMouse.y, config.render.joint.radius, {
							fill: translucent
						});
					}
				}

				renderer.circle(worldMouse.x, worldMouse.y, config.render.joint.radius, {
					fill: translucent
				});

				renderer.restore();
			}
		}

		//Add grid
		if (showGrid.prop("checked")) {
			let gridArea = 10000;
			let gridSpacing = 20;
			for (var x = -cameraDistance - gridArea; x < cameraDistance + gridArea; x += gridSpacing) {
				renderer.line(x, renderer.camera.viewport.top - gridArea, x, renderer.camera.viewport.bottom + gridArea, {
					stroke: "rgba(240, 230, 250, 0.2)",
					lineWidth: 0.2
				});
			}

			for (var y = -cameraDistance - gridArea; y < cameraDistance + gridArea; y += gridSpacing) {
				renderer.line(renderer.camera.viewport.left - gridArea, y, renderer.camera.viewport.right + gridArea, y, {
					stroke: "rgba(240, 230, 250, 0.2)",
					lineWidth: 0.2
				});
			}
		}

		//Draw the model's bounds
		if (showBounds.prop("checked")) {
			let boundsColor = "rgba(225, 50, 255, 0.5)";
			let w = rigModel.bounds.max.x - rigModel.bounds.min.x;
			let h = rigModel.bounds.max.y - rigModel.bounds.min.y;
			let text = parseInt(w) + "x" + parseInt(h);
			renderer.text(text, rigModel.bounds.min.x, rigModel.bounds.min.y, {
				align: "left bottom",
				font: "10px Consolas",
				fill: boundsColor
			});

			renderer.rect(rigModel.bounds.min.x, rigModel.bounds.min.y, w, h, {
				lineWidth: 0.35,
				stroke: boundsColor
			});
		}

		rigModel.render(renderer);
	});
});

renderer.render(() => {
	renderer.redraw();
});

/*key.on("keyup", function() {
	if (key.code === 16) {
		console.log(history);
		console.log(rigModel);
	}
});*/