const events = require("../../../lib/events.js");
const mouse = require("../../../lib/mouse.js");
const vector = require("../../../lib/vector.js");
const config = require("../../../lib/config.js");
const utils = require("../../../lib/utils.js");
const history = require("./history.js");

let timeline;

class RigModel {
	constructor() {
		this.joints = [];
		this.keyframes = {};
		this.totalKeyframes = 0;

		this.mouseBuffer = 5;
		this.activeJoint = null;

		this.bounds = {
			min: vector(),
			max: vector()
		};

		this._moved = false;
	}

	updateBounds() {
		let keys = Object.keys(this.keyframes);
		let xAxes = [];
		let yAxes = [];
		for (var i = 0; i < keys.length; i++) {
			let frame = this.keyframes[keys[i]];
			for (var j = 0; j < frame.joints.length; j++) {
				let joint = frame.joints[j];
				xAxes.push(joint.position.x);
				yAxes.push(joint.position.y);
			}
		}

		this.bounds.min.set({
			x: Math.min(...xAxes),
			y: Math.min(...yAxes)
		});

		this.bounds.max.set({
			x: Math.max(...xAxes),
			y: Math.max(...yAxes)
		});
	}

	reset() {
		this.keyframes = {};
		this.joints = [];
		this.totalKeyframes = 0;
		this.activeJoint = null;

		if (timeline.graph) {
			this.setKeyframe(0, {
				position: {
					x: timeline.graph.hatchMark.spacing / 2,
					y: 0
				},
				locked: true,
				ignoreHistory: true
			});

			timeline.graph.setCurrentMark(0);
			timeline.graph.updateState();
		}

		this.updateBounds();

		history.add({
			label: "Clear",
			value: this.clone(),
			group: "keyframe"
		});
	}

	clone(keyframes) {
		keyframes = keyframes || this.keyframes;
		let clone = this.fromJSON(this.toJSON(keyframes));
		return clone;
	}

	getKeyframe(findKey, value) {
		let keyframes = Object.values(this.keyframes);
		let res = keyframes.find(k => k[findKey] === value);
		if (res) {
			return this.keyframes[res.index];
		}

		return null;
	}

