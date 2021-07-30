const events = require("../../../lib/events.js");
const utils = require("../../../lib/utils.js");
const dom = require("../../../lib/dom.js");
const timeline = require("./timeline.js");
const randomTitle = require("../random.title.js");

const spritesheetExportApp = new Vue({
	el: "#spritesheetExportApp",
	data: {
		hidden: true
	},
	methods: {
		show: function() {
			this.hidden = false;
			this.$nextTick(() => {
				this.$el.style.opacity = "1";
				dom.query("#spritesheetExportApp .drag").draggable({
					restrict: true,
					root: this.$el
				});

				dom.query("#spritesheetExportApp .custom-checkbox", true).on("click", event => {
					let el = dom.query(event.target).query(".checkbox");
					el.toggleClass("checked");
				});

				dom.query("#spritesheetName").value(randomTitle.generate())

				let startFrame = timeline.graph.playbackHandle.start.mark + 1;
				let endFrame = timeline.graph.playbackHandle.end.mark + 1;
				let bounds = rigModel.bounds;
				let cellWidth = bounds.max.x - bounds.min.x;
				let cellHeight = bounds.max.y - bounds.min.y;
				let rowCount = Math.ceil(Math.sqrt(endFrame - startFrame));
				dom.query("#spritesheetStart").value(startFrame);
				dom.query("#spritesheetEnd").value(endFrame);
				dom.query("#spritesheetCellWidth").value(cellWidth.toFixed(2));
				dom.query("#spritesheetCellHeight").value(cellHeight.toFixed(2));
				dom.query("#spritesheetRowCount").value(rowCount);

				setTimeout(() => {
					let title = document.getElementById("spritesheetName");
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

			if (e.target.id == "spritesheetRowCount") {
				let totalFrames = parseInt(dom.query("#spritesheetEnd").value()) - parseInt(dom.query("#spritesheetStart").value());

				max = totalFrames + 1;
			}

			if (e.target.id == "spritesheetStart") {
				max = parseInt(dom.query("#spritesheetEnd").value());
			}

			if (e.target.id == "spritesheetEnd") {
				max = timeline.app.totalFrames;
			}

			if (parseInt(value) > max) {
				e.target.value = max.toString();
			}
		},
		validateMin: function(e) {
			let value = e.target.value;
			let min = e.target.dataset.min;

			if (e.target.id == "spritesheetEnd") {
				min = parseInt(dom.query("#spritesheetStart").value());
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

			if (e.target.id == "spritesheetCellWidth" || e.target.id == "spritesheetCellHeight") {
				value = value.toFixed(2);
			}

			e.target.value = value.toString();
			this.validateAmount(e);
		},
		validate: function() {
			let name = dom.query("#spritesheetName").value();
			let startFrame = parseInt(dom.query("#spritesheetStart").value());
			let endFrame = parseInt(dom.query("#spritesheetEnd").value());
			let totalFrames = endFrame - startFrame + 1;
			let cellWidth = parseFloat(dom.query("#spritesheetCellWidth").value());
			let cellHeight = parseFloat(dom.query("#spritesheetCellHeight").value());
			let rowCount = parseInt(dom.query("#spritesheetRowCount").value());
			let showSkin = dom.query("#spritesheetShowSkin").query(".checkbox").hasClass("checked");
			let showBones = dom.query("#spritesheetShowBones").query(".checkbox").hasClass("checked");
			let columnCount = Math.ceil(totalFrames / rowCount);
			events.emit("exportSpritesheet", {
				name: name.length ? name : utils.uid(),
				start: startFrame,
				end: endFrame,
				totalFrames: totalFrames,
				cellWidth: cellWidth,
				cellHeight: cellHeight,
				rows: rowCount,
				cols: columnCount,
				showSkin: showSkin,
				showBones: showBones
			});
		}
	}
});

module.exports = spritesheetExportApp;