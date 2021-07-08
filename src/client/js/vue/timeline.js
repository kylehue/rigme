const clonedeep = require("lodash.clonedeep");
const events = require("../../../../lib/events.js");
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
			if (e.target.id == "animationSpeed") max = config.animation.speed.max;
			if (parseInt(value) > max) {
				e.target.value = max.toString();
			}

			this.fixData();
		},
		validateMin: function(e) {
			let value = e.target.value;
			let min = config.animation.frameCount.min;
			if (e.target.id == "animationSpeed") min = config.animation.speed.min;
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
			minimize: document.getElementById("minimize"),
			scrollbar: document.getElementById("timelineScrollbar")
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

		this.scrollbar = {};

		this.bounds = this.canvas.getBoundingClientRect();

		this.loop = null;

		this.addButtonEvents();
		this.addMouseEvents();
		this.addKeyboardEvents();
		this.updateSize();

		addEventListener("resize", () => {
			this.updateSize();
			this.redraw();
		});

		addEventListener("load", (e) => {
			this.updateSize();
			this.redraw();
		});

		this.scrollbar = {
			x: 0,
			y: 0,
			width: this.canvas.width,
			height: undefined,
			color: config.render.timeline.scrollbar.color,
			left: 0,
			right: this.canvas.width,
			minWidth: 50
		};

		this._timelineHeight = undefined;
	}

	ignoreRenderer() {
		events.emit("renderSleep");
	}

	focusRenderer() {
		events.emit("renderFocus");
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
							position: vector(this.state.currentMark * this.hatchMark.spacing + this.hatchMark.spacing / 2, 0),
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

		let dragging = false;
		let activeDrag = null;
		let activeKeyframe;
		let scrollbarResizeLeft = false;
		let scrollbarResizeRight = false;
		let scrollbarDragStartX = 0;
		let mouseX, mouseY;
		let onScrollbar, onTimeline, onKeyframe;
		let scrollbarIndex, handleSnapX;

		const dragStart = () => {
			dragging = true;

			if (onTimeline) {
				this.state._x = utils.clamp(mouseX, this.hatchMark.spacing / 2, this.canvas.width - this.hatchMark.spacing / 2);
				let scrollbarIndex = Math.round(this.scrollbar.positionState / this.hatchMark.spacing);
				let pos = Math.round((mouseX + this.hatchMark.spacing / 2) / this.hatchMark.spacing) - 1 + scrollbarIndex;
				if (pos >= 0 && pos <= timelineApp.totalFrames) this.setCurrentMark(pos);
			}
		}

		const dragEnd = () => {
			dragging = false;
			activeDrag = null;

			//Fix sub keyframes
			if (activeKeyframe) {
				activeKeyframe.dragged = false;
				rigModel.deleteKeyframe(activeKeyframe.id);

				let index = Math.round((this.state._x + this.hatchMark.spacing / 2) / this.hatchMark.spacing) - 1;
				let scrollbarIndex = Math.round((this.scrollbar.positionState - this.hatchMark.spacing / 2) / this.hatchMark.spacing);
				let handleSnapX = this.scrollbar.positionState % this.hatchMark.spacing;
				let keyframeMarkX = Math.round((index + scrollbarIndex) * this.hatchMark.spacing + this.hatchMark.spacing / 2) - handleSnapX;
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
			this.focusRenderer();
			this.redraw();
		}

		const drag = () => {
			mouseX = mouse.x - this.bounds.x;
			mouseY = mouse.y - this.bounds.y;
			onScrollbar = mouseY >= 0 && mouseY <= this.scrollbar.height;
			onTimeline = mouseY >= this.scrollbar.height && mouseY <= this.scrollbar.height + this._timelineHeight;
			onKeyframe = mouseY >= this.scrollbar.height + this._timelineHeight && mouseY <= this.canvas.height;

			scrollbarIndex = Math.round((this.scrollbar.positionState - this.hatchMark.spacing / 2) / this.hatchMark.spacing);
			handleSnapX = this.scrollbar.positionState % this.hatchMark.spacing;

			//Check if head keyframes are getting hovered
			let keys = Object.keys(rigModel.keyframes);
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


			if (dragging && !activeDrag) {
				if (onScrollbar) {
					let resizeAreaSize = 10;
					let onLeft = mouseX <= this.scrollbar.left + resizeAreaSize;
					let onRight = mouseX >= this.scrollbar.right - resizeAreaSize;
					scrollbarResizeLeft = onLeft;
					scrollbarResizeRight = onRight;
					scrollbarDragStartX = this.scrollbar.left - mouseX;
					activeDrag = "scrollbar";
				} else if (onTimeline) {
					activeDrag = "timeline";
				} else if (onKeyframe) {
					activeDrag = "keyframe";
				}
			}

			if (dragging) {
				//Scrollbar drag
				if (activeDrag == "scrollbar") {
					this.ignoreRenderer();
					if (scrollbarResizeLeft) {
						this.scrollbar.left = utils.clamp(mouseX, 0, this.scrollbar.right - this.scrollbar.minWidth);
						this.scrollbar.width = this.scrollbar.right - this.scrollbar.left;
					} else if (scrollbarResizeRight) {
						this.scrollbar.right = utils.clamp(mouseX, this.scrollbar.left + this.scrollbar.minWidth, this.canvas.width);
						this.scrollbar.width = this.scrollbar.right - this.scrollbar.left;
					}

					if (!scrollbarResizeLeft && !scrollbarResizeRight) {
						this.scrollbar.left = utils.clamp(mouseX + scrollbarDragStartX, 0, this.canvas.width - this.scrollbar.width);
						this.scrollbar.right = this.scrollbar.left + this.scrollbar.width;
					}
				}

				//Timeline drag
				if (activeDrag == "timeline") {
					this.ignoreRenderer();
					this.state.isDragging = true;
					this.state._x = utils.clamp(mouseX, this.hatchMark.spacing / 2, this.canvas.width - this.hatchMark.spacing / 2);
					let pos = Math.round((mouseX + handleSnapX + this.hatchMark.spacing / 2) / this.hatchMark.spacing) - 1 + scrollbarIndex;
					if (pos >= 0 && pos <= timelineApp.totalFrames) this.setCurrentMark(pos);
				}

				//Keyframe drag
				if (activeDrag == "keyframe") {
					this.ignoreRenderer();
					for (var i = 0; i < keys.length; i++) {
						let key = keys[i];
						let frame = rigModel.keyframes[key];

						if (!frame) continue;
						if (frame.type == "sub") continue;
						if (frame.locked) continue;
						if (activeKeyframe) continue;
						if (frame.hovered) activeKeyframe = frame;
					}

					if (activeKeyframe) {
						this.state._x = utils.clamp(mouseX, this.hatchMark.spacing / 2, this.canvas.width - this.hatchMark.spacing / 2);
						activeKeyframe.dragged = true;
						activeKeyframe.render.color = config.render.keyframe.color.active;
						this.canvas.style.cursor = "pointer";
					}
				}

				this.redraw();
			}
		}

		this.redraw();

		addEventListener("mouseup", dragEnd);
		addEventListener("mousedown", dragStart);
		addEventListener("mousemove", drag);
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
			console.log(this.state.currentMark)
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
		let scrollbarIndex = Math.round((this.scrollbar.positionState - this.hatchMark.spacing / 2) / this.hatchMark.spacing);
		let handleSnapX = this.scrollbar.positionState % this.hatchMark.spacing;
		let keys = Object.keys(rigModel.keyframes);
		for (var i = 0; i < keys.length; i++) {
			/*let key = keys[i];
			let frame = rigModel.keyframes[key];
			let pos = Math.round((mouse.x - this.bounds.x + handleSnapX + this.hatchMark.spacing / 2) / this.hatchMark.spacing) - 1 + scrollbarIndex;
			frame.index = pos;
			let keyframeMarkX = Math.round((frame.index - scrollbarIndex) * this.hatchMark.spacing + this.hatchMark.spacing / 2) - handleSnapX;
			frame.render.position.x = keyframeMarkX;*/
		}

		let handleMarkX = Math.round((this.state.currentMark - scrollbarIndex) * this.hatchMark.spacing + this.hatchMark.spacing / 2) - handleSnapX;

		this.state._x = utils.clamp(handleMarkX, this.hatchMark.spacing / 2, this.canvas.width - this.hatchMark.spacing / 2);

		this.redraw();
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
		this.scrollbar.height = this.canvas.height * 0.25;
		this._timelineHeight = this.canvas.height * 0.4;

		let timelineColor = "rgba(0, 0, 0, 0.15)";
		let chamfer = 4;

		let hatchMarkCount = timelineApp.totalFrames;
		let hatchMarkColor = "rgba(255, 255, 255, 0.25)";
		let hatchMarkGap = Math.floor(utils.clamp(timelineApp.totalFrames, (this.scrollbar.zoomState / 15), Number.MAX_SAFE_INTEGER) / (this.scrollbar.zoomState / 15)) * 5;

		let scrollbarIndex = Math.round((this.scrollbar.positionState - this.hatchMark.spacing / 2) / this.hatchMark.spacing);
		let handleSnapX = this.scrollbar.positionState % this.hatchMark.spacing;
		let handleMarkX = Math.round((this.state.currentMark - scrollbarIndex) * this.hatchMark.spacing + this.hatchMark.spacing / 2) - handleSnapX;
		let handleX = this.state.isDragging ? this.state._x : handleMarkX;
		let handleWidth = 10;
		let handleHeight = this._timelineHeight - this.hatchMark.height;
		let handleText = this.state.currentMark + 1;

		//Scrollbar
		this.createRect(this.scrollbar.left, this.scrollbar.y, this.scrollbar.right - this.scrollbar.left, this.scrollbar.height - 5, this.scrollbar.color, chamfer);

		//Background
		this.createRect(0, this.scrollbar.height, this.canvas.width, this._timelineHeight, timelineColor, chamfer);

		//Hatch marks
		this.scrollbar.zoomSensitivity = 10;
		this.scrollbar.positionState = utils.map(this.scrollbar.left, 0, this.canvas.width, 0, this.canvas.width * this.scrollbar.zoomSensitivity);
		this.scrollbar.zoomState = this.canvas.width + utils.map(this.scrollbar.width, 0, this.canvas.width, this.canvas.width * this.scrollbar.zoomSensitivity, 0);
		this.hatchMark.spacing = this.scrollbar.zoomState / hatchMarkCount;
		for (var i = 0; i < hatchMarkCount; i++) {
			let offsetHeight = (i + 1) % hatchMarkGap == 0 ? 2 : 0;
			let x = this.hatchMark.spacing * i + this.hatchMark.spacing / 2 - this.scrollbar.positionState;
			let y = this.scrollbar.height + this._timelineHeight - this.hatchMark.height - offsetHeight;
			let width = 1;
			let height = this.scrollbar.height + this._timelineHeight - y;
			this.createRect(x - width / 2, y, width, height, hatchMarkColor);
			if (offsetHeight) {
				let onHandle = x >= handleX - handleWidth / 2 && x <= handleX + handleWidth / 2;
				//Only draw the numbers if it's not on top of the handle
				if (!onHandle) {
					this.text(i + 1, x, y - 1, hatchMarkColor);
				}
			}
		}

		//Handle
		this.createRect(handleX - handleWidth / 2, this.scrollbar.height, handleWidth, handleHeight, config.accent);
		let handleTextX = handleWidth;
		this.text(handleText, handleX + handleTextX, handleHeight / 2 + 8 + this.scrollbar.height, config.accent, "left");

		//Keyframes
		let keyframes = Object.keys(rigModel.keyframes);
		for (let key of keyframes) {
			let frame = rigModel.keyframes[key];
			frame.render.position.y = this.scrollbar.height + this._timelineHeight + frame.render.size + 5;
			let keyframeMarkX = Math.round((frame.index - scrollbarIndex) * this.hatchMark.spacing + this.hatchMark.spacing / 2) - handleSnapX;
			frame.render.position.x = frame.dragged ? mouse.x - this.bounds.x : keyframeMarkX;
			if (frame.type == "head") {
				this.createKeyframe(frame.render.position.x, frame.render.position.y, frame.render.size, frame.render.color);
			} else {
				this.createKeyframe(frame.render.position.x, frame.render.position.y, frame.render.size, "blue");
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

	createRect(x, y, width, height, color, chamfer) {
		chamfer = chamfer || 0;
		this.context.beginPath();
		this.context.moveTo(x + chamfer, y);
		this.context.lineTo(x + width - chamfer, y);
		this.context.quadraticCurveTo(x + width, y, x + width, y + chamfer);
		this.context.lineTo(x + width, y + height - chamfer);
		this.context.quadraticCurveTo(x + width, y + height, x + width - chamfer, y + height);
		this.context.lineTo(x + chamfer, y + height);
		this.context.quadraticCurveTo(x, y + height, x, y + height - chamfer);
		this.context.lineTo(x, y + chamfer);
		this.context.quadraticCurveTo(x, y, x + chamfer, y);
		this.context.closePath();
		this.context.fillStyle = color;
		this.context.fill();
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