const clonedeep = require("lodash.clonedeep");
const rigModel = require("../../lib/rig.model.js");
const config = require("../../../../lib/config.js");
const utils = require("../../../../lib/utils.js");
const vector = require("../../../../lib/vector.js");

const contextMenuApp = new Vue({
	el: "#contextMenuApp",
	data: {
		selectedKeyframe: null,
		hidden: true,
		position: {
			x: 0,
			y: 0
		},
		width: document.getElementById("contextMenuApp").offsetWidth,
		height: document.getElementById("contextMenuApp").offsetHeight,

	},
	methods: {
		show: function(x, y) {
			this.hidden = false;
			this.$nextTick(() => {
				this.width = this.$el.offsetWidth;
				this.height = this.$el.offsetHeight;
				this.position.x = x;
				this.position.y = y;
				this.$el.style.left = `${this.position.x}px`;
				this.$el.style.top = `${this.position.y}px`;
			});
		},
		hide: function() {
			this.hidden = true;
		},
		copy: function() {
			rigModel.copiedKeyframe = clonedeep(rigModel.getKeyframe("selected", true));
		},
		paste: function() {
			const timeline = require("./timeline.js");
			let copiedKeyframe = rigModel.copiedKeyframe;
			if (copiedKeyframe) {
				rigModel.setKeyframe(timeline.graph.state.currentMark, {
					position: vector(timeline.graph.state.currentMark * timeline.graph.hatchMark.spacing + timeline.graph.hatchMark.spacing / 2, config.render.keyframe.y),
					locked: timeline.graph.state.currentMark == 0 ? true : false,
					id: utils.uid(),
					joints: copiedKeyframe.joints
				});
			}
		}
	}
});

window.contextMenuApp = contextMenuApp;

module.exports = contextMenuApp;