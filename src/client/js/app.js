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
	pan: "pan",
	add: "add",
	select: "select",
	move: "move",
	remove: "remove"
};

let shortcuts = {
	KeyQ: actions.pan,
	KeyW: actions.add,
	KeyE: actions.select,
	KeyR: actions.move,
	KeyT: actions.remove
};

let actionIcons = {};

actionIcons.add = new Image();
actionIcons.add.src = "assets/svg/joint-plus.svg";
actionIcons.select = new Image();
actionIcons.select.src = "assets/svg/joint-click.svg";
actionIcons.move = new Image();
actionIcons.move.src = "assets/svg/joint-arrow.svg";
actionIcons.remove = new Image();
actionIcons.remove.src = "assets/svg/joint-trash.svg";
actionIcons.pan = new Image();
actionIcons.pan.src = "assets/svg/quad-arrow.svg";

let action = actions.pan;

let buttons = {
	add: document.getElementById("addJoint"),
	select: document.getElementById("selectJoint"),
	move: document.getElementById("moveJoint"),
	remove: document.getElementById("removeJoint"),
	pan: document.getElementById("panCamera")
};

let _buttons = Object.keys(buttons);
let __buttons = Object.values(buttons);

function removeActives() {
	for (let btn of _buttons) {
		buttons[btn].classList.remove("active-tool");
	}
}

function mouseInside(el) {
	return mouse.x >= el.offsetLeft && mouse.x <= el.offsetLeft + el.offsetWidth && mouse.y >= el.offsetTop && mouse.y <= el.offsetTop + el.offsetHeight;
}

for (let btn of _buttons) {
	buttons[btn].addEventListener("click", function() {
		action = actions[btn];
		rigModel.action = action;

		removeActives();
		buttons[btn].classList.add("active-tool");
	});
}

key.on("keydown", function(event) {
	let pickedAction = actions[shortcuts[event.code]];
	if (pickedAction) {
		action = pickedAction;
		rigModel.action = action;

		if (buttons[action]) {
			removeActives();
			buttons[action].classList.add("active-tool");
		}
	}
});

renderer.canvas.addEventListener("click", function() {
	if (action == actions.add) {
		let worldMouse = renderer.camera.screenToWorld(mouse.x, mouse.y);
		rigModel.addJoint(worldMouse.x, worldMouse.y);
	}
});

renderer.canvas.addEventListener("mousewheel", function() {
	if (mouse.scrollTop) {
		cameraDistance -= 200;
	} else {
		cameraDistance += 200;
	}

	cameraDistance = cameraDistance < config.world.minZoom ? config.world.minZoom : cameraDistance;
	cameraDistance = cameraDistance > config.world.maxZoom ? config.world.maxZoom : cameraDistance;
});

renderer.fullscreen();
renderer.camera.setZoomSpeed(0.2);
renderer.camera.setMoveSpeed(0.4);
renderer.render(function() {
	let onWorld = !mouseInside(vue.toolApp) && !mouseInside(vue.timelineApp.$el);
	worldMouse.set(renderer.camera.screenToWorld(mouse.x, mouse.y));

	renderer.camera.begin(function() {
		renderer.camera.moveTo(cameraMovement.x, cameraMovement.y);
		renderer.camera.zoomTo(cameraDistance);

		if (onWorld) {
			if (action === actions.add) {
				let color = "#323439";
				let currentPart = rigModel.activeJoint;
				if (currentPart) {
					renderer.line(worldMouse.x, worldMouse.y, currentPart.position.x, currentPart.position.y, {
						lineWidth: config.render.segment.width,
						lineCap: "round",
						stroke: color
					});
				}

				renderer.circle(worldMouse.x, worldMouse.y, config.render.joint.radius, {
					fill: color
				});
			}

			renderer.context.drawImage(actionIcons[action], worldMouse.x, worldMouse.y, 14, 14);
		}

		rigModel.render(renderer);
	});

	if (onWorld) {
		if (action === actions.pan) {
			if (mouse.dragged) {
				cameraMovement.set({
					x: mouseLast.x - worldMouse.x + renderer.camera.movement.x,
					y: mouseLast.y - worldMouse.y + renderer.camera.movement.y
				});

				mouse.dragged = false;
			} else {
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
	}
});

key.on("keydown", function() {
	if (key.code === 16) {
		console.log(rigModel);
		console.log(config);
	}
})


console.log(rigModel);