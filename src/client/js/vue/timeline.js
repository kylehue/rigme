const clonedeep = require("lodash.clonedeep");
const mouse = require("../../../../lib/mouse.js");
const config = require("../../../../lib/config.js");
const utils = require("../../../../lib/utils.js");
const rigModel = require("../../lib/rig.model.js");
const vector = require("../../../../lib/vector.js");
const contextMenuApp = require("./contextMenu.js");
const history = require("../../lib/history.js");

var lastActiveJointId, lastActiveJointSub;
var timeline;
var selectedKeyframe, keyframeClipboard;

const timelineApp = new Vue({
	el: "#timelineApp",
	data: {
		hidden: false,
		totalFrames: parseInt(document.getElementById("frameCount").value),
		animationSpeed: parseInt(document.getElementById("animationSpeed").value),
		currentFrame: 0,
		lastMsg: "Previous frame",
		playMsg: "Play/Stop",
		nextMsg: "Next frame",
		addKeyMsg: "Add keyframe",
		removeKeyMsg: "Remove keyframe",
		frameCountMsg: "Frame count",
		animationSpeedMsg: "Animation speed"
	},
	methods: {
		fixData: function() {
			this.animationSpeed = parseInt(document.getElementById("animationSpeed").value);
			this.totalFrames = parseInt(document.getElementById("frameCount").value);
			timeline.hatchMark.spacing = timeline.canvas.width / this.totalFrames;
			timeline.snap();
			timeline.redraw();
		},
		validateFormat: function(e) {
			timeline.redraw();
			//Only allow numbers & backspace/delete
			if (e.keyCode != 8 & e.keyCode != 46) {
				let nums = new RegExp("[0-9]");
				if (!nums.test(e.key)) {
					e.preventDefault();
					return;
				}
			}

			this.fixData();
		},
		validateAmount: function(e) {
			timelineApp.validateMin(e);
			timelineApp.validateMax(e);

			this.fixData();
		},
		validateMax: function(e) {
			let value = e.target.value;
			let max = config.animation.frameCount.max;
			if(e.target.id == "animationSpeed") max = config.animation.speed.max;
			if (parseInt(value) > max) {
				e.target.value = max.toString();
			}

			this.fixData();
		},
		validateMin: function(e) {
			let value = e.target.value;
			let min = config.animation.frameCount.min;
			if(e.target.id == "animationSpeed") min = config.animation.speed.min;
			if (parseInt(value) < min) {
				e.target.value = min.toString();
			}

			this.fixData();
		},
		addToHistory: function() {
			if (this.totalFrames != this._previousTotalFrames) {
				history.add({
					label: "Change frame count",
					value: this.totalFrames,
					group: "input"
				});
			}

			if (this.animationSpeed != this._previousAnimationSpeed) {
				history.add({
					label: "Change animation speed",
					value: this.animationSpeed,
					group: "input"
				});
			}

			this._previousTotalFrames = this.totalFrames;
			this._previousAnimationSpeed = this.animationSpeed;
			console.log(history)
		},
		toggleAmount: function(e) {
			let isDown = e.wheelDeltaY < 0;
			let value = parseInt(e.target.value);
			if (isDown) {
				value--;
			} else {
				value++;
			}

			e.target.value = value.toString();
			timelineApp.validateAmount(e);
			this.fixData();
		},
		setCurrentFrame: function(index) {
			this.currentFrame = index;
		}
	}
});

timelineApp._previousTotalFrames = timelineApp.totalFrames;
timelineApp._previousAnimationSpeed = timelineApp.animationSpeed;
timelineApp.$el.addEventListener("focusout", () => {
	//timelineApp.addToHistory();
});

function getFrames() {
	let totalFrames = timelineApp.totalFrames;
	let currentMark = timeline.state.currentMark;

	//Get the current frame
	let currentFrame = null;
	for (var i = parseInt(currentMark); i >= 0; i--) {
		let key = rigModel.keyframes[i];
		if (key) {
			if (key.type == "head") {
				currentFrame = key.index;
				break;
			}
		}
	}

	//Get the next frame
	let nextFrame = null;
	for (var i = parseInt(currentMark) + 1; i < totalFrames; i++) {
		let key = rigModel.keyframes[i];
		if (key) {
			if (key.type == "head") {
				nextFrame = key.index;
				break;
			}
		}
	}

	//Get the previous frame
	let previousFrame = null;
	for (var i = currentFrame - 1; i >= 0; i--) {
		let key = rigModel.keyframes[i];
		if (key) {
			if (key.type == "head") {
				previousFrame = key.index;
				break;
			}
		}
	}

	return {
		current: currentFrame,
		next: nextFrame,
		previous: previousFrame
	};
}

