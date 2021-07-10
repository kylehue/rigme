const streamSaver = require("streamsaver");
const renderer = require("../lib/renderer.js");
const events = require("../../../lib/events.js");
const vector = require("../../../lib/vector.js");
const shape = require("../../../lib/shape.js");
const mouse = require("../../../lib/mouse.js");
const key = require("../../../lib/key.js");
const utils = require("../../../lib/utils.js");
const client = require("./client.js");
const config = require("../../../lib/config.js");
const vue = require("./vue/vue.js");
const rigModel = require("../lib/rig.model.js");
const history = require("../lib/history.js");
const extractKeyframes = require("../lib/extract.keyframes.js");

events.emit("loadedApps", vue);

//Disable rightclick menu
document.addEventListener('contextmenu', event => event.preventDefault());

window.rigModel = rigModel;

let block = document.getElementById("block");

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

let actionIcons = {};

actionIcons.add = new Image();
actionIcons.add.src = "assets/svg/joint-plus.svg";
actionIcons.select = new Image();
actionIcons.select.src = "assets/svg/joint-click.svg";
actionIcons.move = new Image();
actionIcons.move.src = "assets/svg/joint-arrow.svg";
actionIcons.remove = new Image();
actionIcons.remove.src = "assets/svg/joint-trash.svg";
actionIcons.pan = new Image();
actionIcons.pan.src = "assets/svg/quad-arrow.svg";

let action = actions.pan;

let actionButtons = {
	add: document.getElementById("addJoint"),
	select: document.getElementById("selectJoint"),
	move: document.getElementById("moveJoint"),
	remove: document.getElementById("removeJoint"),
	pan: document.getElementById("panCamera")
};

let fileButton = document.getElementById("fileButton");
let optionButton = document.getElementById("optionButton");

let navigation = document.getElementById("navigation");
let appDock = document.getElementById("appDock");
let frameCountInput = document.getElementById("frameCount");
let animationSpeedInput = document.getElementById("animationSpeed");
let _actionButtons = Object.keys(actionButtons);
let __actionButtons = Object.values(actionButtons);

function removeActives() {
	for (let btn of _actionButtons) {
		actionButtons[btn].classList.remove("active-tool");
	}
}

function mouseInside() {
	return mouse.x >= renderer.bounds.x && mouse.x <= renderer.bounds.width && mouse.y >= renderer.bounds.y && mouse.y <= renderer.bounds.height;
}

function undo() {
	let prev = history.getPrevious();
	if (!prev) return;
	if (prev.group == "keyframe") {
		rigModel.import(prev.value);
		history.backward();

		vue.timeline.graph.updateState();
		vue.timeline.graph.redraw();
	}
}

function redo() {
	let next = history.getNext();
	if (!next) return;
	if (next.group == "keyframe") {
		rigModel.import(next.value);
		history.forward();

		vue.timeline.graph.updateState();
		vue.timeline.graph.redraw();
	}
}

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
	progressBarWrapper.style.display = "block";
	let progressBar = document.getElementById("progressBar");
	let cancelButton = document.querySelector("#progressBarWrapper button");

	let interval, cancelled;
	let loaded = 0;

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
				loaded = pct;
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

	interval = setInterval(() => {
		let current = (progressBar.offsetWidth / innerWidth) * 100;
		let pct = utils.lerp(current, loaded, 0.1);
		progressBar.style.width = `${pct}%`;
	}, 1000 / 30);
});

events.on("removeOverlay", () => {
	overlayFrames = [];
	vue.optionApp.overlayConfigHidden = true;
});

//Autosave
events.on("historyChange", () => {
	if (history.eventCount % config.autosave.threshold == 0) {
		let model = rigModel.toJSON();
		localStorage.setItem(config.autosave.label, JSON.stringify(model));
	}
});

//Loading autosaved data
utils.loadJSONData(config.autosave.label, data => {
	rigModel.import(rigModel.fromJSON(data));
});

events.on("clearJoints", () => {
	rigModel.reset();
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
	undo();
});

events.on("redo", () => {
	redo();
});

events.on("renderSleep", () => {
	let components = document.querySelectorAll("input");
	for (let comp of components) {
		comp.classList.add("ignore");
		comp.setAttribute("disabled", "");
	}

	sleep = true;
});

events.on("renderFocus", () => {
	let components = document.querySelectorAll("input");
	for (let comp of components) {
		comp.classList.remove("ignore");
		comp.removeAttribute("disabled");
	}

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
});

mouse.on("mouseup", function() {
	if (rigModel._moved) {
		history.add({
			label: "Move joint",
			value: rigModel.clone(),
			group: "keyframe"
		});

		rigModel._moved = false;
	}
});

mouse.on("mousedown", function() {
	vue.fileApp.hide();
	vue.optionApp.hide();
});

mouse.on("mousemove", function() {
	if (!mouse.dragged && mouseInside() && !sleep) {
		mouseLast.set(worldMouse);
	}
});

renderer.canvas.addEventListener("click", function() {
	if (!sleep) {
		if (action == actions.add) {
			rigModel.addJoint(worldMouse.x, worldMouse.y);
		}

		if (action === actions.remove) {
			rigModel.selectJoint(worldMouse.x, worldMouse.y);
			rigModel.removeJoint(worldMouse.x, worldMouse.y);
		}

		if (action === actions.select) {
			rigModel.selectJoint(worldMouse.x, worldMouse.y);
		}
	}
});

renderer.canvas.addEventListener("mousewheel", function() {
	if (mouse.scrollTop) {
		cameraDistance -= 200;
	} else {
		cameraDistance += 200;
	}

	cameraDistance = cameraDistance < config.world.minZoom ? config.world.minZoom : cameraDistance;
	cameraDistance = cameraDistance > config.world.maxZoom ? config.world.maxZoom : cameraDistance;
});

function fixRendererSize() {
	renderer.setSize(innerWidth, innerHeight - navigation.offsetHeight - appDock.offsetHeight);
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
renderer.render(function() {
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

		if (mouseInside() && block.style.display != "block" && !sleep) {
			if (action === actions.add) {
				let color = "#323439";
				let currentPart = rigModel.activeJoint;
				if (currentPart) {
					renderer.line(worldMouse.x, worldMouse.y, currentPart.position.x, currentPart.position.y, {
						lineWidth: config.render.segment.width,
						lineCap: "round",
						stroke: color
					});
				}

				renderer.circle(worldMouse.x, worldMouse.y, config.render.joint.radius, {
					fill: color
				});
			}

			renderer.context.drawImage(actionIcons[action], worldMouse.x + 12, worldMouse.y - 8, 14, 14);
		}

		rigModel.render(renderer);

		//Draw the model's bounds
		/*renderer.rect(rigModel.bounds.min.x, rigModel.bounds.min.y, rigModel.bounds.max.x - rigModel.bounds.min.x, rigModel.bounds.max.y - rigModel.bounds.min.y, {
			stroke: "red"
		});*/
	});

	if (mouseInside() && block.style.display != "block") {
		if (action === actions.pan && !sleep) {
			if (mouse.dragged) {
				cameraMovement.set({
					x: mouseLast.x - worldMouse.x + renderer.camera.movement.x,
					y: mouseLast.y - worldMouse.y + renderer.camera.movement.y
				});
			}
		}

		if (action === actions.move && !sleep) {
			if (mouse.pressed) {
				rigModel.moveJoint(worldMouse.x, worldMouse.y);
			}
		}
	}
});

key.on("keydown", function() {
	if (key.code === 16) {
		console.log(rigModel);
		console.log(vue.timeline);
		console.log(vue.overlayConfigApp)
	}
});