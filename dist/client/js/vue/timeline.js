const clonedeep = require("lodash.clonedeep");
const events = require("../../../lib/events.js");
const mouse = require("../../../lib/mouse.js");
const config = require("../../../lib/config.js");
const utils = require("../../../lib/utils.js");
const vector = require("../../../lib/vector.js");
const rigModel = require("../../lib/rig.model.js");
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
		currentFrame: 0
	},
	methods: {
		fixData: function() {
			this.animationSpeed = parseInt(document.getElementById("animationSpeed").value);
			this.totalFrames = parseInt(document.getElementById("frameCount").value);
			timeline.hatchMark.spacing = timeline.canvas.width / this.totalFrames;
			timeline.snap();
			timeline.redraw();

			if (timeline.playbackHandle.end.mark >= this.totalFrames && this.totalFrames != 1) {
				timeline.playbackHandle.end.mark = this.totalFrames - 1;
				timeline.playbackHandle.end._x = timeline.markToX(timeline.playbackHandle.end.mark);
				timeline.redraw();
			}

			let configData = {
				frameCount: this.totalFrames,
				animationSpeed: this.animationSpeed
			};

			localStorage.setItem(config.autosave.label + ".frames.config", JSON.stringify(configData));
		},
		validateFormat: function(e) {
			timeline.redraw();
			e.target.value = e.target.value.replace(/[^0-9.-]/g, "").replace(/(\..*)\./g, "$1").replace(/^0+/g, "").replace(/(?<!^)-/g, "");

			this.validateMax(e);
			this.fixData();
		},
		validateAmount: function(e) {
			this.validateMin(e);
			this.validateMax(e);

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
		},
		toggleAmount: function(e) {
			if (e.target != document.activeElement) return;
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
			zoomIn: document.getElementById("zoomInTimeline"),
			zoomOut: document.getElementById("zoomOutTimeline"),
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

		this.playbackHandle = {
			start: {
				mark: 0,
				_x: 0
			},
			end: {
				mark: timelineApp.totalFrames - 1,
				_x: 0
			},
			width: 2,
			offset: 6
		}

		this.bounds = this.canvas.getBoundingClientRect();

		this.loop = null;

		this.addButtonEvents();
		this.addMouseEvents();
		this.addKeyboardEvents();
		this.updateSize();

		addEventListener("resize", () => {
			this.updateSize();
			this.scrollbar.left = utils.clamp(this.scrollbar.left, 0, this.canvas.width - this.scrollbar.minWidth);
			this.scrollbar.right = utils.clamp(this.scrollbar.right, this.scrollbar.minWidth, this.canvas.width);
			this.scrollbar.width = this.scrollbar.right - this.scrollbar.left;
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
			color: config.render.timeline.scrollbar.color.default,
			left: 0,
			right: this.canvas.width,
			minWidth: 50,
			zoomSensitivity: 10
		};

		this._timelineHeight = undefined;
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

	markToX(mark, ignoreLimits) {
		let scrollState = utils.map(this.scrollbar.left, 0, this.canvas.width, 0, this.canvas.width * this.scrollbar.zoomSensitivity);
		let scrollIndex = Math.round(utils.clamp(scrollState - this.hatchMark.spacing / 2, 0, Number.MAX_SAFE_INTEGER) / this.hatchMark.spacing);
		let snap = scrollState % this.hatchMark.spacing;
		let x = ((mark - scrollIndex) * this.hatchMark.spacing + this.hatchMark.spacing / 2) - snap;

		return ignoreLimits ? x : utils.clamp(x, this.hatchMark.spacing / 2, this.canvas.width - this.hatchMark.spacing / 2);
	}

	xToMark(x) {
		let scrollState = utils.map(this.scrollbar.left, 0, this.canvas.width, 0, this.canvas.width * this.scrollbar.zoomSensitivity);
		let scrollIndex = Math.round(utils.clamp(scrollState - this.hatchMark.spacing / 2, 0, Number.MAX_SAFE_INTEGER) / this.hatchMark.spacing);
		let snap = scrollState % this.hatchMark.spacing;
		let mark = Math.round((x + snap + this.hatchMark.spacing / 2) / this.hatchMark.spacing) - 1 + scrollIndex;
		return utils.clamp(mark, 0, timelineApp.totalFrames - 1);
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
		let scrollbarDragStartX = 0;
		let mouseX, mouseY;
		let onScrollbar, onTimeline, onKeyframe, onScrollbarLeft, onScrollbarRight, onPlaybackHandle;

		const dragStart = () => {
			if (!mouseInside(this.canvas)) return;
			dragging = true;
			events.emit("renderSleep");

			if (this.playbackHandle.end.mark >= timelineApp.totalFrames && timelineApp.totalFrames != 1) {
				this.playbackHandle.end.mark = timelineApp.totalFrames - 1;
				this.playbackHandle.end._x = this.markToX(this.playbackHandle.end.mark);
				this.redraw();
			}

			//Which area is getting dragged?
			if (dragging && !activeDrag) {
				if (onScrollbar) {
					scrollbarDragStartX = this.scrollbar.left - mouseX;
					activeDrag = "scrollbar";
				} else if (onTimeline) {
					activeDrag = "timeline";
					let playbackHandleStartX = this.markToX(this.playbackHandle.start.mark, true);
					let playbackHandleEndX = this.markToX(this.playbackHandle.end.mark, true);
					let playbackHandleArea = this.playbackHandle.width / 2 + this.playbackHandle.offset / 2;
					if (mouseX >= playbackHandleStartX - playbackHandleArea && mouseX <= playbackHandleStartX + playbackHandleArea) {
						activeDrag = "playbackHandleStart";
					} else if (mouseX >= playbackHandleEndX - playbackHandleArea && mouseX <= playbackHandleEndX + playbackHandleArea) {
						activeDrag = "playbackHandleEnd";
					}
				} else if (onKeyframe) {
					activeDrag = "keyframe";
				}
			}

			if (activeDrag == "timeline") {
				this.state.isDragging = true;
				this.state._x = utils.clamp(mouseX, this.hatchMark.spacing / 2, this.canvas.width - this.hatchMark.spacing / 2);
				let mark = this.xToMark(mouseX);
				if (mark >= 0 && mark <= timelineApp.totalFrames) this.setCurrentMark(mark);
			}

			contextMenuApp.hide();
		}

		const dragEnd = () => {
			dragging = false;
			events.emit("renderFocus");

			if (activeDrag == "playbackHandleStart" || activeDrag == "playbackHandleEnd") {
				let configData = {
					start: this.playbackHandle.start.mark,
					end: this.playbackHandle.end.mark
				}

				localStorage.setItem(config.autosave.label + ".playback.config", JSON.stringify(configData));
			}

			activeDrag = null;

			//Fix sub keyframes by resetting the head keyframe
			if (activeKeyframe) {
				let mark = this.xToMark(this.state._x);

				this.setCurrentMark(mark);
				rigModel.deleteKeyframe(activeKeyframe.id);

				let newFrame = rigModel.setKeyframe(mark, {
					position: activeKeyframe.position,
					joints: activeKeyframe.joints,
					locked: mark == 0 ? true : false
				});
			}

			this.scrollbar.color = config.render.timeline.scrollbar.color.default;

			this.snap();
			this.state.isDragging = false;
			this.playbackHandle.start.isDragging = false;
			this.playbackHandle.end.isDragging = false;
			activeKeyframe = null;
			this.canvas.style.cursor = "default";
			this.redraw();
		}

		const drag = () => {
			mouseX = mouse.x - this.bounds.x;
			mouseY = mouse.y - this.bounds.y;
			if (!dragging) {
				if (mouseY < 0 || mouseY > this.canvas.height || mouseX < 0 || mouseX > this.canvas.width) {
					return;
				}
			}
			
			onScrollbar = mouseY >= 0 && mouseY <= this.scrollbar.height;
			onTimeline = mouseY >= this.scrollbar.height && mouseY <= this.scrollbar.height + this._timelineHeight;
			onKeyframe = mouseY >= this.scrollbar.height + this._timelineHeight && mouseY <= this.canvas.height;

			let resizeAreaSize = 10;
			if (!activeDrag) {
				onScrollbarLeft = mouseX <= this.scrollbar.left + resizeAreaSize;
				onScrollbarRight = mouseX >= this.scrollbar.right - resizeAreaSize;
			}

			//Cursor
			let onScrollbarResize = mouseX >= this.scrollbar.left && mouseX <= this.scrollbar.right && (onScrollbarLeft || onScrollbarRight) && onScrollbar;
			let playbackHandleStartX = this.markToX(this.playbackHandle.start.mark, true);
			let playbackHandleEndX = this.markToX(this.playbackHandle.end.mark, true);
			let playbackHandleArea = this.playbackHandle.width / 2 + this.playbackHandle.offset / 2;
			onPlaybackHandle = ((mouseX >= playbackHandleStartX - playbackHandleArea && mouseX <= playbackHandleStartX + playbackHandleArea) || (mouseX >= playbackHandleEndX - playbackHandleArea && mouseX <= playbackHandleEndX + playbackHandleArea)) && onTimeline;
			if (onScrollbarResize || onPlaybackHandle) {
				this.canvas.style.cursor = "ew-resize";
			} else {
				this.canvas.style.cursor = "default";
			}

			//Check if head keyframes are getting hovered
			if (onKeyframe) {
				let keys = Object.keys(rigModel.keyframes);
				for (var i = 0; i < keys.length; i++) {
					let frame = rigModel.keyframes[keys[i]];
					if (frame.type == "head") {
						let frameX = frame.render.position.x;
						let frameY = frame.render.position.y;
						let frameSize = frame.render.size;
						if (mouseX <= frameX + frameSize && mouseX >= frameX - frameSize && mouseY <= frameY + frameSize && mouseY && mouseY >= frameY - frameSize) {
							frame.hovered = true;
							frame.render.color = config.render.keyframe.color.hovered;
							this.canvas.style.cursor = "pointer";
							this.redraw();
						} else {
							frame.hovered = false;
							frame.render.color = config.render.keyframe.color.default;
							this.redraw();
						}
					}
				}
			}

			//Change scrollbar color when hovered
			if (onScrollbar) {
				if (mouseX >= this.scrollbar.left && mouseX <= this.scrollbar.right) {
					this.scrollbar.color = config.render.timeline.scrollbar.color.hovered;
					this.redraw();
				} else {
					this.scrollbar.color = config.render.timeline.scrollbar.color.default;
					this.redraw();
				}
			} else {
				this.scrollbar.color = config.render.timeline.scrollbar.color.default;
				this.redraw();
			}


			if (dragging) {
				//Scrollbar drag
				if (activeDrag == "scrollbar") {
					if (onScrollbarLeft) {
						this.scrollbar.left = utils.clamp(mouseX, 0, this.scrollbar.right - this.scrollbar.minWidth);
						this.scrollbar.width = this.scrollbar.right - this.scrollbar.left;
						this.canvas.style.cursor = "ew-resize";
					} else if (onScrollbarRight) {
						this.scrollbar.right = utils.clamp(mouseX, this.scrollbar.left + this.scrollbar.minWidth, this.canvas.width);
						this.scrollbar.width = this.scrollbar.right - this.scrollbar.left;
						this.canvas.style.cursor = "ew-resize";
					}

					if (!onScrollbarLeft && !onScrollbarRight) {
						this.scrollbar.left = utils.clamp(mouseX + scrollbarDragStartX, 0, this.canvas.width - this.scrollbar.width);
						this.scrollbar.right = this.scrollbar.left + this.scrollbar.width;
						this.canvas.style.cursor = "default";
					}

					this.snap();
				}

				//Timeline drag
				if (activeDrag == "timeline" || activeDrag == "keyframe") {
					this.state.isDragging = true;
					this.state._x = utils.clamp(mouseX, this.hatchMark.spacing / 2, this.canvas.width - this.hatchMark.spacing / 2);
					let mark = this.xToMark(mouseX);
					if (mark >= 0 && mark <= timelineApp.totalFrames) this.setCurrentMark(mark);
				}

				if (activeDrag == "playbackHandleStart") {
					this.playbackHandle.start.isDragging = true;
					this.playbackHandle.start._x = utils.clamp(mouseX, this.hatchMark.spacing / 2, this.playbackHandle.end._x - this.playbackHandle.width / 2 - this.hatchMark.spacing);
					let mark = this.xToMark(mouseX);
					mark = utils.clamp(mark, 0, this.playbackHandle.end.mark - 1);
					if (mark >= 0 && mark <= timelineApp.totalFrames) {
						this.playbackHandle.start.mark = mark;
					}
					this.canvas.style.cursor = "ew-resize";
				}

				if (activeDrag == "playbackHandleEnd") {
					this.playbackHandle.end.isDragging = true;
					this.playbackHandle.end._x = utils.clamp(mouseX, this.playbackHandle.start._x + this.playbackHandle.width / 2 + this.hatchMark.spacing, this.canvas.width - this.hatchMark.spacing / 2);
					let mark = this.xToMark(mouseX);
					mark = utils.clamp(mark, this.playbackHandle.start.mark + 1, timelineApp.totalFrames - 1);
					if (mark >= 0 && mark <= timelineApp.totalFrames) {
						this.playbackHandle.end.mark = mark;
					}
					this.canvas.style.cursor = "ew-resize";
				}

				//Keyframe drag
				if (activeDrag == "keyframe") {
					if (!activeKeyframe) {
						let keys = Object.keys(rigModel.keyframes);
						for (var i = 0; i < keys.length; i++) {
							let frame = rigModel.keyframes[keys[i]];

							if (!frame) continue;
							if (frame.locked) continue;
							if (frame.hovered) activeKeyframe = frame;
						}
					} else {
						this.state._x = utils.clamp(mouseX, this.hatchMark.spacing / 2, this.canvas.width - this.hatchMark.spacing / 2);
						activeKeyframe.render.position.x = this.state._x;
						activeKeyframe.dragged = true;
						activeKeyframe.render.color = config.render.keyframe.color.active;
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
			} else {
				this.play();
			}

			this.redraw();
		});

		//Add keyframe button
		this.buttons.add.addEventListener("click", () => {
			let clone = rigModel.clone();
			let keyframe = clone[this.state.currentMark];
			let joints;

			if (keyframe) {
				joints = keyframe.joints;
			}

			rigModel.setKeyframe(this.state.currentMark, {
				locked: this.state.currentMark == 0 ? true : false,
				joints: joints
			});
		});

		//Delete keyframe button
		this.buttons.delete.addEventListener("click", () => {
			events.emit("deleteKeyframe");
		});

		let holdInterval;


		//Zoom in
		this.buttons.zoomIn.addEventListener("mousedown", () => {
			events.emit("checkMouseHold", "zoomIn");
		});

		this.buttons.zoomOut.addEventListener("mousedown", () => {
			events.emit("checkMouseHold", "zoomOut");
		});

		events.on("checkMouseHold", button => {
			holdInterval = setInterval(() => {
				if (!mouse.pressed) {
					clearInterval(holdInterval);
					holdInterval = null;
				} else {
					events.emit("mousehold", button);
				}
			}, 1000 / 60);
		});

		events.on("mousehold", button => {
			if (button == "zoomIn") {
				let lerpWeight = utils.map(this.scrollbar.width, 0, this.canvas.width, 0.1, 0.001);
				let currentX = this.markToX(this.state.currentMark, true);
				this.scrollbar.left = utils.lerp(this.scrollbar.left, currentX - this.scrollbar.minWidth / 2, lerpWeight);
				this.scrollbar.right = utils.lerp(this.scrollbar.right, currentX + this.scrollbar.minWidth / 2, lerpWeight);

			} else if (button == "zoomOut") {
				let lerpWeight = utils.map(this.scrollbar.width, 0, this.canvas.width, 0.001, 0.1);
				this.scrollbar.left = utils.lerp(this.scrollbar.left, 0, lerpWeight);
				this.scrollbar.right = utils.lerp(this.scrollbar.right, this.canvas.width, lerpWeight);
			}

			this.scrollbar.width = this.scrollbar.right - this.scrollbar.left;

			this.snap();
			this.redraw();
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
			let keyframeX = this.markToX(frame.index, true);
			frame.render.position.x = keyframeX;
		}

		this.state._x = this.markToX(this.state.currentMark, true);

		this.playbackHandle.start._x = this.markToX(this.playbackHandle.start.mark, true);
		this.playbackHandle.end._x = this.markToX(this.playbackHandle.end.mark, true);

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

		let positionState = utils.map(this.scrollbar.left, 0, this.canvas.width, 0, this.canvas.width * this.scrollbar.zoomSensitivity);
		let zoomState = this.canvas.width + utils.map(this.scrollbar.width, 0, this.canvas.width, this.canvas.width * this.scrollbar.zoomSensitivity, 0);

		let hatchMarkCount = timelineApp.totalFrames;
		let hatchMarkColor = "rgba(255, 255, 255, 0.25)";
		let hatchMarkGap = Math.floor(utils.clamp(timelineApp.totalFrames, (zoomState / 15), Number.MAX_SAFE_INTEGER) / (zoomState / 15)) * 5;

		let scrollbarIndex = Math.round((positionState - this.hatchMark.spacing / 2) / this.hatchMark.spacing);
		let scrollbarIndexRight = Math.round((utils.map(this.scrollbar.right, 0, this.canvas.width, 0, this.canvas.width * this.scrollbar.zoomSensitivity) - this.hatchMark.spacing / 2) / this.hatchMark.spacing);

		let handleX = this.markToX(this.state.currentMark, true);
		handleX = this.state.isDragging ? this.state._x : handleX;
		let handleWidth = 10;
		let handleHeight = this._timelineHeight - this.hatchMark.height;
		let handleText = this.state.currentMark + 1;

		//Scrollbar
		this.createRect(this.scrollbar.left, this.scrollbar.y, this.scrollbar.right - this.scrollbar.left, this.scrollbar.height - 5, this.scrollbar.color, chamfer);

		//Background
		this.createRect(0, this.scrollbar.height, this.canvas.width, this._timelineHeight, timelineColor, chamfer);

		this.context.save();
		this.context.clip();

		//Hatch marks

		this.hatchMark.spacing = zoomState / hatchMarkCount;
		for (var i = 0; i < hatchMarkCount; i++) {
			if (i < scrollbarIndex || i > scrollbarIndexRight) continue;

			let offsetHeight = (i + 1) % hatchMarkGap == 0 ? 2 : 0;
			let x = this.hatchMark.spacing * i + this.hatchMark.spacing / 2 - positionState;
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
		this.context.beginPath();
		this.context.moveTo(handleX - handleWidth / 2, this.scrollbar.height);
		this.context.lineTo(handleX + handleWidth / 2, this.scrollbar.height);
		this.context.lineTo(handleX + handleWidth / 2, this.scrollbar.height + handleHeight - 5);
		this.context.lineTo(handleX, this.scrollbar.height + handleHeight);
		this.context.lineTo(handleX - handleWidth / 2, this.scrollbar.height + handleHeight - 5);
		this.context.closePath();
		this.context.fillStyle = config.accent;
		this.context.fill();
		this.text(handleText, handleX + handleWidth, handleHeight / 2 + 8 + this.scrollbar.height, config.accent, "left");

		//Adjust playback start handle
		let restrictedColor = "rgba(0, 0, 0, 0.15)";
		let startX = this.markToX(this.playbackHandle.start.mark, true);
		startX = this.playbackHandle.start.isDragging ? this.playbackHandle.start._x : startX;
		this.createRect(startX - this.playbackHandle.width / 2, this.scrollbar.height, this.playbackHandle.width, this._timelineHeight, config.accent);
		this.createRect(0, this.scrollbar.height, startX, this._timelineHeight, restrictedColor);

		//Adjust playback end handle
		let endX = this.markToX(this.playbackHandle.end.mark, true);
		endX = this.playbackHandle.end.isDragging ? this.playbackHandle.end._x : endX;
		this.createRect(endX - this.playbackHandle.width / 2, this.scrollbar.height, this.playbackHandle.width, this._timelineHeight, config.accent);
		this.createRect(endX, this.scrollbar.height, this.canvas.width - endX, this._timelineHeight, restrictedColor);

		this.context.restore();

		//Keyframes
		let keyframes = Object.keys(rigModel.keyframes);
		for (let key of keyframes) {
			let frame = rigModel.keyframes[key];
			frame.render.position.y = this.scrollbar.height + this._timelineHeight + frame.render.size + 5;
			let keyframeX = this.markToX(frame.index, true);
			frame.render.position.x = frame.dragged ? mouse.x - this.bounds.x : keyframeX;
			if (frame.type == "head") {
				this.createKeyframe(frame.render.position.x, frame.render.position.y, frame.render.size, frame.render.color);
			} else {
				//this.createKeyframe(frame.render.position.x, frame.render.position.y, frame.render.size, "blue");
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
		events.emit("timelineSeeked");
	}

	play() {
		//Animation
		this.loop = setInterval(() => {
			if (this.state.currentMark < this.playbackHandle.start.mark) {
				this.setCurrentMark(this.playbackHandle.start.mark - 1);
			}

			let pos = this.state.currentMark < this.playbackHandle.end.mark ? this.state.currentMark + 1 : this.playbackHandle.start.mark;
			this.setCurrentMark(pos);
		}, 1000 / timelineApp.animationSpeed);
		this.state.isPlaying = true;
		this.buttons.play.firstChild.src = "assets/svg/round-square.svg";
		document.getElementById("propertyApp").classList.add("disabled");
	}

	stop() {
		clearInterval(this.loop);
		this.state.isPlaying = false;
		this.buttons.play.firstChild.src = "assets/svg/play.svg";
		document.getElementById("propertyApp").classList.remove("disabled");
		events.emit("timelineSeeked");
	}

	updateSize() {
		let _res = () => {
			let parentBounds = this.canvas.parentNode.getBoundingClientRect();
			this.canvas.width = parentBounds.width;
			this.canvas.height = parentBounds.height;
			this.bounds = this.canvas.getBoundingClientRect();
			this.redraw();
		};

		_res();

		setTimeout(_res, 100);
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

utils.loadJSONData(config.autosave.label + ".frames.config", data => {
	let frameCountEl = document.getElementById("frameCount");
	let animationSpeedEl = document.getElementById("animationSpeed");
	if (typeof data.frameCount == "number") {
		frameCountEl.value = data.frameCount;
	}

	if (typeof data.animationSpeed == "number") {
		animationSpeedEl.value = data.animationSpeed;
	}

	timelineApp.fixData();
});

utils.loadJSONData(config.autosave.label + ".playback.config", data => {
	if (typeof data.start == "number") {
		timeline.playbackHandle.start.mark = data.start;
	}

	if (typeof data.end == "number") {
		timeline.playbackHandle.end.mark = data.end;
	}

	timeline.redraw();
});

module.exports = {
	app: timelineApp,
	graph: timeline
};