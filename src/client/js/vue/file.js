const saveApp = require("./save.js");
const loadApp = require("./load.js");

const fileApp = new Vue({
	el: "#fileApp",
	data: {
		showExportFormats: false,
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
			
		},
		showFrameExportApp: function () {
			
		},
		showGIFExportApp: function () {
			
		}
	}
});

module.exports = fileApp;