function mouseInside(el) {
	el = document.getElementById(el.id);
	if (el) {
		let bounds = el.getBoundingClientRect();
		return mouse.x >= bounds.x && mouse.x <= bounds.x + bounds.width && mouse.y >= bounds.y && mouse.y <= bounds.y + bounds.height;
	}

	return false;
}

class Timeline {
	constructor() {
		this.canvas = document.getElementById("timelineGraph");
		this.context = this.canvas.getContext("2d");

		this.buttons = {
			previous: document.getElementById("lastFrame"),
			play: document.getElementById("playStop"),
			next: document.getElementById("nextFrame"),
			add: document.getElementById("addKeyframe"),
			delete: document.getElementById("deleteKeyframe"),
			minimize: document.getElementById("minimize")
		};

		this.state = {
			isPlaying: false,
			isDragging: false,
			isMinimized: false,
			currentMark: 0,
			currentFrame: 0,
			nextFrame: null,
			previousFrame: null,
			_x: 0
		};

		this.hatchMark = {
			spacing: this.canvas.width / (timelineApp.totalFrames),
			height: 4
		};

		this.bounds = this.canvas.getBoundingClientRect();

		this.loop = null;


		this.addButtonEvents();
		this.addMouseEvents();
		this.addKeyboardEvents();
		this.updateSize();

		addEventListener("resize", () => {
			this.updateSize()
			this.redraw();
		});
	}

	ignoreHeader() {
		let header = document.querySelector("#timelineApp div.row-a");
		header.style.pointerEvents = "none";
		header.style.userSelect = "none";
	}

	focusHeader() {
		let header = document.querySelector("#timelineApp div.row-a");
		header.style.pointerEvents = "all";
		header.style.userSelect = "all";
	}

	storeSelectedKeyframe() {
		let keys = Object.keys(rigModel.keyframes);
		for (var i = 0; i < keys.length; i++) {
			let key = keys[i];
			let frame = rigModel.keyframes[key];

			if (frame.index == this.state.currentMark) {
				frame.selected = true;
			} else {
				frame.selected = false;
			}
		}
	}

	addKeyboardEvents() {
		addEventListener("keydown", event => {
			let keys = Object.keys(rigModel.keyframes);
			this.storeSelectedKeyframe();

			if (event.ctrlKey) {
				if (event.keyCode == 67) {
					rigModel.copiedKeyframe = clonedeep(rigModel.getKeyframe("selected", true));
				}

				if (event.keyCode == 86) {
					let copiedKeyframe = rigModel.copiedKeyframe;
					if (copiedKeyframe) {
						rigModel.setKeyframe(this.state.currentMark, {
							position: vector(this.state.currentMark * this.hatchMark.spacing + this.hatchMark.spacing / 2, config.render.keyframe.y),
							locked: this.state.currentMark == 0 ? true : false,
							id: utils.uid(),
							joints: copiedKeyframe.joints
						});
					}
				}
			}
		});
	}