	editJoint(id, prop) {
		let keyframes = Object.values(this.keyframes);
		for (var i = 0; i < keyframes.length; i++) {
			let frame = keyframes[i];
			let joint = frame.joints.find(j => j.id === id);
			if (joint) {
				let _props = Object.keys(prop);
				for (var j = 0; j < _props.length; j++) {
					joint[_props[j]] = prop[_props[j]];
				}
			}
		}
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

			let clone = this.clone();

			//If there's more than 1 frame
			if (keys.length > 1) {
				//...then add the hidden key frames
				timeline.graph.updateState();

				for (var i = end - 1; i >= start + 1; i--) {
					let clone = this.clone();
					let subJoints = clone[end].joints;

					let subKeyframe = {
						id: utils.uid(),
						type: "sub",
						index: i,
						activeJointId: clone.activeJointId,
						joints: subJoints,
						render: {
							size: 12,
							color: "red",
							position: vector(i * timeline.graph.hatchMark.spacing + timeline.graph.hatchMark.spacing / 2, 0)
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
			type: "head",
			index: options.keyframe ? options.keyframe.index : index,
			activeJointId: options.keyframe ? options.keyframe.activeJointId : (this.activeJoint ? this.activeJoint.id : null),
			joints: options.joints,
			render: {
				size: config.render.keyframe.size,
				color: config.render.keyframe.color.default,
				position: options.position || vector(index * timeline.graph.hatchMark.spacing + timeline.graph.hatchMark.spacing / 2, 0)
			},
			locked: options.locked || false
		};

		if (timeline.graph) {
			let clone = this.clone()[timeline.graph.state.currentFrame];
			let joints = clone ? clone.joints : [];
			if (options.joints) joints = options.joints;
			keyframe.joints = joints;
		}

		keyframe.id = options.id || utils.uid();

		this.keyframes[index] = keyframe;

		if (timeline.graph) {
			timeline.graph.updateState();
			let currentFrame = timeline.graph.state.currentFrame;
			let previousFrame = timeline.graph.state.previousFrame;
			this.addSubKeyframes(previousFrame, currentFrame);
			timeline.graph.redraw();
		}

		//History
		if (!options.ignoreHistory) {
			let frames = Object.values(this.keyframes);
			let headCount = 0;
			for (var i = 0; i < frames.length; i++) {
				let frame = frames[i];
				if (frame.type == "head") headCount++;
			}

			let historyLabel = "Add keyframe";
			if (headCount == this.totalKeyframes) {
				historyLabel = "Move keyframe";
			}

			this.updateBounds();

			history.add({
				label: historyLabel,
				value: this.clone(),
				group: "keyframe"
			});

			this.totalKeyframes = headCount;
			return keyframe;
		}
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

		this.updateBounds();
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
			if (!frame) continue;
			if (frame.type == "head") continue;

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
						let position = frontJoint.position.copy().lerp(backJoint.position, lerpWeight)
						let length = utils.lerp(frontJoint.length, backJoint.length, lerpWeight);

						joint.length = length;
						joint.position.set(position);
						for (var k = 0; k < joint.children.length; k++) {
							let child = joint.children[k];
							child.angle = child.position.heading(joint.position);
						}
					}

					if (joint.id == backFrame.activeJointId) {
						frame.activeJointId = joint.id;
					}
				}
			}

			if (config.riggingMode != "linear") {
				if (config.riggingMode == "forwardKinematics") {
					this.computeKinematics(frame.joints);
				} else if (config.riggingMode == "inverseKinematics") {
					this.computeKinematics(frame.joints, true);
				}
			}
		}
	}

	addJoint(x, y, options) {
		options = options || {};
		if (timeline.graph) {
			timeline.graph.setCurrentMark(timeline.graph.state.currentFrame, false);
		}

		let parent = options.parent || this.activeJoint;

		let joint = {
			id: "J" + utils.uid(),
			name: `Joint ${this.joints.length + 1}`,
			position: vector(x, y),
			positionPrev: vector(x, y),
			angle: parent ? vector(x, y).heading(parent.position) : 0,
			parent: parent || null,
			children: [],
			length: parent ? parent.position.dist(x, y) : 0,
			hierarchy: parent ? parent.hierarchy + 1 : 1,
			skin: {},
			zIndex: this.joints.length + 1
		};

		if (parent) parent.children.push(joint);

		if (!options.ignoreDefaults) {
			this.activeJoint = joint;
		}

		this.joints.push(joint);

		if (timeline.graph) {
			this.updateKeyframe(timeline.graph.state.currentFrame, {
				activeJointId: this.activeJoint.id
			});
		}

		this.updateBounds();

		if (!options.ignoreHistory) {
			history.add({
				label: "Add joint",
				value: this.clone(),
				group: "keyframe"
			});
		}

		events.emit("jointChange", this.joints);

		return joint;
	}

	selectJoint(x, y) {
		if (!this.joints.length) return;

		let joints = this.joints.slice();
		joints.sort((a, b) => {
			return a.position.dist(x, y) - b.position.dist(x, y);
		});

		this.activeJoint = this.joints.find(j => j.id === joints[0].id);

		events.emit("jointChange", this.joints);

		if (timeline.graph) {
			this.updateKeyframe(timeline.graph.state.currentFrame, {
				activeJointId: this.activeJoint.id
			});
		}
	}

	removeJointById(id) {
		let keys = Object.keys(this.keyframes);
		for (var i = 0; i < keys.length; i++) {
			let frame = this.keyframes[keys[i]];
			let joint = frame.joints.find(j => j.id === id);
			if (joint) {
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
				} else {
					this.activeJoint = joint.children[0];
				}

				frame.joints.splice(frame.joints.indexOf(joint), 1);
			}
		}

		//Fix position
		if (this.activeJoint) {
			this.moveJoint(this.activeJoint.position.x, this.activeJoint.position.y);
		}

		this.updateBounds();

		history.add({
			label: "Remove joint",
			value: this.clone(),
			group: "keyframe"
		});

		events.emit("jointChange", this.joints);
	}

	removeJointByPosition(x, y) {
		if (!this.joints.length) return;

		for (var i = 0; i < this.joints.length; i++) {
			let joint = this.joints[i];
			if (joint.position.dist(x, y) < config.render.joint.radius + this.mouseBuffer) {
				this.removeJointById(joint.id);
			}
		}
	}

	computeKinematics(jointChain, inverse) {
		if (!inverse) {
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
		} else {
			for (var i = jointChain.length - 1; i >= 0; i--) {
				let joint = jointChain[i];
				if (joint.parent) {
					joint.parent.angle = joint.position.heading(joint.parent.position);
					joint.parent.position.set({
						x: joint.position.x + Math.cos(joint.parent.angle) * joint.length,
						y: joint.position.y + Math.sin(joint.parent.angle) * joint.length
					});
				}
			}
		}
	}

	moveJoint(x, y) {
		if (!this.activeJoint) return;
		if (timeline.graph) {
			if (config.animation.autoAddKeyframe) {
				if (!this.activeJoint.position.equals(x, y)) {
					let currentMark = timeline.graph.state.currentMark;
					let frame = this.keyframes[currentMark];
					if (!frame) {
						this.setKeyframe(currentMark);
					} else {
						if (frame.type != "head") {
							this.setKeyframe(currentMark);
						}
					}
				}
			} else {
				timeline.graph.setCurrentMark(timeline.graph.state.currentFrame, false);
				timeline.graph.updateState();
			}

			this.updateSubKeyframes();
		}

		if (x && y) {
			if (this.activeJoint.position.dist(this.activeJoint.positionPrev) > 1) {
				this._moved = true;
				this.activeJoint.positionPrev.set(this.activeJoint.position.x, this.activeJoint.position.y);
			}

			this.activeJoint.position.set(x, y);

			if (config.riggingMode == "linear") {
				if (this.activeJoint.parent) {
					this.activeJoint.angle = this.activeJoint.position.heading(this.activeJoint.parent.position);

					this.activeJoint.length = this.activeJoint.position.dist(this.activeJoint.parent.position);
				}

				for (var i = 0; i < this.activeJoint.children.length; i++) {
					let child = this.activeJoint.children[i];
					child.length = child.position.dist(this.activeJoint.position);
				}
			}

			this.updateBounds();
		}

		if (config.riggingMode != "linear") {
			if (config.riggingMode == "forwardKinematics") {
				this.computeKinematics(this.joints);
			} else if (config.riggingMode == "inverseKinematics") {
				this.computeKinematics(this.joints, true);
			}
		}
	}

	getJoint(id) {
		let joint = this.joints.find(j => j.id === id) || null;
		return joint;
	}

	toJSON(_keyframes, excludeImageSrc) {
		let keyframes = _keyframes || this.clone();
		let json = {};
		let keys = Object.keys(keyframes);

		for (var i = 0; i < keys.length; i++) {
			let key = keys[i];
			let frame = keyframes[key];

			let keyframe = {
				id: frame.id,
				activeJointId: frame.activeJointId,
				index: frame.index,
				joints: [],
				render: frame.render,
				type: frame.type,
				locked: frame.locked
			};

			for (var j = 0; j < frame.joints.length; j++) {
				let joint = frame.joints[j];

				let jointData = {
					id: joint.id,
					name: joint.name,
					angle: joint.angle,
					position: joint.position,
					positionPrev: joint.positionPrev,
					length: joint.length,
					parent: joint.parent ? joint.parent.id : null,
					hierarchy: joint.hierarchy,
					children: [],
					skinImageSrc: joint.skin && !excludeImageSrc ? joint.skin.imageSrc : undefined,
					skinCrop: joint.skin ? joint.skin.crop : null,
					skinOffset: joint.skin ? joint.skin.offset : null,
					_vueCrop: joint.skin ? joint.skin._vueCrop : null,
					zIndex: joint.zIndex
				};

				for (var k = 0; k < joint.children.length; k++) {
					let child = joint.children[k];
					jointData.children.push(child.id);
				}

				keyframe.joints.push(jointData);
			}

			json[keyframe.index] = keyframe;
		}

		return json;
	}

	fromJSON(json) {
		if (!json) return;

		let result = {};
		let keys = Object.keys(json);

		for (var i = 0; i < keys.length; i++) {
			let key = keys[i];
			let frame = json[key];
			let activeJoint = frame.joints.find(j => j.id === frame.activeJointId);

			let parsedJoints = [];

			//Parse joint data
			for (var j = 0; j < frame.joints.length; j++) {
				let joint = frame.joints[j];
				let data = {
					id: joint.id,
					name: joint.name,
					angle: joint.angle,
					position: vector(joint.position),
					positionPrev: vector(joint.positionPrev),
					length: joint.length,
					hierarchy: joint.hierarchy,
					parent: joint.parent,
					children: joint.children.slice(),
					skin: {
						offset: joint.skinOffset,
						crop: joint.skinCrop,
						_vueCrop: joint._vueCrop,
						imageSrc: joint.skinImageSrc
					},
					zIndex: joint.zIndex
				}

				parsedJoints.push(data);
			}

			//Find parent and children
			for (var j = 0; j < parsedJoints.length; j++) {
				let joint = parsedJoints[j];

				joint.parent = parsedJoints.find(pj => pj.id === joint.parent) || null;

				for (var k = 0; k < joint.children.length; k++) {
					let child = joint.children[k];

					joint.children[k] = parsedJoints.find(pj => pj.id === child) || null;
				}
			}

			let parsedFrame = {
				activeJointId: frame.activeJointId,
				id: frame.id,
				index: frame.index,
				joints: parsedJoints,
				locked: frame.locked,
				render: frame.render,
				type: frame.type
			};

			result[frame.index] = parsedFrame;
		}

		return result;
	}

	import (keyframes) {
		this.keyframes = this.clone(keyframes);

		let frames = Object.values(this.keyframes);
		let headCount = 0;
		for (var i = 0; i < frames.length; i++) {
			let frame = frames[i];
			if (frame.type == "head") headCount++;
		}

		this.totalKeyframes = headCount;

		if (timeline.graph) {
			//timeline.graph.setCurrentMark(0, false);
			let currentFrame = this.keyframes[timeline.graph.state.currentMark];

			if (currentFrame) {
				this.activeJoint = this.getKeyframe("id", currentFrame.activeJointId);
				if (this.activeJoint) {
					this.updateKeyframe(timeline.graph.state.currentFrame, {
						activeJointId: this.activeJoint.id
					});
				}
			}

			timeline.graph.updateState();
		}

		this.updateBounds();
		events.emit("jointChange", this.joints);
	}

	render(renderer) {
		let _render = (jointChain, isPrev) => {
			let translucent = "rgba(240, 230, 255, 0.5)";
			//Render the line that connects the joints
			for (var i = 0; i < jointChain.length; i++) {
				let joint = jointChain[i];
				if (joint.parent) {
					renderer.line(joint.position.x, joint.position.y, joint.parent.position.x, joint.parent.position.y, {
						lineWidth: config.render.segment.width,
						stroke: isPrev ? translucent : config.render.segment.color
					});
				}
			}

			//Render the joints
			for (var i = 0; i < jointChain.length; i++) {
				let joint = jointChain[i];

				let jointColor = joint === this.activeJoint ? config.render.joint.color.selected : config.render.joint.color.default;
				if (timeline.graph && !isPrev) {
					if (this.activeJoint && !timeline.graph.state.isPlaying) {
						if (this.activeJoint.children.length) jointColor = this.activeJoint.children.includes(joint) ? "#5bff85" : jointColor;
						if (this.activeJoint.parent) jointColor = this.activeJoint.parent === joint ? "#9b68e1" : jointColor;
					}

					if (joint.parent) {
						if (joint.skin.imageSrc) {
							if (!joint.skin.image) {
								let img = new Image();
								img.src = joint.skin.imageSrc;
								joint.skin.image = img;
							} else {
								if (!joint.skin.image.width) {
									let img = new Image();
									img.src = joint.skin.imageSrc;
									joint.skin.image = img;
								}
							}
						}

						if (joint.skin) {
							if (typeof joint.skin.image == "object") {
								if (joint.skin.image.src) {
									let newWidth = joint.length;
									let newHeight = joint.length;
									let angleAuto = 0;

									let crop = joint.skin.crop;
									let cropWidth = crop.to.x - crop.from.x;
									let cropHeight = crop.to.y - crop.from.y;

									if (cropWidth > cropHeight) {
										newHeight = Number.MAX_SAFE_INTEGER;
									} else {
										newWidth = Number.MAX_SAFE_INTEGER;
										angleAuto = Math.PI / 2;
									}

									let size = utils.scaleSize(cropWidth, cropHeight, newWidth, newHeight);

									renderer.save();

									let midpoint = {
										x: (joint.position.x + joint.parent.position.x) / 2,
										y: (joint.position.y + joint.parent.position.y) / 2
									};

									renderer.context.translate(midpoint.x, midpoint.y);
									renderer.context.rotate(joint.angle + angleAuto);

									if (joint.skin.offset) {
										let xOffset = joint.skin.offset.x;
										let yOffset = joint.skin.offset.y;
										let scaleXOffset = joint.skin.offset.scaleX;
										let scaleYOffset = joint.skin.offset.scaleY;
										let angleOffset = joint.skin.offset.angle;

										renderer.context.rotate(angleOffset);
										renderer.context.translate(xOffset, yOffset);
										renderer.context.scale(scaleXOffset, scaleYOffset);
									}

									renderer.context.drawImage(joint.skin.image, crop.from.x, crop.from.y, cropWidth, cropHeight, -size.width / 2, -size.height / 2, size.width, size.height);
									renderer.restore();
								}

								if (timeline.graph.state.isPlaying) {
									jointColor = config.render.joint.color.default;
								}
							}
						}
					}
				}

				renderer.circle(joint.position.x, joint.position.y, config.render.joint.radius, {
					fill: isPrev ? translucent : jointColor
				});
			}
		}

		//Render previous keyframe
		if (timeline.graph) {
			let previousFrame = this.keyframes[timeline.graph.state.previousFrame];
			let currentFrame = this.keyframes[timeline.graph.state.currentFrame];
			let nextFrame = this.keyframes[timeline.graph.state.nextFrame];

			renderer.save();
			renderer.context.globalCompositeOperation = "overlay";
			if (currentFrame && !timeline.graph.state.isPlaying) {
				_render(currentFrame.joints, true);
			}

			if (previousFrame && !timeline.graph.state.isPlaying) {
				_render(previousFrame.joints, true);
			}

			if (nextFrame && !timeline.graph.state.isPlaying) {
				_render(nextFrame.joints, true);
			}
			renderer.restore();
		}

		//Render current frame
		let sortedJoints = this.joints.slice(0).sort((a, b) => a.zIndex - b.zIndex);
		_render(sortedJoints);
	}
}

const rigModel = new RigModel();

events.once("loadedApps", vue => {
	timeline = vue.timeline;

	rigModel.setKeyframe(timeline.graph.state.currentMark, {
		position: {
			x: timeline.graph.hatchMark.spacing / 2,
			y: 0
		},
		locked: true,
		ignoreHistory: true
	});
});

module.exports = rigModel;