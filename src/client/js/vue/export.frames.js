const events = require("../../../../lib/events.js");
const utils = require("../../../../lib/utils.js");
const dom = require("../../../../lib/dom.js");
const timeline = require("./timeline.js");
const randomTitle = require("../../lib/random.title.js");

const framesExportApp = new Vue({
	el: "#framesExportApp",
	data: {
		hidden: true
	},
	methods: {
		show: function() {
			this.hidden = false;
			this.$nextTick(() => {
				this.$el.style.opacity = "1";
				dom.query("#framesExportApp .drag").draggable({
					restrict: true,
					root: this.$el
				});

				dom.query("#framesExportApp .custom-checkbox", true).on("click", event => {
					let el = dom.query(event.target).query(".checkbox");
					el.toggleClass("checked");
				});

				dom.query("#framesExportName").value(randomTitle.generate())

				let startFrame = timeline.graph.playbackHandle.start.mark + 1;
				let endFrame = timeline.graph.playbackHandle.end.mark + 1;
				let bounds = rigModel.bounds;
				let frameWidth = bounds.max.x - bounds.min.x;
				let frameHeight = bounds.max.y - bounds.min.y;
				dom.query("#framesExportStart").value(startFrame);
				dom.query("#framesExportEnd").value(endFrame);
				dom.query("#framesExportWidth").value(frameWidth.toFixed(2));
				dom.query("#framesExportHeight").value(frameHeight.toFixed(2));

				setTimeout(() => {
					let title = document.getElementById("framesExportName");
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

			if (e.target.id == "framesExportStart") {
				max = parseInt(dom.query("#framesExportEnd").value());
			}

			if (e.target.id == "framesExportEnd") {
				max = timeline.app.totalFrames;
			}

			if (parseInt(value) > max) {
				e.target.value = max.toString();
			}
		},
		validateMin: function(e) {
			let value = e.target.value;
			let min = e.target.dataset.min;

			if (e.target.id == "framesExportEnd") {
				min = parseInt(dom.query("#framesExportStart").value());
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

			if (e.target.id == "framesExportWidth" || e.target.id == "framesExportHeight") {
				value = value.toFixed(2);
			}

			e.target.value = value.toString();
			this.validateAmount(e);
		},
		validate: function() {
			let name = dom.query("#framesExportName").value();
			let startFrame = parseInt(dom.query("#framesExportStart").value());
			let endFrame = parseInt(dom.query("#framesExportEnd").value());
			let totalFrames = endFrame - startFrame + 1;
			let frameWidth = parseFloat(dom.query("#framesExportWidth").value());
			let frameHeight = parseFloat(dom.query("#framesExportHeight").value());
			let showSkin = dom.query("#framesExportShowSkin").query(".checkbox").hasClass("checked");
			let showBones = dom.query("#framesExportShowBones").query(".checkbox").hasClass("checked");
			events.emit("exportFrames", {
				name: name.length ? name : utils.uid(),
				start: startFrame,
				end: endFrame,
				totalFrames: totalFrames,
				frameWidth: frameWidth,
				frameHeight: frameHeight,
				showSkin: showSkin,
				showBones: showBones
			});
		}
	}
});

module.exports = framesExportApp;