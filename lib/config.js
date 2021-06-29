module.exports = {
	accent: "#5984d2",
	render: {
		joint: {
			radius: 5,
			color: {
				selected: "#ff565a",
				moving: "#b5babe",
				default: "#dce0e4"
			}
		},
		segment: {
			width: 3,
			color: "#c7cbce"
		}
	},
	world: {
		zoom: innerWidth,
		minZoom: 100,
		maxZoom: 3000
	},
	minFPS: 1,
	maxFPS: 60
};