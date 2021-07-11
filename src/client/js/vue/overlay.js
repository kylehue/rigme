const events = require("../../../../lib/events.js");
const utils = require("../../../../lib/utils.js");
const dom = require("../../../../lib/dom.js");
var currentFileURL, videoDuration;
const overlayApp = new Vue({
	el: "#overlayApp",
	data: {
		hidden: true,
		closeMsg: "Close"
	},
	methods: {
		show: function() {
			this.hidden = false;
			this.$nextTick(() => {
				this.$el.style.opacity = "1";
				dom.query("#overlayApp .drag").draggable({
					restrict: true,
					root: this.$el
				});

				events.emit("renderSleep");
			});
		},
		hide: function() {
			currentFileURL = undefined;
			videoDuration = undefined;

			let filenameEl = document.getElementById("overlayFilename");
			filenameEl.innerText = "Choose a file...";

			let sections = document.querySelectorAll("#overlayApp .section.disabled");

			for (let section of sections) {
				section.classList.add("disabled");
			}

			let addButton = document.getElementById("addOverlay");
			addButton.classList.add("disabled");

			this.hidden = true;
			events.emit("renderFocus");
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
		},
		validateAmount: function(e) {
			this.validateMin(e);
			this.validateMax(e);
		},
		validateMax: function(e) {
			let value = e.target.value;
			let max = e.target.dataset.max;

			if (typeof videoDuration == "number") {
				if (e.target.id == "overlayStart") {
					max = videoDuration;
				}

				if (e.target.id == "overlayEnd") {
					max = videoDuration;
				}
			}

			if (parseInt(value) > max) {
				e.target.value = max.toString();
			}
		},
		validateMin: function(e) {
			let value = e.target.value;
			let min = e.target.dataset.min;

			if (e.target.id == "overlayEnd") {
				let start = parseInt(document.getElementById("overlayStart").value);

				min = start;
			}

			if (parseInt(value) < min) {
				e.target.value = min.toString();
			}
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
		},
		checkFile: function() {
			let fileEl = document.getElementById("overlayInput");
			let filenameEl = document.getElementById("overlayFilename");
			let file = fileEl.files[0];
			if (!file) return;
			filenameEl.innerText = file.name;
			let fileURL = URL.createObjectURL(file);
			if (fileURL) {
				currentFileURL = fileURL;

				//Get data
				const video = document.createElement("video");
				video.crossOrigin = "anonymous"
				video.controls = true;
				video.muted = true;
				video.src = fileURL;
				video.load();
				video.addEventListener("loadedmetadata", () => {
					videoDuration = video.duration;
					video.remove();
				});

				let sections = document.querySelectorAll("#overlayApp .section.disabled");

				for (let section of sections) {
					section.classList.remove("disabled");
				}

				let addButton = document.getElementById("addOverlay");
				addButton.classList.remove("disabled");
			}
		},
		validate: function() {
			if (!currentFileURL) {
				return;
			}

			let frameCount = document.getElementById("overlayFrameCount").value;
			let frameRate = document.getElementById("overlayFrameRate").value;
			let start = document.getElementById("overlayStart").value;
			let end = document.getElementById("overlayEnd").value;
			let quality = document.getElementById("overlayQuality").value;

			frameCount = frameCount.length ? parseInt(frameCount) : undefined;
			frameRate = frameRate.length ? parseInt(frameRate) : undefined;
			start = start.length ? parseInt(start) : undefined;
			end = end.length ? parseInt(end) : undefined;
			quality = quality.length ? parseInt(quality) / 100 : undefined;

			let options = {
				frameCount: frameCount,
				frameRate: frameRate,
				start: start,
				end: end,
				quality: quality
			};

			events.emit("extractFrames", currentFileURL, options);
			this.hide();
		}
	}
});

module.exports = overlayApp;