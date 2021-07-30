const events = require("../../../lib/events.js");
const dom = require("../../../lib/dom.js");
const randomTitle = require("../random.title.js");

const saveApp = new Vue({
	el: "#saveApp",
	data: {
		hidden: true,
		closeMsg: "Close",
		defaultTitle: randomTitle.generate()
	},
	methods: {
		show: function() {
			this.defaultTitle = randomTitle.generate();

			this.hidden = false;

			this.$nextTick(() => {
				this.$el.style.opacity = "1";

				dom.query("#saveApp .drag").draggable({
					restrict: true,
					root: this.$el
				});

				setTimeout(() => {
					let filenameInput = document.getElementById("saveFilename");
					filenameInput.focus();
				}, 100);

				events.emit("renderSleep");
			});
		},
		hide: function() {
			this.hidden = true;
			events.emit("renderFocus");
		},
		checkFilename: function(e) {
			let downloadButton = document.getElementById("download");
			if (!e.target.value.length) {
				downloadButton.classList.add("disabled");
			} else {
				downloadButton.classList.remove("disabled");
			}
		},
		validate: function() {
			let filename = document.getElementById("saveFilename").value;
			if (!filename.length) {
				return;
			}

			events.emit("saveProject", filename);
		}
	}
});

module.exports = saveApp;