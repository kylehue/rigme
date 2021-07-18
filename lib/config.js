/*Possible export formats
*GIF
*Spritesheet
*Frames
*/

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
		keyframe: {
			size: 6,
			color: {
				default: "#ff4258",
				hovered: "#ee2b47",
				active: "#e31d42"
			}
		},
		timeline: {
			scrollbar: {
				color: {
					default: "rgba(240, 230, 250, 0.045)",
					hovered: "rgba(240, 230, 250, 0.06)",
					active: "rgba(240, 230, 250, 0.075)"
				}
			}
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
			max: 600
		},
		speed: {
			min: 1,
			max: 60
		},
		autoAddKeyframe: true
	},
	riggingMode: "forwardKinematics",
	autosave: {
		label: "rigme.model",
		enabled: true,
		threshold: 1
	}
};