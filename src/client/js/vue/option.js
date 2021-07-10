const events = require("../../../../lib/events.js");
const overlayApp = require("./overlay.js");
const overlayConfig = require("./overlay.config.js");

const optionApp = new Vue({
	el: "#optionApp",
	data: {
		hidden: true,
		overlayConfigHidden: true,
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
		hide: function() {
			this.hidden = true;
		},
		showOverlayApp: function () {
			overlayApp.show();
		},
		showOverlayConfigApp: function () {
			overlayConfig.show();
		},
		clearJoints: function () {
			let con = confirm("Are you sure you want to delete all of the keyframes?");

			if (con) {
				events.emit("clearJoints");
			}
		},
		resetTimeline: function () {
			let con = confirm("Are you sure you want to reset the timeline? (This won't reset the keyframes)");

			if (con) {
				events.emit("resetTimeline");
			}
		},
		resetView: function () {
			events.emit("resetCamera");
		},
		undo: function () {
			events.emit("undo");
		},
		redo: function () {
			events.emit("redo");
		}
	}
});

module.exports = optionApp;