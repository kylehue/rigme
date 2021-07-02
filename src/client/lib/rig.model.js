const mouse = require("../../../lib/mouse.js");
const vector = require("../../../lib/vector.js");
const config = require("../../../lib/config.js");
const utils = require("../../../lib/utils.js");
const clonedeep = require("lodash.clonedeep");

let timeline = require("../js/vue/timeline.js");

let _forceRequireTimeline = setInterval(function() {
	if (!timeline.graph) {
		timeline = require("../js/vue/timeline.js");
	} else {
		clearInterval(_forceRequireTimeline);
	}
}, 10);

class RigModel {
	constructor() {
		this.joints = [];
		this.segments = [];
		this.keyframes = {};

		this.mouseBuffer = 10;
		this.activeJoint = null;
	}

	getKeyframe(findKey, value) {
		let keyframes = Object.values(this.keyframes);
		let res = keyframes.find(k => k[findKey] === value);
		if (res) {
			return this.keyframes[res.index];
		}

		return null;
	}

	addSubKeyframes(start, end) {
		if (timeline.graph) {
			let keys = Object.keys(this.keyframes);
			for (var i = 0; i < keys.length; i++) {
				if (this.keyframes[keys[i]].type == "sub") {
					keys.splice(i, 1);
					break;
				}
			}

			//If there's more than 1 frame
			if (keys.length > 1) {
				//...then add the hidden key frames
				timeline.graph.updateState();

				for (var i = end - 1; i >= start + 1; i--) {
					let subJoints = clonedeep(this.keyframes[end].joints);

					let subKeyframe = {
						id: utils.uid(),
						type: "sub",
						index: i,
						activeJointId: null,
						joints: subJoints,
						render: {
							size: 12,
							color: "red",
							position: vector(i * timeline.graph.hatchMark.spacing + timeline.graph.hatchMark.spacing / 2, config.render.keyframe.y)
						}
					};

					this.keyframes[i] = subKeyframe;
				}
			}
		}

		this.updateSubKeyframes();
		timeline.graph.updateState();
		timeline.graph.redraw();
	}

	setKeyframe(index, options) {
		if (typeof index != "number") return;
		options = options || {};

		let keyframe = {
			id: utils.uid(),
			type: "head",
			index: index,
			activeJointId: this.activeJoint ? this.activeJoint.id : null,
			joints: options.joints || clonedeep(this.joints),
			render: {
				size: config.render.keyframe.size,
				color: config.render.keyframe.color.default,
				position: options.position || vector(index * timeline.graph.hatchMark.spacing + timeline.graph.hatchMark.spacing / 2, config.render.keyframe.y)
			},
			locked: options.locked || false
		};

		this.keyframes[index] = keyframe;

		if (timeline.graph) {
			timeline.graph.updateState();
			let currentFrame = timeline.graph.state.currentFrame;
			let previousFrame = timeline.graph.state.previousFrame;
			this.addSubKeyframes(previousFrame, currentFrame);
			timeline.graph.redraw();
		}

		return keyframe;
	}

	deleteKeyframe(id) {
		let keyframe = this.getKeyframe("id", id);

		if (!keyframe) return;
		if (Object.keys(this.keyframes).length <= 1) return;
		let subs = [];
		let leftHead;
		let rightHead;

		//Get left subs
		for (var i = keyframe.index - 1; i >= 0; i--) {
			let key = this.keyframes[i];
			if (key) {
				if (key.type == "sub") {
					subs.push(key);
				}

				if (key.type == "head") {
					leftHead = key;
					break;
				}
			}
		}

		//Get right subs
		for (var i = keyframe.index + 1; i < timeline.app.totalFrames; i++) {
			let key = this.keyframes[i];
			if (key) {
				if (key.type == "sub") {
					subs.push(key);
				}

				if (key.type == "head") {
					rightHead = key;
					break;
				}
			}
		}

		//Delete left & right subs
		for (var i = 0; i < subs.length; i++) {
			let frame = this.getKeyframe("id", subs[i].id);
			delete this.keyframes[frame.index];
		}

		//Delete head
		delete this.keyframes[keyframe.index];

		if (rightHead && leftHead) this.addSubKeyframes(leftHead.index, rightHead.index);

		if (timeline.graph) {
			timeline.graph.updateState();
			timeline.graph.redraw();
		}
	}

