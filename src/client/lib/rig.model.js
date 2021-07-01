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

	setKeyframe(index) {
		if (typeof index != "number") return;

		let keyframe = {
			type: "head",
			index: index,
			activeJointId: this.activeJoint ? this.activeJoint.id : null,
			joints: clonedeep(this.joints)
		};

		this.keyframes[index] = keyframe;

		//Hidden keyframes
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
				let currentFrame = timeline.graph.state.currentFrame;
				let previousFrame = timeline.graph.state.previousFrame;

				for (var i = currentFrame - 1; i >= previousFrame + 1; i--) {
					let subJoints = clonedeep(this.keyframes[currentFrame].joints);

					let subKeyframe = {
						type: "sub",
						index: i,
						activeJointId: null,
						joints: subJoints
					};

					this.keyframes[i] = subKeyframe;
				}
			}
		}

		this.updateSubKeyframes();

		if (timeline.graph) {
			timeline.graph.updateState();
			timeline.graph.redraw();
		}
	}

	deleteKeyframe(index) {
		if (Object.keys(this.keyframes).length <= 1) return;
		let subs = [];
		let leftHead;
		let rightHead;

		//Get left subs
		for (var i = index - 1; i >= 0; i--) {
			let key = this.keyframes[i];
			if (key) {
				if (key.type == "sub") {
					subs.push(key.index);
				}

				if (key.type == "head") {
					leftHead = key.index;
					break;
				}
			}
		}

		//Get right subs
		for (var i = index + 1; i < timeline.app.totalFrames; i++) {
			let key = this.keyframes[i];
			if (key) {
				if (key.type == "sub") {
					subs.push(key.index);
				}

				if (key.type == "head") {
					rightHead = key.index;
					break;
				}
			}
		}

		//Delete left & right subs
		for (var i = 0; i < subs.length; i++) {
			delete this.keyframes[subs[i]];
		}

		//Delete head
		delete this.keyframes[index];

		let lastPos;

		if (timeline.graph) {
			lastPos = timeline.graph.state.currentMark;

			//Temporarily set the current mark to the next frame's index to get the correct states when resetting the keyframe
			timeline.graph.setCurrentMark(timeline.graph.state.nextFrame || timeline.graph.state.currentFrame);
		}

		//Merge the left-end head and the right-end head by simply resetting the right-end head's keyframe
		this.setKeyframe(rightHead)

		if (timeline.graph) {
			//Set back the current mark to old one
			timeline.graph.setCurrentMark(lastPos);

			//
			timeline.graph.updateState();
			timeline.graph.redraw();
		}

		this.updateSubKeyframes();
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
				let frontJoint = frontFrame.joints.find(fj => fj.id === joint.id);
				let backJoint = backFrame.joints.find(bj => bj.id === joint.id);
				let position = frontJoint.position.copy().lerp(backJoint.position, lerpWeight);

				joint.position.set(position);
			}

			this.fixJointsPosition(frame.joints);
		}
	}

	addJoint(x, y, arr) {
		arr = arr || this.joints;

		let before = this.activeJoint;
		let joint = {
			id: utils.uid(),
			position: vector(x, y),
			source: before,
			destinations: [],
			length: this.activeJoint ? this.activeJoint.position.dist(x, y) : 0
		};

		if (before) before.destinations.push(joint);

		this.activeJoint = joint;

		arr.push(joint);

		if (timeline.graph) {
			timeline.graph.setCurrentMark(timeline.graph.state.currentFrame, false);
			this.updateKeyframe(timeline.graph.state.currentFrame, {
				activeJointId: this.activeJoint.id
			});
		}
	}

	selectJoint(x, y) {
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

	removeJoint(x, y, arr) {
		arr = arr || this.joints;

		for (var i = 0; i < arr.length; i++) {
			let joint = arr[i];
			if (joint.position.dist(x, y) < config.render.joint.radius + this.mouseBuffer) {
				for (var j = 0; j < joint.destinations.length; j++) {
					let dest = joint.destinations[j];
					dest.source = joint.source;
					dest.length += joint.length;
					this.activeJoint = dest;
				}

				if (joint.source) {
					joint.source.destinations.splice(joint.source.destinations.indexOf(joint), 1);
					joint.source.destinations.push(...joint.destinations);
					this.activeJoint = joint.source;
				}

				if (!joint.destinations.length && !joint.source) {
					this.activeJoint = null;
				}

				arr.splice(arr.indexOf(joint), 1);
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

	fixJointsPosition(arr) {
		for (var i = 0; i < arr.length; i++) {
			let joint = arr[i];
			for (var j = 0; j < joint.destinations.length; j++) {
				let dest = joint.destinations[j];
				if ( /*dest !== this.activeJoint*/ 1) {
					let destAngle = dest.position.heading(joint.position);
					dest.position.set({
						x: joint.position.x - Math.cos(destAngle) * dest.length,
						y: joint.position.y - Math.sin(destAngle) * dest.length
					});
				}
			}
		}

		for (var i = arr.length - 1; i >= 0; i--) {
			let joint = arr[i];
			if (joint.source !== this.activeJoint) {
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

	moveJoint(x, y, arr) {
		arr = arr || this.joints;

		if (!this.activeJoint) return;
		if (x && y) this.activeJoint.position.set(x, y);

		this.fixJointsPosition(this.joints);

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
		if (timeline.graph) {

		}

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
			let jointColor = joint === this.activeJoint ? config.render.joint.color.selected : config.render.joint.color.default;
			if (timeline.graph) {
				if (this.activeJoint && !timeline.graph.state.isPlaying) {
					if (this.activeJoint.destinations.length) jointColor = this.activeJoint.destinations.includes(joint) ? "#5bff85" : jointColor;
					if (this.activeJoint.source) jointColor = this.activeJoint.source === joint ? "#6893e1" : jointColor;
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