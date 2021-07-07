const events = require("../../../../lib/events.js");
const block = document.getElementById("block");
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
				block.style.display = "block";
			});
		},
		hide: function() {
			currentJSON = undefined;
			block.style.display = "none";

			let importButton = document.getElementById("import");
			importButton.classList.add("disabled");

			this.fileError = false;
			this.hidden = true;
		},
		checkFile: function() {
			let fileEl = document.getElementById("importInput");
			let filenameEl = document.getElementById("loadFilename");
			let file = fileEl.files[0];
			if (!file) return;
			let filename = file.name;
			let fileExtension = filename.split(".")[filename.split(".").length - 1];
			if (fileExtension == "rigme") {
				filenameEl.innerText = filename;
				let fileURL = URL.createObjectURL(file);
				if (fileURL) {
					fetch(fileURL).then(res => {
						res.text().then(text => {
							let json;
							let error = false;
							try {
								json = JSON.parse(text);
								error = false;
							} catch (e) {
								error = true;
							}

							if (!error) {
								currentJSON = json;
								let importButton = document.getElementById("import");
								importButton.classList.remove("disabled");
								this.fileError = false;
							} else {
								let importButton = document.getElementById("import");
								importButton.classList.add("disabled");
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

			events.emit("importModel", currentJSON);
			this.hide();
		}
	}
});

module.exports = loadApp;