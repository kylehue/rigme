const mouse = require("../../../../lib/mouse.js");
const config = require("../../../../lib/config.js");
const utils = require("../../../../lib/utils.js");
const rigModel = require("../../lib/rig.model.js");

var lastActiveJointId, lastActiveJointSub;
var timeline;

const timelineApp = new Vue({
	el: "#timelineApp",
	data: {
		hidden: false,
		totalFrames: parseInt(document.getElementById("frameCount").value),
		animationSpeed: parseInt(document.getElementById("animationSpeed").value),
		currentFrame: 0
	},
	methods: {
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

			this.animationSpeed = parseInt(document.getElementById("animationSpeed").value);
			this.totalFrames = parseInt(document.getElementById("frameCount").value);
			timeline.hatchMark.spacing = timeline.canvas.width / this.totalFrames;
			timeline.snap();
		},
		validateAmount: function(e) {
			timelineApp.validateMin(e);
			timelineApp.validateMax(e);

			timeline.redraw();
		},
		validateMax: function(e) {
			let value = e.target.value;
			if (parseInt(value) > config.maxFPS) {
				e.target.value = config.maxFPS.toString();
			}
			timeline.redraw();
		},
		validateMin: function(e) {
			let value = e.target.value;
			if (parseInt(value) < config.minFPS) {
				e.target.value = config.minFPS.toString();
			}
			timeline.redraw();
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
			this.animationSpeed = parseInt(document.getElementById("animationSpeed").value);
			this.totalFrames = parseInt(document.getElementById("frameCount").value);
			timeline.hatchMark.spacing = timeline.canvas.width / this.totalFrames;
			timeline.snap();
			timeline.redraw();
		},
		setCurrentFrame: function(index) {
			this.currentFrame = index;
		}
	}
});

function getOffsetLeft(elem) {
	/*https://stackoverflow.com/a/5598797*/
	var offsetLeft = 0;
	do {
		if (!isNaN(elem.offsetLeft)) {
			offsetLeft += elem.offsetLeft;
		}
	} while (elem = elem.offsetParent);
	return offsetLeft;
}

function getOffsetTop(elem) {
	/*https://stackoverflow.com/a/5598797*/
	var offsetTop = 0;
	do {
		if (!isNaN(elem.offsetTop)) {
			offsetTop += elem.offsetTop;
		}
	} while (elem = elem.offsetParent);
	return offsetTop;
}

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

class Timeline {
	constructor() {
		this.canvas = document.getElementById("timelineGraph");
		this.context = this.canvas.getContext("2d");
		this.updateSize();

		this.buttons = {
			previous: document.getElementById("lastFrame"),
			play: document.getElementById("playStop"),
			next: document.getElementById("nextFrame"),
			add: document.getElementById("addKeyframe"),
			delete: document.getElementById("deleteKeyframe"),
			minimize: document.getElementById("minimize")
		};

		this.addButtonEvents();
		this.addMouseEvents();

		addEventListener("resize", () => {
			this.updateSize()
			this.redraw();
		});

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
			spacing: this.canvas.width / parseInt(timelineApp.totalFrames),
			height: 6
		};

