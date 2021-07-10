const events = require("../../../../lib/events.js");
const mouse = require("../../../../lib/mouse.js");
const config = require("../../../../lib/config.js");
const utils = require("../../../../lib/utils.js");
const timeline = require("./timeline.js");
const block = document.getElementById("block");

let minOpacity = 0;
let maxOpacity = 1;
let minScale = 0;
let maxScale = 6;
let minAngle = -Math.PI;
let maxAngle = Math.PI;

let activeSliderDrag;
let overlayFrames = [];

const overlayConfigApp = new Vue({
	el: "#overlayConfigApp",
	data: {
		hidden: true,
		closeMsg: "Close",
		opacity: maxOpacity,
		scale: 1,
		angle: 0,
		trimStart: 1,
		trimEnd: timeline.app.totalFrames,
		start: 1
	},
	methods: {
		fixData: function() {
			let fromEl = document.getElementById("overlayConfigTrimStart");
			let toEl = document.getElementById("overlayConfigTrimEnd");
			let startEl = document.getElementById("overlayConfigStart");

			let from = parseInt(fromEl.value);
			let to = parseInt(toEl.value);
			let start = parseInt(startEl.value);
			this.trimStart = from ? from : 1;
			this.trimEnd = to ? to : overlayFrames.length;
			this.start = start ? start : 1;
		},
		validateFormat: function(e) {
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
			this.validateMin(e);
			this.validateMax(e);
		},
		validateMax: function(e) {
			let value = e.target.value;
			let max = e.target.dataset.max;

			if (e.target.id == "overlayConfigTrimStart") {
				max = this.trimEnd;
			}

			if (e.target.id == "overlayConfigTrimEnd") {
				max = overlayFrames.length;
			}

			if (e.target.id == "overlayConfigStart") {
				max = timeline.app.totalFrames;
			}

			if (parseInt(value) > max) {
				e.target.value = max.toString();
			}

			this.fixData();
		},
		validateMin: function(e) {
			let value = e.target.value;
			let min = e.target.dataset.min;

			if (e.target.id == "overlayConfigTrimEnd") {

				min = this.trimStart;
			}

			if (parseInt(value) < min) {
				e.target.value = min.toString();
			}

			this.fixData();
		},
		toggleAmount: function(e) {
			if (!e.target.value.length) {
				e.target.value = 1;
			}

			let isDown = e.wheelDeltaY < 0;
			let value = parseInt(e.target.value);
			if (isDown) {
				value--;
			} else {
				value++;
			}

			e.target.value = value.toString();
			this.validateAmount(e);

			this.fixData();
		},
		updateSliders: function() {
			let sliders = document.querySelectorAll(".slider-wrapper");

			for (var i = 0; i < sliders.length; i++) {
				let slider = sliders[i];

				let handle = slider.querySelector(".handle");
				let handleBounds = handle.getBoundingClientRect();
				let track = slider.querySelector(".track");
				let trackBounds = track.getBoundingClientRect();
				let positionMin = 0;
				let positionMax = trackBounds.width - handleBounds.width;

				let min, max, value;
				if (slider.dataset.label == "opacity") {
					min = minOpacity;
					max = maxOpacity;
					value = this.opacity;
				} else if (slider.dataset.label == "scale") {
					min = minScale;
					max = maxScale;
					value = this.scale;
				} else if (slider.dataset.label == "rotate") {
					min = minAngle;
					max = maxAngle;
					value = this.angle;
				}

				handle.style.left = `${utils.map(value, min, max, positionMin, positionMax)}px`;

				slider.onmousemove = () => {
					if (mouse.dragged && !activeSliderDrag) {
						activeSliderDrag = slider;
					}
				};

				slider.onmousedown = () => {
					activeSliderDrag = slider;
				};
			}

			let configData = {
				opacity: this.opacity,
				scale: this.scale,
				angle: this.angle
			};

			localStorage.setItem(config.autosave.label + ".overlay.config", JSON.stringify(configData));
		},
		show: function() {
			this.hidden = false;
			this.$nextTick(() => {
				this.$el.style.opacity = "1";
				block.style.display = "block";

				let fromEl = document.getElementById("overlayConfigTrimStart");
				let toEl = document.getElementById("overlayConfigTrimEnd");
				let startEl = document.getElementById("overlayConfigStart");

				fromEl.value = this.trimStart;
				toEl.value = this.trimEnd;
				startEl.value = this.start;

				this.updateSliders();
				this.fixData();
			});
		},
		hide: function() {
			block.style.display = "none";
			this.hidden = true;
		},
		reset: function() {
			this.opacity = maxOpacity;
			this.scale = 1;
			this.angle = 0;

			let fromEl = document.getElementById("overlayConfigTrimStart");
			let toEl = document.getElementById("overlayConfigTrimEnd");
			let startEl = document.getElementById("overlayConfigStart");

			fromEl.value = "";
			toEl.value = "";
			startEl.value = "";

			this.fixData();
			this.updateSliders();
		},
		removeOverlay: function() {
			let con = confirm("Are you sure you want to remove the overlay?");
			if (con) {
				events.emit("removeOverlay");
				this.hide();
			}
		}
	}
});

events.on("overlayFrames", _overlayFrames => {
	overlayFrames = _overlayFrames;
	overlayConfigApp.trimEnd = overlayFrames.length;
});

function handleSliders() {
	if (activeSliderDrag) {
		let handle = activeSliderDrag.querySelector(".handle");
		let handleBounds = handle.getBoundingClientRect();
		let track = activeSliderDrag.querySelector(".track");
		let trackBounds = track.getBoundingClientRect();
		let positionMin = 0;
		let positionMax = trackBounds.width - handleBounds.width;
		let position = mouse.x - trackBounds.x - handleBounds.width / 2;
		position = utils.clamp(position, positionMin, positionMax);
		handle.style.left = `${position}px`;

		let min, max, target;
		if (activeSliderDrag.dataset.label == "opacity") {
			min = minOpacity;
			max = maxOpacity;
			target = "opacity";
		} else if (activeSliderDrag.dataset.label == "scale") {
			min = minScale;
			max = maxScale;
			target = "scale";
		} else if (activeSliderDrag.dataset.label == "rotate") {
			min = minAngle;
			max = maxAngle;
			target = "angle";
		}

		let value = utils.map(position, positionMin, positionMax, min, max);
		overlayConfigApp[target] = value;

		let configData = {
			opacity: overlayConfigApp.opacity,
			scale: overlayConfigApp.scale,
			angle: overlayConfigApp.angle
		};

		localStorage.setItem(config.autosave.label + ".overlay.config", JSON.stringify(configData));
	}
}

//Autosave config
utils.loadJSONData(config.autosave.label + ".overlay.config", data => {
	if (typeof data.opacity == "number") overlayConfigApp.opacity = data.opacity;
	if (typeof data.scale == "number") overlayConfigApp.scale = data.scale;
	if (typeof data.angle == "number") overlayConfigApp.angle = data.angle;

	overlayConfigApp.updateSliders();
});

mouse.on("mouseup", function(event) {
	activeSliderDrag = null;
});

mouse.on("mousedown", function(event) {
	handleSliders();
});

mouse.on("mousemove", function(event) {
	if (mouse.dragged) {
		handleSliders();
	}
});

module.exports = overlayConfigApp;