const events = require("../../../../lib/events.js");
const utils = require("../../../../lib/utils.js");
const dom = require("../../../../lib/dom.js");
const timeline = require("./timeline.js");
const randomTitle = require("../../lib/random.title.js");

const GIFExportApp = new Vue({
	el: "#GIFExportApp",
	data: {
		hidden: true
	},
	methods: {
		show: function() {
			this.hidden = false;
			this.$nextTick(() => {
				this.$el.style.opacity = "1";
				dom.query("#GIFExportApp .drag").draggable({
					restrict: true,
					root: this.$el
				});

				dom.query("#GIFExportApp .custom-checkbox", true).on("click", event => {
					let el = dom.query(event.target).query(".checkbox");
					el.toggleClass("checked");
				});

				dom.query("#GIFExportName").value(randomTitle.generate())

				let startFrame = timeline.graph.playbackHandle.start.mark + 1;
				let endFrame = timeline.graph.playbackHandle.end.mark + 1;
				let bounds = rigModel.bounds;
				let frameWidth = bounds.max.x - bounds.min.x;
				let frameHeight = bounds.max.y - bounds.min.y;
				dom.query("#GIFExportStart").value(startFrame);
				dom.query("#GIFExportEnd").value(endFrame);
				dom.query("#GIFExportWidth").value(frameWidth.toFixed(2));
				dom.query("#GIFExportHeight").value(frameHeight.toFixed(2));

				setTimeout(() => {
					let title = document.getElementById("GIFExportName");
					title.focus();
				}, 100);

				events.emit("renderSleep");
			});
		},
		hide: function() {
			this.hidden = true;
			events.emit("renderFocus");
		},
		validateFormat: function(e) {
			e.target.value = e.target.value.replace(/[^0-9.-]/g, "").replace(/(\..*)\./g, "$1").replace(/^0+/g, "").replace(/(?<!^)-/g, "");
			this.validateMax(e);
		},
		validateAmount: function(e) {
			this.validateMin(e);
			this.validateMax(e);
		},
		validateMax: function(e) {
			let value = e.target.value;
			let max = e.target.dataset.max;

			if (e.target.id == "GIFExportStart") {
				max = parseInt(dom.query("#GIFExportEnd").value());
			}

			if (e.target.id == "GIFExportEnd") {
				max = timeline.app.totalFrames;
			}

			if (parseInt(value) > max) {
				e.target.value = max.toString();
			}
		},
		validateMin: function(e) {
			let value = e.target.value;
			let min = e.target.dataset.min;

			if (e.target.id == "GIFExportEnd") {
				min = parseInt(dom.query("#GIFExportStart").value());
			}

			if (parseInt(value) < min) {
				e.target.value = min.toString();
			}
		},
		toggleAmount: function(e) {
			if (e.target != document.activeElement) return;
			if (!e.target.value.length) {
				e.target.value = 1;
			}

			let isDown = e.wheelDeltaY < 0;
			let value = parseFloat(e.target.value);
			if (isDown) {
				value--;
			} else {
				value++;
			}

			if (e.target.id == "GIFExportWidth" || e.target.id == "GIFExportHeight") {
				value = value.toFixed(2);
			}

			e.target.value = value.toString();
			this.validateAmount(e);
		},
		validate: function() {
			let name = dom.query("#GIFExportName").value();
			let startFrame = parseInt(dom.query("#GIFExportStart").value());
			let endFrame = parseInt(dom.query("#GIFExportEnd").value());
			let totalFrames = endFrame - startFrame + 1;
			let width = parseFloat(dom.query("#GIFExportWidth").value());
			let height = parseFloat(dom.query("#GIFExportHeight").value());
			let background = dom.query("#GIFExportBackground").value();
			let showSkin = dom.query("#GIFExportShowSkin").query(".checkbox").hasClass("checked");
			let showBones = dom.query("#GIFExportShowBones").query(".checkbox").hasClass("checked");
			events.emit("exportGIF", {
				name: name.length ? name : utils.uid(),
				start: startFrame,
				end: endFrame,
				totalFrames: totalFrames,
				width: width,
				height: height,
				showSkin: showSkin,
				showBones: showBones,
				background: background
			});
		}
	}
});

module.exports = GIFExportApp;