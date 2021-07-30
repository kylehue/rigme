const events = require("../../../lib/events.js");
const dom = require("../../../lib/dom.js");
const utils = require("../../../lib/utils.js");
const config = require("../../../lib/config.js");

function createRect(ctx, x, y, width, height) {
	ctx.beginPath();
	ctx.rect(x, y, width, height);
	ctx.closePath();
}

const cropApp = new Vue({
	el: "#cropApp",
	data: {
		cropFrom: {
			x: 0,
			y: 0
		},
		cropTo: null,
		cropBoundsThickness: 6,
		canvas: null,
		context: null,
		image: null,
		imageSize: null,
		hidden: true
	},
	methods: {
		show: function(img) {
			this.hidden = false;
			this.$nextTick(() => {
				this.$el.style.opacity = "1";
				dom.query("#cropApp .drag").draggable({
					restrict: true,
					root: this.$el
				});

				this.canvas = document.getElementById("cropCanvas");
				this.context = this.canvas.getContext("2d");

				this.image = img;
				this.imageSize = utils.scaleSize(this.image.width, this.image.height, this.canvas.parentNode.offsetWidth, this.canvas.parentNode.offsetWidth);
				this.canvas.width = this.imageSize.width;
				this.canvas.height = this.imageSize.height;

				if (!this.cropTo) {
					this.cropTo = {
						x: this.imageSize.width,
						y: this.imageSize.height
					}
				}

				this.redraw();
			});

			events.emit("renderSleep");
		},
		redraw: function() {
			if (this.canvas && this.context && this.image) {
				let ctx = this.context;

				ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

				//Draw image
				ctx.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height);

				//Make cropped areas darker
				ctx.beginPath();
				ctx.moveTo(this.cropFrom.x, this.cropFrom.y);
				ctx.lineTo(this.cropTo.x, this.cropFrom.y);
				ctx.lineTo(this.cropTo.x, this.cropTo.y);
				ctx.lineTo(this.cropFrom.x, this.cropTo.y);
				ctx.lineTo(this.cropFrom.x, this.cropFrom.y);
				ctx.lineTo(0, 0);
				ctx.lineTo(0, this.canvas.height);
				ctx.lineTo(this.canvas.width, this.canvas.height);
				ctx.lineTo(this.canvas.width, 0);
				ctx.lineTo(0, 0);
				ctx.closePath();
				ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
				ctx.fill();

				//Create crop bounding box
				ctx.save();
				ctx.clip();
				createRect(ctx, this.cropFrom.x - this.cropBoundsThickness / 2, this.cropFrom.y - this.cropBoundsThickness / 2, this.cropTo.x - this.cropFrom.x + this.cropBoundsThickness, this.cropTo.y - this.cropFrom.y + this.cropBoundsThickness);
				ctx.fillStyle = config.accent;
				ctx.fill();
				ctx.restore();
			}
		},
		hide: function() {
			this.hidden = true;
			this.canvas = null;
			this.context = null;
			events.emit("renderFocus");
		},
		getCrop: function () {
			return {
				from: {
					x: utils.map(this.cropFrom.x, 0, this.imageSize.width, 0, this.image.width),
					y: utils.map(this.cropFrom.y, 0, this.imageSize.height, 0, this.image.height)
				},
				to: {
					x: utils.map(this.cropTo.x, 0, this.imageSize.width, 0, this.image.width),
					y: utils.map(this.cropTo.y, 0, this.imageSize.width, 0, this.image.width)
				}
			};
		},
		save: function() {
			this.hide();
			events.emit("crop", this.getCrop(), {
				from: this.cropFrom,
				to: this.cropTo
			});
		},
		reset: function () {
			this.cropFrom = {
				x: 0,
				y: 0
			};

			this.cropTo = {
				x: this.canvas.width,
				y: this.canvas.height
			};

			this.redraw();
		}
	}
});

function getMousePosition(x, y) {
	let onTop = false,
		onBottom = false,
		onLeft = false,
		onRight = false;
	if (x >= cropApp.cropFrom.x - cropApp.cropBoundsThickness && x <= cropApp.cropFrom.x + cropApp.cropBoundsThickness && y >= cropApp.cropFrom.y - cropApp.cropBoundsThickness && y <= cropApp.cropTo.y + cropApp.cropBoundsThickness) {
		onLeft = true;
	} else {
		onLeft = false;
	}

	if (x >= cropApp.cropTo.x - cropApp.cropBoundsThickness && x <= cropApp.cropTo.x + cropApp.cropBoundsThickness && y >= cropApp.cropFrom.y - cropApp.cropBoundsThickness && y <= cropApp.cropTo.y + cropApp.cropBoundsThickness) {
		onRight = true;
	} else {
		onRight = false;
	}

	if (y >= cropApp.cropFrom.y - cropApp.cropBoundsThickness && y <= cropApp.cropFrom.y + cropApp.cropBoundsThickness && x >= cropApp.cropFrom.x - cropApp.cropBoundsThickness && x <= cropApp.cropTo.x + cropApp.cropBoundsThickness) {
		onTop = true;
	} else {
		onTop = false;
	}

	if (y >= cropApp.cropTo.y - cropApp.cropBoundsThickness && y <= cropApp.cropTo.y + cropApp.cropBoundsThickness && x >= cropApp.cropFrom.x - cropApp.cropBoundsThickness && x <= cropApp.cropTo.x + cropApp.cropBoundsThickness) {
		onBottom = true;
	} else {
		onBottom = false;
	}

	return {
		top: onTop,
		right: onRight,
		bottom: onBottom,
		left: onLeft
	};
}

