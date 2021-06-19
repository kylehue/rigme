const renderer = require("../lib/renderer.js");
const vector = require("../../../lib/vector.js");
const shape = require("../../../lib/shape.js");
const mouse = require("../../../lib/mouse.js");
const key = require("../../../lib/key.js");
const utils = require("../../../lib/utils.js");
const client = require("./client.js");
const model = require("../lib/rig.model.js");
let rigModel = model.create();

let actions = {
	add: "add",
	select: "select",
	move: "move",
	remove: "remove"
};

let shortcuts = {
	KeyQ: actions.add,
	KeyW: actions.select,
	KeyE: actions.move,
	KeyR: actions.remove
};

let action = actions.add;

key.on("keydown", function(event) {
	action = actions[shortcuts[event.code]];
	console.log(`Current action: ${action}`);
});

mouse.on("click", function () {
	if (action == actions.add) {
		rigModel.add(mouse.x, mouse.y);
	}
});

renderer.fullscreen();
renderer.render(function() {
	rigModel.render(renderer);
});


console.log(rigModel);