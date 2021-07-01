const mouse = require("../../../../lib/mouse.js");
const config = require("../../../../lib/config.js");
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
			delete: document.getElementById("deleteKeyframe")
		};

		this.addButtonEvents();
		this.addMouseEvents();

		addEventListener("resize", () => {
			this.updateSize()
			this.redraw();
		});

		this.state = {
			isPlaying: false,
			currentMark: 0,
			currentFrame: 0,
			nextFrame: null,
			previousFrame: null
		};

		this.loop = null;
	}

	addMouseEvents() {
		//Moving the timeline marker...

		//Timeline click
		mouse.on("click", event => {
			let mouseX = event.clientX - getOffsetLeft(this.canvas);
			let mouseY = event.clientY - getOffsetTop(this.canvas);
			if (mouseX >= 0 && mouseX <= this.canvas.width && mouseY >= 0 && mouseY <= this.canvas.height) {
				let pos = parseInt(mouseX / (this.canvas.width / timelineApp.totalFrames));
				this.setCurrentMark(pos);
			}
		});

		//Timeline drag
		mouse.on("mousemove", event => {
			let mouseX = event.clientX - getOffsetLeft(this.canvas);
			let mouseY = event.clientY - getOffsetTop(this.canvas);
			if (mouseX >= 0 && mouseX <= this.canvas.width && mouseY >= 0 && mouseY <= this.canvas.height) {
				if (mouse.pressed) {
					let pos = parseInt(mouseX / (this.canvas.width / timelineApp.totalFrames));
					this.setCurrentMark(pos);
				}
			}
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
			rigModel.deleteKeyframe(this.state.currentMark);
		});
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

			//Set the rig model's joints to current frame's joints
			rigModel.joints = frame.joints;

			//Set the active joint
			let activeJoint = rigModel.joints.find(j => j.id === frame.activeJointId);
			rigModel.activeJoint = activeJoint || rigModel.joints[rigModel.joints.length - 1];
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
		let hatchMarkSpacing = this.canvas.width / hatchMarkCount;
		let hatchMarkHeight = 7;
		for (var i = 0; i < hatchMarkCount; i++) {
			let x = hatchMarkSpacing * i + hatchMarkSpacing / 2;
			this.createLine(x, 0, x, hatchMarkHeight, "rgba(255, 255, 255, 0.2)");
		}

		//Current frame marker
		let cfmX = hatchMarkSpacing * this.state.currentMark + hatchMarkSpacing / 2;
		this.createLine(cfmX, 0, cfmX, this.canvas.height, config.accent);

		//Current frame marker controller
		let cfmControllerWidth = 10;
		let cfmControllerHeight = 20;
		this.context.beginPath();
		this.context.moveTo(cfmX, this.canvas.height - cfmControllerHeight);
		this.context.lineTo(cfmX + cfmControllerWidth / 2, this.canvas.height - cfmControllerHeight + cfmControllerHeight / 4);
		this.context.lineTo(cfmX + cfmControllerWidth / 2, this.canvas.height);
		this.context.lineTo(cfmX - cfmControllerWidth / 2, this.canvas.height);
		this.context.lineTo(cfmX - cfmControllerWidth / 2, this.canvas.height - cfmControllerHeight + cfmControllerHeight / 4);
		this.context.closePath();
		this.context.fillStyle = config.accent;
		this.context.fill();

		//Keyframes
		let keyframes = Object.keys(rigModel.keyframes);
		for (let key of keyframes) {
			if (rigModel.keyframes[key].type == "head") {
				this.createKeyframe(parseInt(key) * hatchMarkSpacing + hatchMarkSpacing / 2, 20, "#e6eaed");
			} else {
				this.createKeyframe(parseInt(key) * hatchMarkSpacing + hatchMarkSpacing / 2, 20, "#f9404d");
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

	createKeyframe(x, y, color) {
		let size = 12;
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
}

timeline = new Timeline();

rigModel.setKeyframe(timeline.state.currentMark);
timeline.updateState();
timeline.draw();

module.exports = {
	app: timelineApp,
	graph: timeline
};