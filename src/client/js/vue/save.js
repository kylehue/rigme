const events = require("../../../../lib/events.js");
const randomTitle = require("../../lib/random.title.js");
const block = document.getElementById("block");

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
				block.style.display = "block";

				let filenameInput = document.getElementById("saveFilename");
				filenameInput.focus();
			});
		},
		hide: function() {
			this.hidden = true;
			block.style.display = "none";
		},
		checkFilename: function(e) {
			let downloadButton = document.getElementById("download");
			if (!e.target.value.length) {
				downloadButton.classList.add("disabled");
			}else{
				downloadButton.classList.remove("disabled");
			}
		},
		validate: function () {
			let filename = document.getElementById("saveFilename").value;
			if (!filename.length) {
				return;
			}

			events.emit("saveProject", filename);
			this.hide();
		}
	}
});

module.exports = saveApp;