	updateKeyframe(index, data) {
		let d = Object.keys(data);
		for (var i = 0; i < d.length; i++) {
			this.keyframes[index][d[i]] = data[d[i]];
		}

		this.updateSubKeyframes();
	}

	updateSubKeyframes() {
		let keys = Object.keys(this.keyframes);

		for (var i = keys.length - 1; i >= 0; i--) {
			let frame = this.keyframes[keys[i]];
			if (frame.type == "head") continue;
			if (!frame) continue;

			let back = null;
			for (var j = frame.index; j >= 0; j--) {
				let key = this.keyframes[j];
				if (key) {
					if (key.type == "head") {
						back = key.index;
						break;
					}
				}
			}

			let front = null;
			for (var j = frame.index; j < timeline.app.totalFrames; j++) {
				let key = this.keyframes[j];
				if (key) {
					if (key.type == "head") {
						front = key.index;
						break;
					}
				}
			}

			let lerpWeight = utils.map(frame.index, front, back, 0, 1);

			let frontFrame = this.keyframes[front];
			let backFrame = this.keyframes[back];

			for (var j = 0; j < frame.joints.length; j++) {
				let joint = frame.joints[j];
				if (joint) {
					let frontJoint = frontFrame.joints.find(fj => fj.id === joint.id);
					let backJoint = backFrame.joints.find(bj => bj.id === joint.id);

					if (frontJoint && backJoint) {
						let position = frontJoint.position.copy().lerp(backJoint.position, lerpWeight);

						joint.position.set(position);
						for (var k = 0; k < joint.children.length; k++) {
							let child = joint.children[k];
							child.angle = child.position.heading(joint.position);
						}
					}
				}
			}

			if (!config.linear) this.computeKinematics(frame.joints);
		}
	}

	addJoint(x, y, jointChain) {
		jointChain = jointChain || this.joints;

		//Make sure the joint that is going to be added doesn't go over the top of other joints
		for (var i = 0; i < this.joints.length; i++) {
			let joint = this.joints[i];
			if (joint.position.dist(x, y) < config.render.joint.radius * 2) {
				return;
			}
		}

		if (timeline.graph) {
			timeline.graph.setCurrentMark(timeline.graph.state.currentFrame, false);
		}

		let before = this.activeJoint;
		let joint = {
			id: utils.uid(),
			position: vector(x, y),
			angle: before ? before.position.heading(x, y) : 0,
			parent: before || null,
			children: [],
			length: before ? before.position.dist(x, y) : 0,
			hierarchy: before ? before.hierarchy + 1 : 1 /*this.joints.length*/
		};

		if (before) before.children.push(joint);

		this.activeJoint = joint;

		jointChain.push(joint);

		if (timeline.graph) {
			this.updateKeyframe(timeline.graph.state.currentFrame, {
				activeJointId: this.activeJoint.id
			});
		}
	}

	selectJoint(x, y) {
		if (!this.joints.length) return;

		let joints = this.joints.slice();
		joints.sort((a, b) => {
			return a.position.dist(x, y) - b.position.dist(x, y);
		});

		this.activeJoint = this.joints.find(j => j.id === joints[0].id);

		if (timeline.graph) {
			this.updateKeyframe(timeline.graph.state.currentFrame, {
				activeJointId: this.activeJoint.id
			});
		}
	}

	removeJoint(x, y, jointChain) {
		if (!this.joints.length) return;

		jointChain = jointChain || this.joints;

		for (var i = 0; i < jointChain.length; i++) {
			let joint = jointChain[i];
			if (joint.position.dist(x, y) < config.render.joint.radius + this.mouseBuffer) {
				for (var j = 0; j < joint.children.length; j++) {
					let child = joint.children[j];
					child.parent = joint.parent;
					child.length += joint.length;
					this.activeJoint = child;
				}

				if (joint.parent) {
					joint.parent.children.splice(joint.parent.children.indexOf(joint), 1);
					joint.parent.children.push(...joint.children);
					this.activeJoint = joint.parent;
				}

				if (!joint.children.length && !joint.parent) {
					this.activeJoint = null;
				}

				jointChain.splice(jointChain.indexOf(joint), 1);
			}
		}

		if (this.activeJoint) this.moveJoint(this.activeJoint.position.x, this.activeJoint.position.y);

		if (timeline.graph) {
			timeline.graph.setCurrentMark(timeline.graph.state.currentFrame, false);
			this.updateKeyframe(timeline.graph.state.currentFrame, {
				activeJointId: this.activeJoint.id
			});
		}
	}

