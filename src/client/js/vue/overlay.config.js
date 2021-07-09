const events = require("../../../../lib/events.js");
const mouse = require("../../../../lib/mouse.js");
const config = require("../../../../lib/config.js");
const utils = require("../../../../lib/utils.js");
const block = document.getElementById("block");

let minOpacity = 0;
let maxOpacity = 1;
let minScale = 0;
let maxScale = 6;
let minAngle = -Math.PI;
let maxAngle = Math.PI;

let activeSliderDrag;

const overlayConfigApp = new Vue({
	el: "#overlayConfigApp",
	data: {
		hidden: true,
		closeMsg: "Close",
		opacity: maxOpacity,
		scale: 1,
		angle: 0
	},
	methods: {
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
				this.updateSliders();
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
let autosavedData = localStorage.getItem(config.autosave.label + ".overlay.config");

if (autosavedData) {
	let data;
	let error = false;
	try {
		data = JSON.parse(autosavedData);
	} catch (e) {
		error = true;
		console.warn("Couldn't load autosaved overlay config.");
	}

	if (data && !error) {
		overlayConfigApp.opacity = data.opacity;
		overlayConfigApp.scale = data.scale;
		overlayConfigApp.angle = data.angle;
	}
}

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