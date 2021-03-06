const saveApp = require("./save.js");
const loadApp = require("./load.js");
const spritesheetExportApp = require("./export.spritesheet.js");
const framesExportApp = require("./export.frames.js");
const GIFExportApp = require("./export.gif.js");

const fileApp = new Vue({
	el: "#fileApp",
	data: {
		showExportFormats: false,
		hidden: true
	},
	methods: {
		show: function() {
			this.hidden = false;
			this.$nextTick(() => {
				let fileButtonBounds = document.getElementById("fileButton").getBoundingClientRect();
				this.$el.style.left = `${fileButtonBounds.x}px`;
				this.$el.style.top = `${fileButtonBounds.y + fileButtonBounds.height + 3}px`;
			});
		},
		hide: function() {
			this.hidden = true;
			this.showExportFormats = false;
		},
		showSaveApp: function () {
			saveApp.show();
		},
		showLoadApp: function () {
			loadApp.show();
		},
		showSpritesheetExportApp: function () {
			spritesheetExportApp.show();
		},
		showFrameExportApp: function () {
			framesExportApp.show();
		},
		showGIFExportApp: function () {
			GIFExportApp.show();
		}
	}
});

module.exports = fileApp;