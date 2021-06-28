const renderer = require("../lib/renderer.js");
const vector = require("../../../lib/vector.js");
const shape = require("../../../lib/shape.js");
const mouse = require("../../../lib/mouse.js");
const key = require("../../../lib/key.js");
const utils = require("../../../lib/utils.js");
const client = require("./client.js");
const config = require("../../../lib/config.js");
const vue = require("./vue/vue.js");
const model = require("../lib/rig.model.js");

let rigModel = model.create();
let cameraDistance = config.world.zoom;
let cameraMovement = vector();
let mouseLast = vector();
let worldMouse = vector();

let actions = {
	add: "add",
	select: "select",
	move: "move",
	remove: "remove",
	pan: "pan"
};

let shortcuts = {
	KeyQ: actions.add,
	KeyW: actions.select,
	KeyE: actions.move,
	KeyR: actions.remove,
	KeyA: actions.pan
};

let action = actions.add;

key.on("keydown", function(event) {
	action = actions[shortcuts[event.code]];
	rigModel.action = action;
	console.log(`Current action: ${action}`);
});

mouse.on("click", function() {
	if (action == actions.add) {
		let worldMouse = renderer.camera.screenToWorld(mouse.x, mouse.y);
		rigModel.addJoint(worldMouse.x, worldMouse.y);
	}
});

mouse.on("mousewheel", function () {
	if (mouse.scrollTop) {
		cameraDistance -= 200;
	}else{
		cameraDistance += 200;
	}

	cameraDistance = cameraDistance < 100 ? 100 : cameraDistance;
	cameraDistance = cameraDistance > 3000 ? 3000 : cameraDistance;
});

renderer.fullscreen();
renderer.camera.setZoomSpeed(0.2);
renderer.camera.setMoveSpeed(0.4);
renderer.render(function() {
	worldMouse.set(renderer.camera.screenToWorld(mouse.x, mouse.y));

	renderer.camera.begin(function() {
		renderer.camera.moveTo(cameraMovement.x, cameraMovement.y);
		renderer.camera.zoomTo(cameraDistance);

		if (action === actions.add) {
			let currentPart = rigModel.selected;
			if (currentPart) {
				renderer.line(worldMouse.x, worldMouse.y, currentPart.position.x, currentPart.position.y, {
					lineWidth: config.render.segment.width,
					lineCap: "round",
					stroke: "rgba(255, 255, 255, 0.2)"
				});
			}
		}

		rigModel.render(renderer);
	});

	if (action === actions.pan) {
		if (mouse.dragged) {
			cameraMovement.set({
				x: mouseLast.x - worldMouse.x + renderer.camera.movement.x,
				y: mouseLast.y - worldMouse.y + renderer.camera.movement.y
			});

			mouse.dragged = false;
		}else {
			mouseLast.set(worldMouse);
		}
	}

	if (action === actions.select) {
		if (mouse.pressed) {
			rigModel.selectJoint(worldMouse.x, worldMouse.y);
		}
	}

	if (action === actions.move) {
		if (mouse.pressed) {
			rigModel.moveJoint(worldMouse.x, worldMouse.y);
		}
	}

	if (action === actions.remove) {
		if (mouse.pressed) {
			rigModel.selectJoint(worldMouse.x, worldMouse.y);
			rigModel.removeJoint(worldMouse.x, worldMouse.y);
		}
	}
});

key.on("keydown", function() {
	if (key.code === 16) {
		console.log(rigModel);
		console.log(config);
	}
})


console.log(rigModel);