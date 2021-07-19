const streamSaver = require("streamsaver");
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

//Drag & drop material images to properties
//Crop bug
//Adding joints affects all keyframes
//Extracting keyframes progress not adding all frames

//Disable rightclick menu
document.addEventListener("contextmenu", event => event.preventDefault());

window.rigModel = rigModel;

let cameraDistance = config.world.zoom;
let cameraMovement = vector();
let mouseLast = vector();
let worldMouse = vector();

let actions = {
	pan: "pan",
	add: "add",
	select: "select",
	move: "move",
	remove: "remove"
};

let shortcuts = {
	KeyQ: actions.pan,
	KeyW: actions.add,
	KeyE: actions.select,
	KeyR: actions.move,
	KeyT: actions.remove
};

let sleep = false;
let showOverlay = true;

let actionIconPaths = {};

actionIconPaths.add = "assets/svg/joint-plus.svg";
actionIconPaths.select = "assets/svg/joint-click.svg";
actionIconPaths.move = "assets/svg/joint-arrow.svg";
actionIconPaths.remove = "assets/svg/joint-trash.svg";
actionIconPaths.pan = "assets/svg/quad-arrow.svg";

let action = actions.pan;

const actionButtons = {
	add: document.getElementById("addJoint"),
	select: document.getElementById("selectJoint"),
	move: document.getElementById("moveJoint"),
	remove: document.getElementById("removeJoint"),
	pan: document.getElementById("panCamera")
};

let customSelects = dom.query(".custom-select");
let customSelectOptions = dom.query(".custom-select .options");
let cropBtn = dom.query("#displayCropApp", true);
let resetOffsetBtn = dom.query("#resetOffset", true);
let removeSkinBtn = dom.query("#removeSkin", true);
let focusRigBtn = dom.query("#focusRig", true);
let materialsEl = dom.query("#propertyApp #materials", true);
let rigModeBtns = dom.query("#riggingMode button");
let autoAddKeyframeBtn = dom.query("#autoAddKeyframe", true);
const fileButton = document.getElementById("fileButton");
const optionButton = document.getElementById("optionButton");
const materialApp = document.getElementById("materialApp");
const addMaterialButton = document.getElementById("addMaterial");

const canvasContainer = document.querySelector(".canvas-container");
const navigation = document.getElementById("navigation");
const frameCountInput = document.getElementById("frameCount");
const animationSpeedInput = document.getElementById("animationSpeed");
const _actionButtons = Object.keys(actionButtons);
const __actionButtons = Object.values(actionButtons);

let jointCrop, activePane;
let materials = [];

let _preventDefault = event => {
	event.preventDefault();
}

dom.query("div").on("drag", _preventDefault);
dom.query("div").on("dragstart", _preventDefault);

function configMaterial(id) {
	let mat = materials.find(m => m.id === id);
	if (mat) {}
}

function createMaterial(file) {
	const id = utils.uid();
	let fileURL = URL.createObjectURL(file);
	let parent = dom.query("#materialApp", true);
	let button = dom.create("button");
	let img = button.create("img");

	button.addClass("item");
	img.attr("src", fileURL);

	button.node.addEventListener("click", () => {
		configMaterial(id);
	});

	parent.append(button);


	let option = materialsEl.query(".options", true).create("p");
	option.value(fileURL);
	option.text(file.name);

	return {
		id: id,
		file: file,
		src: fileURL,
		el: button
	};
}

