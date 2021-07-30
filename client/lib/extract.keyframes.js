const events = require("../../lib/events.js");
const utils = require("../../lib/utils.js");
const HAVE_ENOUGH_DATA = 4;
let pct;

function extractFrames(url, options) {
	options = options || {};
	if (options.drop) return;

	const canvas = document.createElement("canvas");
	const context = canvas.getContext("2d");
	const video = document.createElement("video");
	video.crossOrigin = "anonymous"
	video.controls = true;
	video.muted = true;
	video.src = url;
	video.load();

	let frames = [];
	let start = options.start || 1;
	let frameRate = options.frameRate || 24;
	let quality = options.quality || 0.1;
	let width = options.width || 640;
	let height = options.height || 480;

	video.addEventListener("loadedmetadata", () => {
		let end = options.end || video.duration;
		let frameCount = options.frameCount || (end - start) * frameRate;

		let size = utils.scaleSize(video.videoWidth, video.videoHeight, width, height);
		canvas.width = size.width;
		canvas.height = size.height;

		video.currentTime = start;

		video.addEventListener("seeked", () => {
			if (options.drop) {
				events.emit("extractKeyframeDone", frames);
			} else {
				if (frames.length < frameCount) {
					events.emit("extractKeyframeProgress", frameCount);
					video.currentTime += 1 / frameRate;
				} else {
					events.emit("extractKeyframeDone", frames);
				}
			}
		});
	});

	let extract = events.on("extractKeyframeProgress", frameCount => {
		context.drawImage(video, 0, 0, canvas.width, canvas.height);
		let dataURL = canvas.toDataURL("image/jpeg", quality);
		let img = new Image();
		img.crossOrigin = "anonymous";
		img.src = dataURL;

		let data = {
			image: img,
			time: video.currentTime
		};

		frames.push(data);

		context.clearRect(0, 0, canvas.width, canvas.height);

		if (typeof options.progress == "function") {
			pct = (frames.length / frameCount) * 100;
			options.progress(data.image, pct);
		}
	});

	events.once("extractKeyframeDone", frames => {
		frames.sort((a, b) => a.time - b.time);
		for (var i = 0; i < frames.length; i++) {
			frames[i] = frames[i].image;
		}

		options.done(frames);
		events.removeListener(extract);
		canvas.remove();
	});
};

module.exports = extractFrames;