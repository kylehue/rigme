const events = require("../../../../lib/events.js");
const mouse = require("../../../../lib/mouse.js");
const overlayApp = require("./overlay.js");
const overlayConfig = require("./overlay.config.js");

const optionApp = new Vue({
	el: "#optionApp",
	data: {
		hidden: true,
		overlayConfigHidden: true,
		showOverlayActions: false,
		overlayConfigDisabled: true,
		position: {
			x: 0,
			y: 0
		}
	},
	methods: {
		show: function(x, y) {
			this.hidden = false;
			this.$nextTick(() => {
				let optionButtonBounds = document.getElementById("optionButton").getBoundingClientRect();
				this.$el.style.left = `${optionButtonBounds.x}px`;
				this.$el.style.top = `${optionButtonBounds.y + optionButtonBounds.height + 3}px`;
			});
		},
		toggleOverlayActions: function (b) {
			this.showOverlayActions = b;
			this.$nextTick(() => {
				if (!this.overlayConfigDisabled) {
					document.getElementById("showOverlayConfigApp").classList.remove("disabled");
					document.getElementById("rotoscope").classList.remove("disabled");
				}
			});
		},
		hide: function() {
			this.hidden = true;
			this.showOverlayActions = false;
		},
		showOverlayApp: function() {
			overlayApp.show();
		},
		showOverlayConfigApp: function() {
			overlayConfig.show();
		},
		clearJoints: function() {
			let con = confirm("Are you sure you want to reset everything?");

			if (con) {
				events.emit("clearJoints");
				events.emit("resetTimeline");
				events.emit("resetCamera");
			}

			setTimeout(() => {
				mouse.pressed = false;
				mouse.dragged = false;
			}, 100);
		},
		resetTimeline: function() {
			let con = confirm("Are you sure you want to reset the timeline? (This action won't affect the keyframes)");

			if (con) {
				events.emit("resetTimeline");
			}

			setTimeout(() => {
				mouse.pressed = false;
				mouse.dragged = false;
			}, 100);
		},
		resetView: function() {
			events.emit("resetCamera");
		},
		undo: function() {
			events.emit("undo");
		},
		redo: function() {
			events.emit("redo");
		},
		rotoscope: function () {
			events.emit("rotoscope");
		}
	}
});

events.on("overlayFrames", () => {
	optionApp.overlayConfigDisabled = false;
});

module.exports = optionApp;