const _canvas = document.createElement("canvas");
const _context = _canvas.getContext("2d");

const _ids = [];
let _lengthAuto;

module.exports = {
	imageToBase64: function(url) {
		let img = new Image();
		img.crossOrigin = "anonymous";
		img.src = url;

		return new Promise((resolve, reject) => {
			img.onload = () => {
				_canvas.width = img.width;
				_canvas.height = img.height;
				_context.drawImage(img, 0, 0);
				let dataURL = _canvas.toDataURL("image/png");
				resolve(dataURL);
			}
		});
	},
	uid: function(length) {
		length = length || 16;
		let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		let id = "";

		function generateId() {
			id = "";
			let len = _lengthAuto || length;
			for (var i = 0; i < len; i++) {
				id += chars[Math.floor(Math.random() * chars.length)];
			}
		}

		generateId();

		let start = performance.now();
		while (_ids.includes(id)) {
			if (performance.now() - start > 20) {
				_lengthAuto = !_lengthAuto ? length + 1 : _lengthAuto + 1;
			}
			generateId();
		}

		_ids.push(id);
		return id;
	},
	lerp: function(start, stop, weight) {
		return weight * (stop - start) + start;
	},
	dist: function(x1, y1, x2, y2) {
		return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
	},
	map: function(n, start1, stop1, start2, stop2) {
		return (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
	},
	random: function() {
		if (arguments.length == 2 && typeof arguments[0] == "number" && typeof arguments[1] == "number") {
			return Math.random() * (arguments[1] - arguments[0]) + arguments[0];
		} else if (arguments.length == 1 && typeof arguments[0] == "number") {
			return Math.random() * arguments[0];
		} else if (Array.isArray(arguments[0])) {
			return arguments[0][Math.floor(Math.random() * arguments[0].length)];
		} else if (arguments.length > 2) {
			let args = [...arguments];
			return args[Math.floor(Math.random() * args.length)];
		}
	},
	clamp: function(n, min, max) {
		let val = n < min ? min : n;
		val = val > max ? max : val;
		return val;
	},
	getRandomColor: function() {
		return this.random([
			"#ff3b3b",
			"#ff763b",
			"#ffdb3b",
			"#c4ff3b",
			"#76ff3b",
			"#3bff8d",
			"#3bc1ff",
			"#3b48ff",
			"#963bff",
			"#de3bff",
			"#ff3b96"
		]);
	},
	loadJSONData: function(name, f) {
		let storageData = localStorage.getItem(name);

		if (storageData) {
			let data;
			let error = false;
			try {
				data = JSON.parse(storageData);
			} catch (e) {
				error = true;
				console.warn("Couldn't load autosaved data.");
			}

			if (data && !error) {
				if (typeof f == "function") f(data);
			}
		}
	},
	degrees: function(radians) {
		return radians * (180 / Math.PI);
	},
	radians: function(degrees) {
		return degrees * (Math.PI / 180);
	},
	scaleSize: function(width, height, scaleWidth, scaleHeight) {
		const ratio = Math.min(scaleWidth / width, scaleHeight / height);
		return {
			width: width * ratio,
			height: height * ratio
		};
	}
};