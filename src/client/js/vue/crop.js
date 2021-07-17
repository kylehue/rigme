const events = require("../../../../lib/events.js");
const dom = require("../../../../lib/dom.js");
const utils = require("../../../../lib/utils.js");

function createRect(ctx, x, y, width, height) {
	ctx.beginPath();
	ctx.rect(x, y, width, height);
	ctx.closePath();
}

let bounds = {};

const cropApp = new Vue({
	el: "#cropApp",
	data: {
		hidden: true
	},
	methods: {
		show: function(image) {
			this.hidden = false;
			this.$nextTick(() => {
				dom.query("#cropApp .drag").draggable({
					restrict: true,
					root: this.$el
				});

				let canvas = document.getElementById("cropCanvas");
				let context = canvas.getContext("2d");
				let size = utils.scaleSize(image.width, image.height, canvas.parentNode.offsetWidth, canvas.parentNode.offsetWidth);
				canvas.width = size.width;
				canvas.height = size.height;

				bounds = {
					x: 0,
					y: 0,
					width: size.width,
					height: size.height
				};

				context.drawImage(image, bounds.x, bounds.y, bounds.width, bounds.height);

				//Create crop bounding box
				createRect(context, bounds.x, bounds.y, bounds.width, bounds.height);
				context.strokeStyle = "red";
				context.lineWidth = 5;
				context.stroke();
			});
		},
		hide: function() {
			this.hidden = true;
		},
		save: function() {

		}
	}
});

module.exports = cropApp;