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
		},
		keyframe: {
			size: 10,
			color: {
				default: "#d9dee4",
				hovered: "#b1b6bd",
				active: "#5984d2"
			},
			y: 20
		}
	},
	world: {
		background: "#1a1c1f",
		zoom: innerWidth,
		minZoom: 100,
		maxZoom: 3000
	},
	minFPS: 1,
	maxFPS: 60,
	linear: false
};