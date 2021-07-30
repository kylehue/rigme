const yj = require("yieldable-json");
const events = require("../../../lib/events.js");
const dom = require("../../../lib/dom.js");

var currentJSON;
const loadApp = new Vue({
	el: "#loadApp",
	data: {
		hidden: true,
		closeMsg: "Close",
		errorMessage: "",
		fileError: false
	},
	methods: {
		show: function() {
			this.hidden = false;
			this.$nextTick(() => {
				this.$el.style.opacity = "1";
				dom.query("#loadApp .drag").draggable({
					restrict: true,
					root: this.$el
				});

				events.emit("renderSleep");
			});
		},
		hide: function() {
			currentJSON = undefined;
			events.emit("renderFocus");

			dom.query("#import").addClass("disabled");

			this.fileError = false;
			this.hidden = true;
		},
		checkFile: function() {
			let fileEl = dom.query("#importInput");
			let filenameEl = dom.query("#loadFilename");
			let file = fileEl.node.files[0];
			if (!file) return;
			let filename = file.name;
			let fileExtension = filename.split(".")[filename.split(".").length - 1];
			let importButton = dom.query("#import");
			importButton.addClass("disabled");
			importButton.text("Processing...", true);
			if (fileExtension == "rigme") {
				filenameEl.text(filename, true);
				let fileURL = URL.createObjectURL(file);
				if (fileURL) {
					fetch(fileURL).then(res => {
						res.text().then(text => {
							let json;
							let error = false;
							try {
								yj.parseAsync(text, (err, res) => {
									if (err) {
										error = true;
										return;
									}

									json = res;
									error = false;
									currentJSON = json;
									importButton.text("Load", true);
									importButton.removeClass("disabled");
									this.fileError = false;
								});
							} catch (e) {
								importButton.addClass("disabled");
								this.errorMessage = "This file is corrupted.";
								this.fileError = true;
							}
						});
					});
				}
			}
		},
		validate: function() {
			if (!currentJSON) {
				return;
			}

			events.emit("loadProject", currentJSON);
			this.hide();
		}
	}
});

module.exports = loadApp;