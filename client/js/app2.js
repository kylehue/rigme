//
const events = require("../../../lib/events.js");
const vector = require("../../../lib/vector.js");
const renderer = require("../lib/renderer.js");
const mouse = require("../../../lib/mouse.js");

//
const Model = require("./classes/model.js");
const rig = new Model();

//Event listeners
events.on("addJoint", options => {
	rig.addJoint(options);
});

events.on("redrawViewport", () => {
	renderer.redraw()
});

events.on("fixViewportSize", () => {
	let toolApp = $("#toolApp");
	let canvasContainer = $(".canvas-container");
	let nav = $("#navigation");
	let timeline = $("#timelineApp");
	let width = canvasContainer.width() - toolApp.width() - 1;
	let height = innerHeight - nav.height() - timeline.height();
	renderer.setSize(width, height);
});

//Window Events
mouse.on("click", () => {
	events.emit("addJoint", {
		position: vector(mouse.x, mouse.y)
	});

	events.emit("redrawViewport");
});

console.log($(".canvas-container").width())

//Render
events.emit("fixViewportSize");

renderer.draw(() => {
	//Draw each joint
	for(var i = 0; i < rig.joints.length; i++){
		let joint = rig.joints[i];
		renderer.circle(joint.position.x, joint.position.y, 10, {
			fill: "red"
		});
	}
});