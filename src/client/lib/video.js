const HAVE_ENOUGH_DATA = 4;

function map(n, start1, stop1, start2, stop2) {
	return (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
}

function getFrame(video, time, f) {
	let src = video.src;
	video = document.createElement("video");
	video.crossOrigin = "anonymous"
	video.controls = true;
	video.muted = true;
	video.src = src;

	video.addEventListener("loadeddata", () => {
		const canvas = document.createElement("canvas");
		const context = canvas.getContext("2d");

		canvas.width = video.videoWidth;
		canvas.height = video.videoHeight;

		video.currentTime = time;
		let checkState = setInterval(() => {
			if (video.readyState == HAVE_ENOUGH_DATA) {
				video.pause();
				context.drawImage(video, 0, 0);
				let dataURL = canvas.toDataURL("image/jpeg", 1.0);
				let img = new Image();
				img.crossOrigin = "anonymous";
				img.src = dataURL;

				if (typeof f == "function") f({
					image: img,
					time: time
				});

				clearInterval(checkState);
				checkState = null;
				video.remove();
				canvas.remove();
			}
		}, 100);
	});
}

function extractFrames(url, options) {
	options = options || {};
	const video = document.createElement("video");
	video.crossOrigin = "anonymous"
	video.controls = true;
	video.muted = true;
	video.src = url;

	video.addEventListener("loadeddata", () => {
		const frames = [];
		let start = options.start || 1;
		let end = options.end || video.duration;
		let frameRate = options.frameRate || 30;
		let frameCount = options.frameCount || end * frameRate;
		let pct;

		for (var i = 0; i < frameCount; i++) {
			let time = map(i, 0, frameRate, start, end);
			getFrame(video, time, data => {
				frames.push(data);
				pct = map(frames.length, 0, frameCount, 1, 100);
				if (typeof options.progress == "function") options.progress(data.image, pct);
			});
		}

		let checkState = setInterval(() => {
			if (frames.length >= frameCount) {
				frames.sort((a, b) => a.time - b.time);
				for (var i = 0; i < frames.length; i++) {
					frames[i] = frames[i].image;
				}
				if (typeof options.done == "function") options.done(frames);
				clearInterval(checkState);
				checkState = null;
			}
		}, 100);
	});
};

module.exports = extractFrames;