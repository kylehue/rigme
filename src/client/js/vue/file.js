const saveApp = require("./save.js");
const loadApp = require("./load.js");
const overlayApp = require("./overlay.js");

const fileApp = new Vue({
	el: "#fileApp",
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
				this.position.x = x;
				this.position.y = y;
				this.$el.style.left = `${this.position.x}px`;
				this.$el.style.top = `${this.position.y}px`;
			});
		},
		hide: function() {
			this.hidden = true;
		},
		showSaveApp: function () {
			saveApp.show();
			this.hide();
		},
		showLoadApp: function () {
			loadApp.show();
			this.hide();
		},
		showOverlayApp: function () {
			overlayApp.show();
			this.hide();
		}
	}
});

module.exports = fileApp;