	addMouseEvents() {
		this.canvas.addEventListener("contextmenu", event => {
			let mouseX = mouse.x - this.bounds.x;
			let mouseY = mouse.y - this.bounds.y;
			if (mouseInside(this.canvas)) {
				this.storeSelectedKeyframe();

				let offsetX = mouse.x + contextMenuApp.width > innerWidth ? -contextMenuApp.width : 0;
				let offsetY = mouse.y + contextMenuApp.height > innerHeight ? -contextMenuApp.height : 0;
				contextMenuApp.show(mouse.x + offsetX, mouse.y + offsetY);
			}
		});

		//Timeline click
		mouse.on("click", event => {
			let mouseX = mouse.x - this.bounds.x;
			let mouseY = mouse.y - this.bounds.y;
			if (mouseInside(this.canvas)) {
				if (contextMenuApp.hidden) {
					let pos = Math.round((mouseX + this.hatchMark.spacing / 2) / this.hatchMark.spacing) - 1;
					if (pos >= 0 && pos <= timelineApp.totalFrames) this.setCurrentMark(pos);
				}
			}

			contextMenuApp.hide();
		});

		let activeKeyframe;

		//Timeline drag
		mouse.on("mousemove", event => {
			let keys = Object.keys(rigModel.keyframes);
			let mouseX = event.clientX - this.bounds.x;
			let mouseY = event.clientY - this.bounds.y;
			this.state._x = utils.clamp(mouseX, this.hatchMark.spacing / 2, this.canvas.width - this.hatchMark.spacing / 2);
			if (mouseInside(this.canvas)) {
				if (!contextMenuApp.hidden) return;

				//Check if frames are hovered
				for (var i = 0; i < keys.length; i++) {
					let key = keys[i];
					let frame = rigModel.keyframes[key];

					if (frame.type == "sub") continue;

					let frameX = frame.render.position.x;
					let frameY = frame.render.position.y;
					let frameSize = frame.render.size;
					if (mouseX <= frameX + frameSize && mouseX >= frameX - frameSize && mouseY <= frameY + frameSize && mouseY && mouseY >= frameY - frameSize) {
						if (!frame.hovered) {
							frame.hovered = true;
							frame.render.color = config.render.keyframe.color.hovered;
							if (!frame.locked) this.canvas.style.cursor = "pointer";
							this.redraw();
						}
					} else {
						if (frame.hovered) {
							frame.hovered = false;
							frame.render.color = config.render.keyframe.color.default;
							this.canvas.style.cursor = "default";
							this.redraw();
						}
					}
				}

				if (mouse.pressed) {
					this.ignoreHeader();

					this.state.isDragging = true;

					//Marker drag
					let pos = Math.round((mouseX + this.hatchMark.spacing / 2) / this.hatchMark.spacing) - 1;
					if (pos >= 0 && pos <= timelineApp.totalFrames) this.setCurrentMark(pos);

					if (mouseInside(contextMenuApp.$el)) contextMenuApp.hide();

					//Check if keyframes is getting hovered
					for (var i = 0; i < keys.length; i++) {
						let key = keys[i];
						let frame = rigModel.keyframes[key];

						if (!frame) continue;
						if (frame.type == "sub") continue;
						if (frame.locked) continue;
						if (activeKeyframe) continue;
						if (frame.hovered) activeKeyframe = frame;
					}

				} else {
					this.state.isDragging = false;
					activeKeyframe = null;
					this.focusHeader();
				}

				//Keyframe drag
				if (activeKeyframe) {
					activeKeyframe.render.position.x = mouseX;
					activeKeyframe.render.color = config.render.keyframe.color.active;
					this.canvas.style.cursor = "pointer";
				}
			}
		});

		mouse.on("mouseup", event => {
			if (activeKeyframe) {
				rigModel.deleteKeyframe(activeKeyframe.id);

				let index = Math.round((this.state._x + this.hatchMark.spacing / 2) / this.hatchMark.spacing) - 1;
				let newFrame = rigModel.setKeyframe(index, {
					position: {
						x: activeKeyframe.render.position.x,
						y: activeKeyframe.render.position.y
					},
					joints: activeKeyframe.joints
				});

				activeKeyframe = newFrame;
			}

			this.snap();
			this.state.isDragging = false;
			activeKeyframe = null;
			this.canvas.style.cursor = "default";
			this.focusHeader();
		});
	}

	addButtonEvents() {
		//Previous mark button
		this.buttons.previous.addEventListener("click", () => {
			let pos = this.state.currentMark > 0 ? this.state.currentMark - 1 : this.state.currentMark;
			this.setCurrentMark(pos);
		});

		//Next mark button
		this.buttons.next.addEventListener("click", () => {
			let pos = this.state.currentMark < timelineApp.totalFrames - 1 ? this.state.currentMark + 1 : this.state.currentMark;
			this.setCurrentMark(pos);
		});

		//Play/Stop button
		this.buttons.play.addEventListener("click", () => {
			if (this.state.isPlaying) {
				this.stop();
				this.buttons.play.firstChild.src = "assets/svg/play.svg";
			} else {
				this.play();
				this.buttons.play.firstChild.src = "assets/svg/round-square.svg";
			}

			this.redraw();
		});

		//Add keyframe button
		this.buttons.add.addEventListener("click", () => {
			rigModel.setKeyframe(this.state.currentMark);
		});

		//Delete keyframe button
		this.buttons.delete.addEventListener("click", () => {
			let frame = rigModel.getKeyframe("index", this.state.currentMark);
			if (frame) {
				rigModel.deleteKeyframe(frame.id);

				if (frame.type == "head" && !frame.locked) {
					history.add({
						label: "Delete keyframe",
						value: rigModel.clone(),
						group: "keyframe"
					});
				}
			}
		});

		//Minimize / Maximize
		this.buttons.minimize.addEventListener("click", () => {
			if (!this.state.isMinimized) {
				this.minimize();
			} else {
				this.maximize();
			}
		});
	}