function handleMaterialFiles(files) {
	console.log(files);
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

function removeActives() {
	for (let btn of _actionButtons) {
		actionButtons[btn].classList.remove("active-tool");
	}
}

customSelectOptions.on("mousedown", event => {
	let select = dom.query(event.target.parentNode.parentNode, true);
	let value = select.value(event.target.value);

	select.query("label").text(event.target.innerText, true);

	events.emit("materialChange", value);
});

customSelects.on("mouseup", event => {
	let options = dom.query(event.target).query(".options", true);
	if (options.node.style.display != "flex") {
		let parentBounds = options.node.parentNode.getBoundingClientRect();
		
		let y = parentBounds.height + 5;

		options.css({
			display: "flex",
			top: `${y}px`,
		});

		let bounds = options.node.getBoundingClientRect();
		if (bounds.y + bounds.height >= innerHeight) {
			options.css("top", `${-bounds.height - 5}px`);
		}
	} else {
		options.css("display", "none");
	}
});

materialApp.addEventListener("drop", event => {
	event.preventDefault();
	let files = event.dataTransfer.files;
	handleMaterialFiles(files);
	dom.query("#dropIcon").css("visibility", "hidden");
});

addMaterialButton.addEventListener("change", () => {
	let files = addMaterialButton.files;
	handleMaterialFiles(files);
});

materialApp.addEventListener("dragenter", event => {
	dom.query("#dropIcon").css("visibility", "visible");
});

materialApp.addEventListener("dragleave", event => {
	dom.query("#dropIcon").css("visibility", "hidden");
});

materialApp.addEventListener("dragover", event => {
	event.preventDefault();
});

materialApp.addEventListener("mousedown", event => {
	for (var i = 0; i < materialApp.children.length; i++) {
		let child = materialApp.children[i];
		child.classList.remove("selected");
	}
});

events.on("saveProject", filename => {
	let model = rigModel.toJSON();
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

	let str = JSON.stringify(data);

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
});

window.onunload = () => {
	writableStream.abort();
}

events.on("loadProject", data => {
	if (data.model) {
		let model = rigModel.fromJSON(data.model);
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

let overlayFrames = [];
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

rigModeBtns.on("click", event => {
	rigModeBtns.removeClass("selected");;
	let btn = dom.query(event.target, true);
	btn.addClass("selected");

	if (btn.node.id == "inverseKinematics") {
		config.riggingMode = "inverseKinematics";
	} else if (btn.node.id == "forwardKinematics") {
		config.riggingMode = "forwardKinematics";
	} else {
		config.riggingMode = "linear";
	}

	history.add({
		label: "Change rig mode",
		value: config.riggingMode,
		group: "config"
	});
});

autoAddKeyframeBtn.on("click", () => {
	autoAddKeyframeBtn.toggleClass("selected");

	if (autoAddKeyframeBtn.node.classList.contains("selected")) {
		config.animation.autoAddKeyframe = true;
	} else {
		config.animation.autoAddKeyframe = false;
	}
});

focusRigBtn.on("click", () => {
	if (rigModel.bounds) {
		cameraMovement.x = (rigModel.bounds.min.x + rigModel.bounds.max.x) / 2;
		cameraMovement.y = (rigModel.bounds.min.y + rigModel.bounds.max.y) / 2;
	}
});

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

removeSkinBtn.on("click", () => {
	let activeJoint = rigModel.activeJoint;
	if (activeJoint) {
		if (activeJoint.skin) {
			if (activeJoint.skin.imageSrc) {

				let skin = activeJoint.skin;

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

resetOffsetBtn.on("click", () => {
	let activeJoint = rigModel.activeJoint;
	if (activeJoint) {
		if (activeJoint.skin) {
			if (activeJoint.skin.offset) {
				if (activeJoint.skin.offset.x != 0 || activeJoint.skin.offset.y != 0 || activeJoint.skin.offset.scaleX != 1 || activeJoint.skin.offset.scaleY != 1 || activeJoint.skin.offset.angle != 0) {

					let skin = activeJoint.skin;

					skin.offset.x = 0;
					skin.offset.y = 0;
					skin.offset.scaleX = 1;
					skin.offset.scaleY = 1;
					skin.offset.angle = 0;

					rigModel.editJoint(activeJoint.id, {
						skin: skin
					});

					setJointProperties(activeJoint);

					history.add({
						label: "Reset transform offset",
						value: rigModel.clone(),
						group: "keyframe"
					});
				}
			}
		}
	}
});

events.on("crop", (crop, _vueCrop) => {
	let skin = jointCrop.skin;

	skin.crop = crop;

	skin._vueCrop = {
		from: {
			x: _vueCrop.from.x,
			y: _vueCrop.from.y
		},
		to: {
			x: _vueCrop.to.x,
			y: _vueCrop.to.y
		}
	};

	rigModel.editJoint(jointCrop.id, {
		skin: skin
	});

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
			let x = parseFloat(dom.query("#skinPositionX", true).value());
			let y = parseFloat(dom.query("#skinPositionY", true).value());
			let scaleX = parseFloat(dom.query("#skinScaleX", true).value());
			let scaleY = parseFloat(dom.query("#skinScaleY", true).value());
			let angle = parseFloat(dom.query("#skinAngle", true).value());

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
			}

			let _skin = {
				imageSrc: res.url,
				crop: crop,
				_vueCrop: activeJoint.skin._vueCrop || null,
				offset: {
					x: x || 0,
					y: y || 0,
					scaleX: scaleX || 0,
					scaleY: scaleY || 0,
					angle: utils.radians(utils.map(angle, 0, 360, -180, 180)) + Math.PI || 0
				}
			};

			rigModel.editJoint(activeJoint.id, {
				skin: _skin
			});

			history.add({
				label: "Change skin",
				value: rigModel.clone(),
				group: "keyframe"
			});
		}
	});
});

/*materialsEl.on("mousedown", () => {
	let url = materialsEl.value();
	console.log(url);
	let activeJoint = rigModel.activeJoint;

	if (url) {
		cropBtn.removeClass("disabled");
	} else {
		cropBtn.addClass("disabled");
	}

	utils.loadImage(url).then(res => {
		if (activeJoint) {
			let x = parseFloat(dom.query("#skinPositionX", true).value());
			let y = parseFloat(dom.query("#skinPositionY", true).value());
			let scaleX = parseFloat(dom.query("#skinScaleX", true).value());
			let scaleY = parseFloat(dom.query("#skinScaleY", true).value());
			let angle = parseFloat(dom.query("#skinAngle", true).value());

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
			}

			let _skin = {
				imageSrc: res.url,
				crop: crop,
				_vueCrop: activeJoint.skin._vueCrop || null,
				offset: {
					x: x || 0,
					y: y || 0,
					scaleX: scaleX || 0,
					scaleY: scaleY || 0,
					angle: utils.radians(utils.map(angle, 0, 360, -180, 180)) + Math.PI || 0
				}
			};

			rigModel.editJoint(activeJoint.id, {
				skin: _skin
			});

			history.add({
				label: "Change skin",
				value: rigModel.clone(),
				group: "keyframe"
			});
		}
	});
});*/

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

	dom.query("#jointApp button.name.active").removeClass("active");

	let joint = rigModel.joints.find(j => j.id === id);
	if (joint) {
		if (rigModel.activeJoint == joint) {
			jointBtn.addClass("active");
		}
	}

	jointBtn.on("click", () => {
		let prev = dom.query("#jointApp button.name.active");
		prev.removeClass("active");
		jointBtn.addClass("active");

		let joint = rigModel.joints.find(j => j.id === id);
		if (joint) {
			rigModel.selectJoint(joint.position.x, joint.position.y);
		}

		activePane = "joints";
	});

	return jointEl;
}

function setJointProperties(joint) {
	let propertyPane = dom.query("#propertyApp", true);
	if (joint) {
		propertyPane.removeClass("disabled");

		//Prop
		let nameEl = propertyPane.query("#jointName");
		let lengthEl = propertyPane.query("#jointLength");
		let zIndexEl = propertyPane.query("#jointZIndex");
		nameEl.value(joint.name);
		lengthEl.value(joint.length.toFixed(2));
		zIndexEl.value(parseInt(joint.zIndex));

		//Transform
		let xEl = propertyPane.query("#jointX");
		let yEl = propertyPane.query("#jointY");
		let angleEl = propertyPane.query("#jointAngle");

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
			}
		}
	} else {
		propertyPane.addClass("disabled");
	}
}

events.on("timelineSeeked", () => {
	let activeJoint = rigModel.activeJoint;
	if (activeJoint) {
		setJointProperties(activeJoint);
	}

	activePane = "timeline";
});

events.on("jointChange", joints => {
	joints = joints || rigModel.joints;
	//Joint Pane >
	//Adding elements
	let jointApp = dom.query("#jointApp", true);
	for (var i = 0; i < joints.length; i++) {
		let joint = joints[i];
		//Check if it exists in dom
		let check = jointApp.query("#" + joint.id, true);
		if (!check.node) {
			let el = createJointElement(joint.id, joint.name);
			jointApp.append(el);
		}
	}

	//Fix each element hierarchy
	let jointAppChildren = dom.query("#jointApp > *");
	for (var i = 0; i < jointAppChildren.elements.length; i++) {
		let el = jointAppChildren.elements[i];
		let joint = joints.find(j => j.id === el.node.id);
		//Search for parent
		if (joint) {
			if (joint.parent) {
				let parentEl = dom.query("#" + joint.parent.id + " > .children", true);
				parentEl.append(el);
			}
		}
	}

	//Updating elements
	let jointAppJoints = dom.query("#jointApp .joint");
	for (var i = 0; i < jointAppJoints.elements.length; i++) {
		let el = jointAppJoints.elements[i];
		let rigJoint = rigModel.joints.find(j => j.id === el.node.id);
		if (!rigJoint) {
			el.remove();
		} else {
			if (el.node.id === rigModel.activeJoint.id) {
				el.query("button.name").addClass("active");
			} else {
				el.query("button.name.active").removeClass("active");
			}

			el.query("button.name", true).text(rigJoint.name, true);
		}
	}

	//Properties Pane >
	let activeJoint = rigModel.activeJoint;
	setJointProperties(activeJoint);

	//Hide angle, length, & skinning properties if there's no parent
	if (rigModel.activeJoint) {
		if (!rigModel.activeJoint.parent) {
			dom.query(dom.query("#jointAngle", true).node.parentNode, true).css("display", "none");
			dom.query(dom.query("#jointLength", true).node.parentNode, true).css("display", "none");
			dom.query(".section.skinning").css("display", "none");
		} else {
			dom.query(dom.query("#jointAngle", true).node.parentNode, true).css("display", "flex");
			dom.query(dom.query("#jointLength", true).node.parentNode, true).css("display", "flex");
			dom.query(".section.skinning").css("display", "flex");
		}
	}
});

events.on("jointNameInputChange", () => {
	let activeJoint = rigModel.activeJoint;
	if (activeJoint) {
		let name = dom.query("#jointName", true).value();
		activeJoint.name = name;

		rigModel.editJoint(activeJoint.id, {
			name: name
		});

		events.emit("jointChange");

		history.add({
			label: "Change joint name",
			value: rigModel.clone(),
			group: "keyframe"
		});
	}
});

events.on("jointZIndexInputChange", () => {
	let activeJoint = rigModel.activeJoint;
	if (activeJoint) {
		let zIndex = dom.query("#jointZIndex", true).value();
		activeJoint.zIndex = zIndex;

		rigModel.editJoint(activeJoint.id, {
			zIndex: zIndex
		});

		events.emit("jointChange");

		history.add({
			label: "Change joint Z-Index",
			value: rigModel.clone(),
			group: "keyframe"
		});
	}
})

events.on("jointSkinningInputChange", () => {
	let activeJoint = rigModel.activeJoint;
	if (activeJoint) {
		let activeJointSkin = activeJoint.skin;
		let x = parseFloat(dom.query("#skinPositionX", true).value());
		let y = parseFloat(dom.query("#skinPositionY", true).value());
		let scaleX = parseFloat(dom.query("#skinScaleX", true).value());
		let scaleY = parseFloat(dom.query("#skinScaleY", true).value());
		let angle = parseFloat(dom.query("#skinAngle", true).value());

		activeJointSkin.offset = {
			x: x,
			y: y,
			scaleX: scaleX,
			scaleY: scaleY,
			angle: utils.radians(utils.map(angle, 0, 360, -180, 180)) + Math.PI
		};

		rigModel.editJoint(activeJoint.id, {
			skin: activeJointSkin
		});

		history.add({
			label: "Change skin offset",
			value: rigModel.clone(),
			group: "keyframe"
		});
	}
});

events.on("jointPositionInputChange", () => {
	let activeJoint = rigModel.activeJoint;
	if (activeJoint) {
		let x = parseFloat(dom.query("#jointX", true).value()) || 0;
		let y = parseFloat(dom.query("#jointY", true).value()) || 0;
		rigModel.moveJoint(x, y);
	}
});

events.on("jointAngleInputChange", () => {
	let activeJoint = rigModel.activeJoint;
	if (activeJoint) {
		if (activeJoint.parent) {
			let angle = parseFloat(dom.query("#jointAngle", true).value()) || 0;
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
		let length = parseFloat(dom.query("#jointLength", true).value()) || 0;
		activeJoint.length = length;
		rigModel.moveJoint(activeJoint.position.x, activeJoint.position.y);
	}
});

events.on("historyChange", () => {
	//Autosave
	if (history.eventCount % config.autosave.threshold == 0) {
		let model = rigModel.toJSON(null, true);
		localStorage.setItem(config.autosave.label, JSON.stringify(model));
	}
});

//Loading autosaved data
utils.loadJSONData(config.autosave.label, data => {
	rigModel.import(rigModel.fromJSON(data));
});

events.on("clearJoints", () => {
	rigModel.reset();
	dom.query("#jointApp *").remove();
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

events.on("undo", () => {
	let prev = history.getPrevious();
	if (!prev) return;
	if (prev.group == "keyframe") {
		rigModel.import(prev.value);
		history.backward();

		vue.timeline.graph.updateState();
		vue.timeline.graph.redraw();
	}
});

events.on("redo", () => {
	let next = history.getNext();
	if (!next) return;
	if (next.group == "keyframe") {
		rigModel.import(next.value);
		history.forward();

		vue.timeline.graph.updateState();
		vue.timeline.graph.redraw();
	}
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

fileButton.addEventListener("mouseup", function() {
	let fileApp = vue.fileApp;
	if (fileApp.hidden) {
		fileApp.show(mouse.x + 5, mouse.y + 5);
	}
});

optionButton.addEventListener("mouseup", function() {
	let optionApp = vue.optionApp;
	if (optionApp.hidden) {
		optionApp.show(mouse.x + 5, mouse.y + 5);
	}
});

for (let btn of _actionButtons) {
	actionButtons[btn].addEventListener("click", function() {
		action = actions[btn];
		rigModel.action = action;

		removeActives();
		actionButtons[btn].classList.add("active-tool");
		actionPreview.query("img", true).prop("src", actionIconPaths[action]);
	});
}

key.on("keydown", function(event) {
	let pickedAction = actions[shortcuts[event.code]];
	if (pickedAction) {
		action = pickedAction;
		rigModel.action = action;

		if (actionButtons[action]) {
			removeActives();
			actionButtons[action].classList.add("active-tool");
			actionPreview.query("img", true).prop("src", actionIconPaths[action]);
		}
	}

	if (event.ctrlKey) {
		if (event.keyCode == 90) {
			events.emit("undo");
		}

		if (event.keyCode == 89) {
			events.emit("redo");
		}
	}

	//Delete
	if (event.keyCode == 46) {
		if (activePane == "joints") {
			let activeJoint = rigModel.activeJoint;
			if (activeJoint) {
				if (activeJoint.parent) {
					rigModel.removeJointById(activeJoint.id);
				}
			}
		} else if (activePane == "timeline") {
			events.emit("deleteKeyframe");
		}
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
	dom.query(".custom-select .options").css("display", "none");
});

mouse.on("mousewheel", () => {
	dom.query(".custom-select .options").css("display", "none");
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
			top: `${mouse.y - 7}px`,
			left: `${mouse.x + 9}px`
		});
	}
});

let actionPreview = dom.query("#actionPreview", true);

renderer.canvas.addEventListener("mousemove", function(e) {
	if (mouse.dragged && !sleep) {
		if (action === actions.pan) {
			cameraMovement.set({
				x: mouseLast.x - worldMouse.x + renderer.camera.movement.x,
				y: mouseLast.y - worldMouse.y + renderer.camera.movement.y
			});
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
		cameraDistance -= 200;
	} else {
		cameraDistance += 200;
	}

	cameraDistance = utils.clamp(cameraDistance, config.world.minZoom, config.world.maxZoom);
});

function fixRendererSize() {
	let toolApp = document.getElementById("toolApp");
	renderer.setSize(canvasContainer.offsetWidth - 1 - toolApp.offsetWidth, innerHeight - navigation.offsetHeight - vue.timeline.app.$el.offsetHeight);
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

renderer.draw(() => {
	let focused = vue.overlayApp.hidden && vue.overlayConfigApp.hidden && vue.fileApp.hidden && vue.loadApp.hidden && vue.saveApp.hidden && vue.optionApp.hidden && !sleep;

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

		if (focused) {
			if (action === actions.add) {
				let translucent = "rgba(240, 230, 255, 0.3)";
				renderer.save();
				renderer.context.globalCompositeOperation = "overlay";
				let currentPart = rigModel.activeJoint;
				if (currentPart) {
					renderer.line(worldMouse.x, worldMouse.y, currentPart.position.x, currentPart.position.y, {
						lineWidth: config.render.segment.width,
						lineCap: "round",
						stroke: translucent
					});
				}

				renderer.circle(worldMouse.x, worldMouse.y, config.render.joint.radius, {
					fill: translucent
				});
				renderer.restore();
			}
		}

		/*let actionSize = utils.map(cameraDistance, config.world.minZoom, config.world.maxZoom, 10, 100);
		renderer.context.drawImage(actionIcons[action], worldMouse.x + 12, worldMouse.y - 8, actionSize, actionSize);*/

		rigModel.render(renderer);

		//Draw the model's bounds
		/*renderer.rect(rigModel.bounds.min.x, rigModel.bounds.min.y, rigModel.bounds.max.x - rigModel.bounds.min.x, rigModel.bounds.max.y - rigModel.bounds.min.y, {
			stroke: "red"
		});*/
	});
});

renderer.render(() => {
	renderer.redraw();
});

key.on("keydown", function() {
	if (key.code === 16) {
		console.log(sleep);
		console.log(rigModel);
	}
});