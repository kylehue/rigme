let timelineHeight = 17;

module.exports = {
	accent: "#5984d2",
	render: {
		joint: {
			radius: 3,
			color: {
				selected: "#ff565a",
				moving: "#b5babe",
				default: "#dce0e4"
			}
		},
		segment: {
			width: 1.5,
			color: "#c7cbce"
		},
		timeline: {
			height: timelineHeight
		},
		keyframe: {
			size: 6,
			color: {
				default: "#ff4258",
				hovered: "#ee2b47",
				active: "#e31d42"
			},
			y: timelineHeight + 13
		}
	},
	world: {
		background: "#1a1c1f",
		zoom: innerWidth,
		minZoom: 100,
		maxZoom: 3000
	},
	animation: {
		frameCount: {
			min: 1,
			max: 300
		},
		speed: {
			min: 1,
			max: 60
		},
		linear: true
	},
	autosave: {
		label: "rigme.model",
		enabled: true,
		threshold: 1
	}
};