	snap() {
		//Keyframes
		let keys = Object.keys(rigModel.keyframes);
		for (var i = 0; i < keys.length; i++) {
			let key = keys[i];
			let frame = rigModel.keyframes[key];
			frame.render.position.x = Math.round(frame.index * this.hatchMark.spacing + this.hatchMark.spacing / 2);
		}

		this.state._x = Math.round(this.state.currentMark * this.hatchMark.spacing + this.hatchMark.spacing / 2);
	}

	updateState(updateRig) {
		//Updating the state and the rig...

		updateRig = typeof updateRig == "undefined" ? true : updateRig;

		//Update the timeline state
		let frames = getFrames();
		this.state.currentFrame = frames.current;
		this.state.nextFrame = frames.next;
		this.state.previousFrame = frames.previous;

		//Update rig model
		if (updateRig) {
			//Get the current keyframe
			let frame = rigModel.keyframes[this.state.currentMark];
			frame = !frame ? rigModel.keyframes[this.state.currentFrame] : frame;

			if (typeof frame == "object") {
				//Set the rig model's joints to current frame's joints
				rigModel.joints = frame.joints;

				//Set the active joint
				let activeJoint = rigModel.joints.find(j => j.id === frame.activeJointId);
				rigModel.activeJoint = activeJoint || rigModel.joints[rigModel.joints.length - 1];
			}
		}
	}

	redraw() {
		this.clear();
		this.draw();
	}

	clear() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	draw() {
		let timelineGraphParent = this.canvas.parentNode;
		if (this.canvas.width != timelineGraphParent.offsetWidth || this.canvas.height != timelineGraphParent.offsetHeight) {
			this.canvas.width = timelineGraphParent.offsetWidth;
			this.canvas.height = timelineGraphParent.offsetHeight;
		}

		//Drawing the timeline...

		//Background
		this.context.beginPath();
		this.context.rect(0, 0, this.canvas.width, this.canvas.height - config.render.timeline.height);
		this.context.fillStyle = "rgba(0, 0, 0, 0.15)";
		this.context.fill();
		this.context.closePath();

		//Hatch marks
		let hatchMarkCount = timelineApp.totalFrames;
		let hatchMarkColor = "rgba(255, 255, 255, 0.25)";
		this.hatchMark.spacing = this.canvas.width / hatchMarkCount;
		let gap = Math.floor(utils.clamp(timelineApp.totalFrames, 30, Number.MAX_SAFE_INTEGER) / 30) * 5;
		for (var i = 0; i < hatchMarkCount; i++) {
			let offsetHeight = (i + 1) % gap == 0 ? 2 : 0;
			let x = this.hatchMark.spacing * i + this.hatchMark.spacing / 2;
			let y = this.canvas.height - config.render.timeline.height - this.hatchMark.height - offsetHeight;
			let height = this.canvas.height - config.render.timeline.height;
			this.createLine(x, y, x, height, hatchMarkColor);
			if (offsetHeight && i != this.state.currentMark) {
				this.text(i + 1, x, y - 1, hatchMarkColor);
			}
		}

		//Current frame marker
		let currentFrameMarkerX = this.state.isDragging ? this.state._x : Math.round(this.state.currentMark * this.hatchMark.spacing + this.hatchMark.spacing / 2);
		//this.createLine(currentFrameMarkerX, 0, currentFrameMarkerX, this.canvas.height, config.accent);

		//Current frame marker controller
		let currentFrameMarkerHandleWidth = 10;
		let currentFrameMarkerHandleHeight = this.canvas.height - config.render.timeline.height - this.hatchMark.height - 5;
		let currentFrameMarkerText = this.state.currentMark + 1;
		/*this.context.beginPath();
		this.context.moveTo(currentFrameMarkerX, this.canvas.height - currentFrameMarkerHandleHeight);
		this.context.lineTo(currentFrameMarkerX + currentFrameMarkerHandleWidth / 2, this.canvas.height - currentFrameMarkerHandleHeight + currentFrameMarkerHandleHeight / 4);
		this.context.lineTo(currentFrameMarkerX + currentFrameMarkerHandleWidth / 2, this.canvas.height);
		this.context.lineTo(currentFrameMarkerX - currentFrameMarkerHandleWidth / 2, this.canvas.height);
		this.context.lineTo(currentFrameMarkerX - currentFrameMarkerHandleWidth / 2, this.canvas.height - currentFrameMarkerHandleHeight + currentFrameMarkerHandleHeight / 4);
		this.context.closePath();*/
		this.context.beginPath();
		this.context.rect(currentFrameMarkerX - currentFrameMarkerHandleWidth / 2, 0, currentFrameMarkerHandleWidth, currentFrameMarkerHandleHeight);
		this.context.closePath();
		this.context.fillStyle = config.accent;
		this.context.fill();
		let currentFrameMarkerTextX = currentFrameMarkerHandleWidth;
		this.text(currentFrameMarkerText, currentFrameMarkerX + currentFrameMarkerTextX, currentFrameMarkerHandleHeight / 2 + 8, config.accent, "left");

		//Keyframes
		let keyframes = Object.keys(rigModel.keyframes);
		for (let key of keyframes) {
			let frame = rigModel.keyframes[key];
			if (frame.type == "head") {
				this.createKeyframe(frame.render.position.x, frame.render.position.y, frame.render.size, frame.render.color);
			} else {
				//this.createKeyframe(frame.render.position.x, frame.render.position.y, 4, "#f9404d");
			}
		}
	}

