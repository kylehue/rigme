const rig = require("../lib/rig.js");
const mouse = require("../../../lib/mouse.js");

class RigModel {
	constructor() {
		this.parts = [];
		this.currentPart;
	}

	add(x, y) {
		if (!this.currentPart) {
			let part = rig.create(mouse.x, mouse.y, 2, 20);
			part.setSource(mouse.x, mouse.y);
			this.parts.push(part);
			this.currentPart = part;
		}else{
			this.currentPart.addSegment(20, 0);
		}
		console.log(this.parts);
	}

	render(renderer) {
		for (var i = 0; i < this.parts.length; i++) {
			let part = this.parts[i];
			for (var j = 0; j < part.segments.length; j++) {
				let segment = part.segments[j];
				renderer.circle(segment.pointA.x, segment.pointA.y, 7, {
					fill: "red"
				});

				renderer.fromVertices([segment.pointA, segment.pointB], {
					stroke: "yellow",
					lineWidth: 5
				});
			}
		}

		if (!this.currentPart) return;
		//this.currentPart.setTarget(mouse.x, mouse.y);
	}
}

module.exports = {
	create: function() {
		return new RigModel();
	}
}