	computeKinematics(jointChain) {
		//Forward kinematics
		for (var i = 0; i < jointChain.length; i++) {
			let joint = jointChain[i];
			for (var j = 0; j < joint.children.length; j++) {
				let child = joint.children[j];
				child.angle = child.position.heading(joint.position);
				child.position.set({
					x: joint.position.x - Math.cos(child.angle) * child.length,
					y: joint.position.y - Math.sin(child.angle) * child.length
				});
			}
		}

		/*let doforward = [];
		let doinverse = [];

		for (var i = 0; i < jointChain.length; i++) {
			let joint = jointChain[i];
			if (joint.hierarchy <= this.activeJoint.hierarchy) {
				doinverse.push(joint);
			} 

			if (joint.hierarchy >= this.activeJoint.hierarchy) {
				doforward.push(joint);
			}
		}

		doforward.sort((a, b) => a.hierarchy - b.hierarchy);
		for (var i = 0; i < doforward.length; i++) {
			let joint = doforward[i];
			for (var j = 0; j < joint.children.length; j++) {
				let child = joint.children[j];
				child.angle = child.position.heading(joint.position);
				child.position.set({
					x: joint.position.x - Math.cos(child.angle) * child.length,
					y: joint.position.y - Math.sin(child.angle) * child.length
				});
			}
		}

		doinverse.sort((a, b) => b.hierarchy - a.hierarchy);
		for (var i = doinverse.length - 1; i >= 0; i--) {
			let joint = doinverse[i];
			if (joint.parent !== this.activeJoint) {
				if (joint.parent) {
					joint.parent.angle = joint.position.heading(joint.parent.position);
					joint.parent.position.set({
						x: joint.position.x + Math.cos(joint.parent.angle) * joint.length,
						y: joint.position.y + Math.sin(joint.parent.angle) * joint.length
					});
				}
			}
		}*/

	}

	moveJoint(x, y, jointChain) {
		jointChain = jointChain || this.joints;

		if (!this.activeJoint) return;
		if (x && y) {
			this.activeJoint.position.set(x, y);
		}

		if (!config.linear) this.computeKinematics(this.joints);

		if (timeline.graph) {
			timeline.graph.setCurrentMark(timeline.graph.state.currentFrame, false);
			this.updateSubKeyframes();
		}
	}

	getJoint(id) {
		let joint = this.joints.find(j => j.id === id) || null;
		return joint;
	}

	render(renderer) {
		//Render the line that connects the joints
		for (var i = 0; i < this.joints.length; i++) {
			let joint = this.joints[i];
			if (joint.parent) {
				renderer.line(joint.position.x, joint.position.y, joint.parent.position.x, joint.parent.position.y, {
					lineWidth: config.render.segment.width,
					stroke: config.render.segment.color
				});
			}
		}

		//Render the joints
		for (var i = 0; i < this.joints.length; i++) {
			let joint = this.joints[i];
			let jointColor = joint === this.activeJoint ? config.render.joint.color.selected : config.render.joint.color.default;
			if (timeline.graph) {
				if (this.activeJoint && !timeline.graph.state.isPlaying) {
					if (this.activeJoint.children.length) jointColor = this.activeJoint.children.includes(joint) ? "#5bff85" : jointColor;
					if (this.activeJoint.parent) jointColor = this.activeJoint.parent === joint ? "#9b68e1" : jointColor;
				}

				if (timeline.graph.state.isPlaying) {
					jointColor = config.render.joint.color.default;
				}
			}

			renderer.circle(joint.position.x, joint.position.y, config.render.joint.radius, {
				fill: jointColor
			});
		}
	}
}

const rigModel = new RigModel();


module.exports = rigModel;