	text(text, x, y, color, textAlign) {
		this.context.beginPath();
		this.context.fillStyle = color;
		this.context.font = "12px Catamaran";
		this.context.textAlign = textAlign || "center";
		this.context.textBaseline = "bottom";
		this.context.fillText(text, x, y);
	}

	createLine(x1, y1, x2, y2, color) {
		this.context.beginPath();
		this.context.moveTo(x1, y1);
		this.context.lineTo(x2, y2);
		this.context.strokeStyle = color;
		this.context.stroke();
	}

	createKeyframe(x, y, size, color) {
		this.context.beginPath();
		this.context.moveTo(x, y - size / 2);
		this.context.lineTo(x + size / 2, y);
		this.context.lineTo(x, y + size / 2);
		this.context.lineTo(x - size / 2, y);
		this.context.closePath();
		this.context.fillStyle = color;
		this.context.fill();
	}

	setCurrentMark(index, updateRig) {
		this.state.currentMark = index;
		timelineApp.setCurrentFrame(this.state.currentMark);
		this.updateState(updateRig);
		this.redraw();
	}

	play() {
		//Animation
		this.loop = setInterval(() => {
			let pos = this.state.currentMark < timelineApp.totalFrames - 1 ? this.state.currentMark + 1 : 0;
			this.setCurrentMark(pos);
		}, 1000 / timelineApp.animationSpeed);
		this.state.isPlaying = true;
	}

	stop() {
		clearInterval(this.loop);
		this.state.isPlaying = false;
	}

	updateSize() {
		let timelineGraphParent = this.canvas.parentNode;
		this.canvas.width = timelineGraphParent.offsetWidth;
		this.canvas.height = timelineGraphParent.offsetHeight;
		this.bounds = this.canvas.getBoundingClientRect();
		this.redraw();
	}

	minimize() {
		let height = timelineApp.$el.offsetHeight;
		let body = document.querySelector("#timelineApp div.row-b");

		timelineApp.$el.style.transform = `translateY(${height - body.offsetTop - 2}px)`;

		this.buttons.minimize.style.transform = "translateY(-40px) rotate(0deg)";

		this.state.isMinimized = true;
	}

	maximize() {
		let height = timelineApp.$el.offsetHeight;
		timelineApp.$el.style.transform = `translateY(${0}px)`;

		this.buttons.minimize.style.transform = "translateY(-40px) rotate(180deg)";

		this.state.isMinimized = false;
	}
}

timeline = new Timeline();

module.exports = {
	app: timelineApp,
	graph: timeline
};