let doc = dom.query("body");
let isDragging = false,
	startMousePos,
	startMouse,
	startWidth,
	startHeight;

function dragStart(event) {
	if (cropApp.canvas && cropApp.context) {
		let mouseX = event.clientX;
		let mouseY = event.clientY;
		let canvasBounds = cropApp.canvas.getBoundingClientRect();
		let canvasX = mouseX - canvasBounds.x;
		let canvasY = mouseY - canvasBounds.y;
		isDragging = true;
		startMousePos = getMousePosition(canvasX, canvasY);
		startMouse = {
			x: canvasX - cropApp.cropFrom.x,
			y: canvasY - cropApp.cropFrom.y
		};
		startWidth = cropApp.cropTo.x - cropApp.cropFrom.x;
		startHeight = cropApp.cropTo.y - cropApp.cropFrom.y;
	}
}

function dragEnd() {
	isDragging = false;
}

function drag(event) {
	let mouseX = event.clientX;
	let mouseY = event.clientY;
	if (cropApp.canvas && cropApp.context) {
		let canvasBounds = cropApp.canvas.getBoundingClientRect();
		let canvasX = mouseX - canvasBounds.x;
		let canvasY = mouseY - canvasBounds.y;

		let mousePos = getMousePosition(canvasX, canvasY);

		let inside = canvasX >= cropApp.cropFrom.x + cropApp.cropBoundsThickness / 2 && canvasX <= cropApp.cropTo.x - cropApp.cropBoundsThickness / 2 && canvasY >= cropApp.cropFrom.y + cropApp.cropBoundsThickness / 2 && canvasY <= cropApp.cropTo.y - cropApp.cropBoundsThickness / 2;

		if (isDragging) {
			if (startMousePos.top) {
				cropApp.cropFrom.y = canvasY;
				cropApp.redraw();
			}

			if (startMousePos.left) {
				cropApp.cropFrom.x = canvasX;
				cropApp.redraw();
			}

			if (startMousePos.bottom) {
				cropApp.cropTo.y = canvasY;
				cropApp.redraw();
			}

			if (startMousePos.right) {
				cropApp.cropTo.x = canvasX;
				cropApp.redraw();
			}

			if (!startMousePos.top && !startMousePos.bottom && !startMousePos.left && !startMousePos.right && inside) {
				cropApp.cropFrom.x = canvasX - startMouse.x;
				cropApp.cropFrom.y = canvasY - startMouse.y;
				cropApp.cropTo.x = cropApp.cropFrom.x + startWidth;
				cropApp.cropTo.y = cropApp.cropFrom.y + startHeight;
				cropApp.redraw();
			}

			cropApp.cropFrom.y = utils.clamp(cropApp.cropFrom.y, 0, cropApp.cropTo.y)
			cropApp.cropFrom.x = utils.clamp(cropApp.cropFrom.x, 0, cropApp.cropTo.x)
			cropApp.cropTo.y = utils.clamp(cropApp.cropTo.y, cropApp.cropFrom.y, cropApp.canvas.height)
			cropApp.cropTo.x = utils.clamp(cropApp.cropTo.x, cropApp.cropFrom.x, cropApp.canvas.width)
		} else {
			if (mousePos.left || mousePos.right) {
				doc.css("cursor", "ew-resize");
			}

			if (mousePos.top || mousePos.bottom) {
				doc.css("cursor", "ns-resize");
			}

			if (mousePos.top && mousePos.left) {
				doc.css("cursor", "nw-resize");
			}

			if (mousePos.top && mousePos.right) {
				doc.css("cursor", "ne-resize");
			}

			if (mousePos.bottom && mousePos.left) {
				doc.css("cursor", "sw-resize");
			}

			if (mousePos.bottom && mousePos.right) {
				doc.css("cursor", "se-resize");
			}

			if (!mousePos.top && !mousePos.bottom && !mousePos.left && !mousePos.right) {
				doc.css("cursor", "unset");
			}

			if (inside) {
				doc.css("cursor", "move");
			}
		}
	}
}

addEventListener("mousedown", dragStart);
addEventListener("mouseup", dragEnd);
addEventListener("mousemove", drag);


module.exports = cropApp;