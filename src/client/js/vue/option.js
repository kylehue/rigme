const events = require("../../../../lib/events.js");
const overlayApp = require("./overlay.js");

const optionApp = new Vue({
	el: "#optionApp",
	data: {
		hidden: true,
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
		clearJoints: function () {
			events.emit("clearJoints");
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