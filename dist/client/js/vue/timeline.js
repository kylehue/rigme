const timelineApp = new Vue({
	el: "#timelineApp",
	data: {
		hidden: false
	},
	methods: {

	}
});

let timelineGraph = document.getElementById("timelineGraph");
let timelineGraphContext = timelineGraph.getContext("2d");
let timelineGraphParent = timelineGraph.parentNode;
timelineGraph.width = timelineGraphParent.offsetWidth;
timelineGraph.height = 20;

function clearTimelineGraph() {
	let ctx = timelineGraphContext;
	ctx.clearRect(0, 0, timelineGraph.width, timelineGraph.height);
}

function drawTimelineGraph() {
	clearTimelineGraph();
	let ctx = timelineGraphContext;
	let lineCount = 60;
	let spacing = timelineGraph.width / lineCount;
	for(var i = 0; i < lineCount; i++){
		let x = spacing * i + spacing / 2;
		ctx.beginPath();
		ctx.moveTo(x, timelineGraph.height);
		ctx.lineTo(x, 0);
		ctx.strokeStyle = "black";
		ctx.stroke();
	}
}

drawTimelineGraph();

addEventListener("resize", function() {
	timelineGraph.width = timelineGraphParent.offsetWidth;
	timelineGraph.height = 20;
	drawTimelineGraph();
});

module.exports = timelineApp;