		this.loop = null;
	}

	addMouseEvents() {
		//Moving the timeline marker...

		const isInsideGraph = (x, y) => {
			return x >= 0 && x <= this.canvas.width && y >= 0 && y <= this.canvas.height;
		}

		//Timeline click
		mouse.on("click", event => {
			let mouseX = event.clientX - getOffsetLeft(this.canvas);
			let mouseY = event.clientY - getOffsetTop(this.canvas);
			if (isInsideGraph(mouseX, mouseY)) {
				let pos = Math.round((mouseX + this.hatchMark.spacing / 2) / this.hatchMark.spacing) - 1;
				if (pos >= 0 && pos <= timelineApp.totalFrames) this.setCurrentMark(pos);
			}
		});

		let activeKeyframe;

		//Timeline drag
		mouse.on("mousemove", event => {
			let keys = Object.keys(rigModel.keyframes);
			let mouseX = event.clientX - getOffsetLeft(this.canvas);
			let mouseY = event.clientY - getOffsetTop(this.canvas);

			this.state._x = utils.clamp(mouseX, this.hatchMark.spacing / 2, this.canvas.width - this.hatchMark.spacing / 2);
			if (isInsideGraph(mouseX, mouseY)) {
				//Check if frames are hovered
				for (var i = 0; i < keys.length; i++) {
					let key = keys[i];
					let frame = rigModel.keyframes[key];

					if (!frame) continue;
					if (frame.type == "sub") continue;
					if (frame.locked) continue;

					let frameX = frame.render.position.x;
					let frameY = frame.render.position.y;
					let frameSize = frame.render.size;
					if (mouseX <= frameX + frameSize && mouseX >= frameX - frameSize && mouseY <= frameY + frameSize && mouseY && mouseY >= frameY - frameSize) {
						if (!frame.hovered) {
							frame.hovered = true;
							frame.render.color = config.render.keyframe.color.hovered;
							this.canvas.style.cursor = "pointer";
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
					//Marker drag
					this.state.isDragging = true;
					let pos = Math.round((mouseX + this.hatchMark.spacing / 2) / this.hatchMark.spacing) - 1;
					if (pos >= 0 && pos <= timelineApp.totalFrames) this.setCurrentMark(pos);

					//Check if keyframes is getting hovered
					for (var i = 0; i < keys.length; i++) {
						let key = keys[i];
						let frame = rigModel.keyframes[key];

						if (activeKeyframe) continue;
						if (frame.hovered) activeKeyframe = frame;
					}

				} else {
					this.state.isDragging = false;
					activeKeyframe = null;
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
			let pos = this.state.currentMark < parseInt(timelineApp.totalFrames) - 1 ? this.state.currentMark + 1 : this.state.currentMark;
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
			if (frame) rigModel.deleteKeyframe(frame.id);
		});

		//Minimize / Maximize
		this.buttons.minimize.addEventListener("click", () => {
			if (!this.state.isMinimized) {
				this.maximize();
			}else {
				this.minimize();
			}

			this.state.isMinimized = !this.state.isMinimized;
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
		//Drawing the timeline...

		//Hatch marks
		let hatchMarkCount = parseInt(timelineApp.totalFrames);
		for (var i = 0; i < hatchMarkCount; i++) {
			let x = this.hatchMark.spacing * i + this.hatchMark.spacing / 2;
			this.createLine(x, 0, x, this.hatchMark.height, "rgba(255, 255, 255, 0.2)");
		}

		//Current frame marker
		let currentFrameMarkerX = this.state.isDragging ? this.state._x : Math.round(this.state.currentMark * this.hatchMark.spacing + this.hatchMark.spacing / 2);
		this.createLine(currentFrameMarkerX, 0, currentFrameMarkerX, this.canvas.height, config.accent);

		//Current frame marker controller
		let currentFrameMarkerHandleWidth = 10;
		let currentFrameMarkerHandleHeight = 20;
		this.context.beginPath();
		this.context.moveTo(currentFrameMarkerX, this.canvas.height - currentFrameMarkerHandleHeight);
		this.context.lineTo(currentFrameMarkerX + currentFrameMarkerHandleWidth / 2, this.canvas.height - currentFrameMarkerHandleHeight + currentFrameMarkerHandleHeight / 4);
		this.context.lineTo(currentFrameMarkerX + currentFrameMarkerHandleWidth / 2, this.canvas.height);
		this.context.lineTo(currentFrameMarkerX - currentFrameMarkerHandleWidth / 2, this.canvas.height);
		this.context.lineTo(currentFrameMarkerX - currentFrameMarkerHandleWidth / 2, this.canvas.height - currentFrameMarkerHandleHeight + currentFrameMarkerHandleHeight / 4);
		this.context.closePath();
		this.context.fillStyle = config.accent;
		this.context.fill();

		//Keyframes
		let keyframes = Object.keys(rigModel.keyframes);
		for (let key of keyframes) {
			let frame = rigModel.keyframes[key];
			if (frame.type == "head") {
				this.createKeyframe(frame.render.position.x, frame.render.position.y, frame.render.size, frame.render.color);
			} else {
				this.createKeyframe(frame.render.position.x, frame.render.position.y, 4, "#f9404d");
			}
		}
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
	}

	maximize() {
		let height = timelineApp.$el.offsetHeight;
		let body = document.querySelector("#timelineApp div.row-b");

		timelineApp.$el.style.transform = `translateY(${height - body.offsetTop - 2}px)`;
	}

	minimize() {
		let height = timelineApp.$el.offsetHeight;
		timelineApp.$el.style.transform = `translateY(${0}px)`;
	}
}

timeline = new Timeline();

rigModel.setKeyframe(timeline.state.currentMark, {
	position: {
		x: timeline.hatchMark.spacing / 2,
		y: config.render.keyframe.y
	},
	locked: true
});
timeline.updateState();
timeline.draw();

module.exports = {
	app: timelineApp,
	graph: timeline
};