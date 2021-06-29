const mouse = require("../../../../lib/mouse.js");
const config = require("../../../../lib/config.js");

const timelineApp = new Vue({
	el: "#timelineApp",
	data: {
		hidden: false,
		animationSpeed: 30
	},
	methods: {
		validateFormat: function(e) {
			drawTimelineGraph();
			if (e.keyCode != 8 & e.keyCode != 46) {
				let nums = new RegExp("[0-9]");
				if (!nums.test(e.key)) {
					e.preventDefault();
					return;
				}
			}

			this.animationSpeed = parseInt(document.getElementById("animationSpeed").value);
		},
		validateAmount: function(e) {
			timelineApp.validateMin(e);
			timelineApp.validateMax(e);

			drawTimelineGraph();
		},
		validateMax: function(e) {
			let value = e.target.value;
			if (parseInt(value) > config.maxFPS) {
				e.target.value = config.maxFPS.toString();
			}
			drawTimelineGraph();
		},
		validateMin: function(e) {
			let value = e.target.value;
			if (parseInt(value) < config.minFPS) {
				e.target.value = config.minFPS.toString();
			}
			drawTimelineGraph();
		},
		toggleAmount: function(e) {
			let isDown = e.wheelDeltaY < 0;
			let value = parseInt(e.target.value);
			if (isDown) {
				value--;
			} else {
				value++;
			}

			e.target.value = value.toString();
			timelineApp.validateAmount(e);
			this.animationSpeed = parseInt(document.getElementById("animationSpeed").value);
			drawTimelineGraph();
		},
		setFocus: function (bool) {
			this.focused = bool;
		}
	}
});

let timelineGraph = document.getElementById("timelineGraph");
let timelineGraphContext = timelineGraph.getContext("2d");
let timelineGraphParent = timelineGraph.parentNode;
timelineGraph.width = timelineGraphParent.offsetWidth;
timelineGraph.height = timelineGraphParent.offsetHeight;

function clearTimelineGraph() {
	let ctx = timelineGraphContext;
	ctx.clearRect(0, 0, timelineGraph.width, timelineGraph.height);
}

function createLine(x1, y1, x2, y2, ctx, color) {
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.strokeStyle = color;
	ctx.stroke();
}

function getOffsetLeft(elem) {
	/*https://stackoverflow.com/a/5598797*/
	var offsetLeft = 0;
	do {
		if (!isNaN(elem.offsetLeft)) {
			offsetLeft += elem.offsetLeft;
		}
	} while (elem = elem.offsetParent);
	return offsetLeft;
}

function getOffsetTop(elem) {
	/*https://stackoverflow.com/a/5598797*/
	var offsetTop = 0;
	do {
		if (!isNaN(elem.offsetTop)) {
			offsetTop += elem.offsetTop;
		}
	} while (elem = elem.offsetParent);
	return offsetTop;
}

let isPlaying = false;
let cfmPosition = 0;
let _graph = {};
let buttons = {
	previous: document.getElementById("lastFrame"),
	play: document.getElementById("playStop"),
	next: document.getElementById("nextFrame"),
	add: document.getElementById("addKeyframe"),
	delete: document.getElementById("deleteKeyframe")
};

buttons.previous.addEventListener("click", function () {
	cfmPosition = cfmPosition > 0 ? cfmPosition - 1 : cfmPosition;
	drawTimelineGraph();
});

buttons.next.addEventListener("click", function () {
	cfmPosition = cfmPosition < _graph.hatchMarkCount - 1 ? cfmPosition + 1 : cfmPosition;
	drawTimelineGraph();
});

function playTimeline() {
	cfmPosition = cfmPosition < _graph.hatchMarkCount - 1 ? cfmPosition + 1 : 0;
	drawTimelineGraph();
}

var timelineInterval = setInterval(playTimeline, 1000 / timelineApp.animationSpeed);
clearInterval(timelineInterval);

buttons.play.addEventListener("click", function () {
	if (isPlaying) {
		clearInterval(timelineInterval);
		isPlaying = false;
		buttons.play.firstChild.src = "assets/svg/play.svg";
	}else {
		timelineInterval = setInterval(playTimeline, 1000 / timelineApp.animationSpeed);
		isPlaying = true;
		buttons.play.firstChild.src = "assets/svg/round-square.svg";
	}
	drawTimelineGraph();
});



function drawTimelineGraph() {
	clearTimelineGraph();
	let ctx = timelineGraphContext;

	/*Hatch marks*/
	let hatchMarkCount = parseInt(document.getElementById("frameCount").value);
	let hatchMarkSpacing = timelineGraph.width / hatchMarkCount;
	let hatchMarkHeight = 7;
	_graph.hatchMarkCount = hatchMarkCount;
	_graph.hatchMarkSpacing = hatchMarkSpacing;
	_graph.hatchMarkHeight = hatchMarkHeight;
	for (var i = 0; i < hatchMarkCount; i++) {
		let x = hatchMarkSpacing * i + hatchMarkSpacing / 2;
		createLine(x, 0, x, hatchMarkHeight, ctx, "rgba(255, 255, 255, 0.2)");
	}

	/*Current frame marker*/
	let cfmX = hatchMarkSpacing * cfmPosition + hatchMarkSpacing / 2;
	_graph.cfmX = cfmX;
	createLine(cfmX, 0, cfmX, timelineGraph.height, ctx, config.accent);

	/*Current frame marker controller*/
	let cfmControllerWidth = 10;
	let cfmControllerHeight = 20;
	_graph.cfmControllerWidth = cfmControllerWidth;
	_graph.cfmControllerHeight = cfmControllerHeight;
	ctx.beginPath();
	ctx.moveTo(cfmX, timelineGraph.height - cfmControllerHeight);
	ctx.lineTo(cfmX + cfmControllerWidth / 2, timelineGraph.height - cfmControllerHeight + cfmControllerHeight / 4);
	ctx.lineTo(cfmX + cfmControllerWidth / 2, timelineGraph.height);
	ctx.lineTo(cfmX - cfmControllerWidth / 2, timelineGraph.height);
	ctx.lineTo(cfmX - cfmControllerWidth / 2, timelineGraph.height - cfmControllerHeight + cfmControllerHeight / 4);
	ctx.closePath();
	ctx.fillStyle = config.accent;
	ctx.fill();
}

drawTimelineGraph();

function moveCFM() {
	/* body... */
}

mouse.on("click", function(event) {
	let mouseX = event.clientX - getOffsetLeft(timelineGraph);
	let mouseY = event.clientY - getOffsetTop(timelineGraph);
	if (mouseX >= 0 && mouseX <= timelineGraph.width && mouseY >= 0 && mouseY <= timelineGraph.height) {
		cfmPosition = parseInt(mouseX / _graph.hatchMarkSpacing);
		drawTimelineGraph();
	}
});

mouse.on("mousemove", function(event) {
	let mouseX = event.clientX - getOffsetLeft(timelineGraph);
	let mouseY = event.clientY - getOffsetTop(timelineGraph);
	if (mouseX >= 0 && mouseX <= timelineGraph.width && mouseY >= 0 && mouseY <= timelineGraph.height) {
		if (mouse.pressed) {
			cfmPosition = parseInt(mouseX / _graph.hatchMarkSpacing);
			drawTimelineGraph();
		}
	}
});

addEventListener("resize", function() {
	timelineGraph.width = timelineGraphParent.offsetWidth;
	timelineGraph.height = timelineGraphParent.offsetHeight;
	drawTimelineGraph();
});

module.exports = timelineApp;