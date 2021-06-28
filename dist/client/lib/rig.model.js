const mouse = require("../../../lib/mouse.js");
const vector = require("../../../lib/vector.js");
const config = require("../../../lib/config.js");

class RigModel {
	constructor() {
		this.joints = [];
		this.segments = [];
		this.mouseBuffer = 5;
		this.selected = null;
		this._lastId = 0;
	}

	nextId() {
		this._lastId++;
		return this._lastId;
	}
	
	addJoint(x, y) {
		let before = this.selected;
		let joint = {
			id: this.nextId(),
			position: vector(x, y),
			source: before,
			destinations: [],
			length: this.selected ? this.selected.position.dist(x, y) : 0
		};

		if (before) before.destinations.push(joint);

		this.selected = joint;

		this.joints.push(joint);
	}

	selectJoint(x, y) {
		for (var i = 0; i < this.joints.length; i++) {
			let joint = this.joints[i];
			if (joint.position.dist(x, y) < config.render.joint.radius + this.mouseBuffer) {
				this.selected = joint;
			}
		}
	}

	removeJoint(x, y) {
		for (var i = 0; i < this.joints.length; i++) {
			let joint = this.joints[i];
			if (joint.position.dist(x, y) < config.render.joint.radius + this.mouseBuffer) {
				for(var j = 0; j < joint.destinations.length; j++){
					let dest = joint.destinations[j];
					dest.source = joint.source;
					dest.length += joint.length;
				}

				joint.source.destinations.splice(joint.source.destinations.indexOf(joint), 1);
				joint.source.destinations.push(...joint.destinations);
				
				this.joints.splice(this.joints.indexOf(joint), 1);
			}
		}
	}

	moveJoint(x, y) {
		if (!this.selected) return;
		this.selected.position.set(x, y);

		for (var i = 0; i < this.joints.length; i++) {
			let joint = this.joints[i];
			for (var j = 0; j < joint.destinations.length; j++) {
				let dest = joint.destinations[j];
				if (/*dest !== this.selected*/ 1) {
					let destAngle = dest.position.heading(joint.position);
					dest.position.set({
						x: joint.position.x - Math.cos(destAngle) * dest.length,
						y: joint.position.y - Math.sin(destAngle) * dest.length
					});
				}
			}
		}

		for (var i = this.joints.length - 1; i >= 0; i--) {
			let joint = this.joints[i];
			if (joint.source !== this.selected) {
				if (joint.source) {
					let sourceAngle = joint.position.heading(joint.source.position);
					joint.source.position.set({
						x: joint.position.x + Math.cos(sourceAngle) * joint.length,
						y: joint.position.y + Math.sin(sourceAngle) * joint.length
					});
				}
			}
		}
	}

	render(renderer) {
		//Render the line that connects the joints
		for (var i = 0; i < this.joints.length; i++) {
			let joint = this.joints[i];
			if (joint.source) {
				renderer.line(joint.position.x, joint.position.y, joint.source.position.x, joint.source.position.y, {
					lineWidth: config.render.segment.width,
					stroke: config.render.segment.color
				});
			}
		}

		//Render the joints
		for (var i = 0; i < this.joints.length; i++) {
			let joint = this.joints[i];
			let jointColor = joint === this.selected ? config.render.joint.color.selected : config.render.joint.color.default;
			renderer.circle(joint.position.x, joint.position.y, config.render.joint.radius, {
				fill: jointColor
			});
		}
	}
}

module.exports = {
	create: function() {
		return new RigModel();
	}
}