"use strict";

var _ids = [];
var _idLength = 6;
module.exports = {
  loadImage: function loadImage(url) {
    var _this = this;

    var img = new Image();
    img.crossOrigin = "anonymous";
    img.src = url;
    return new Promise(function (resolve, reject) {
      img.onload = function () {
        var _canvas = document.createElement("canvas");

        var _context = _canvas.getContext("2d");

        var size = _this.scaleSize(img.width, img.height, 360, 240);

        _canvas.width = size.width;
        _canvas.height = size.height;

        _context.drawImage(img, 0, 0, _canvas.width, _canvas.height);

        var dataURL = _canvas.toDataURL("image/png");

        resolve({
          url: dataURL,
          width: _canvas.width,
          height: _canvas.height,
          image: _canvas
        });
      };
    });
  },
  uid: function uid() {
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var id = "";

    function generateId() {
      id = "";

      for (var i = 0; i < _idLength; i++) {
        id += chars[Math.floor(Math.random() * chars.length)];
      }
    }

    generateId();
    var start = performance.now();

    while (_ids.includes(id)) {
      if (performance.now() - start > 20) {
        _idLength++;
      }

      generateId();
    }

    _ids.push(id);

    return id;
  },
  lerp: function lerp(start, stop, weight) {
    return weight * (stop - start) + start;
  },
  dist: function dist(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
  },
  map: function map(n, start1, stop1, start2, stop2) {
    return (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
  },
  random: function random() {
    if (arguments.length == 2 && typeof arguments[0] == "number" && typeof arguments[1] == "number") {
      return Math.random() * (arguments[1] - arguments[0]) + arguments[0];
    } else if (arguments.length == 1 && typeof arguments[0] == "number") {
      return Math.random() * arguments[0];
    } else if (Array.isArray(arguments[0])) {
      return arguments[0][Math.floor(Math.random() * arguments[0].length)];
    } else if (arguments.length > 2) {
      var args = Array.prototype.slice.call(arguments);
      return args[Math.floor(Math.random() * args.length)];
    }
  },
  clamp: function clamp(n, min, max) {
    var val = n < min ? min : n;
    val = val > max ? max : val;
    return val;
  },
  getRandomColor: function getRandomColor() {
    return this.random(["#ff3b3b", "#ff763b", "#ffdb3b", "#c4ff3b", "#76ff3b", "#3bff8d", "#3bc1ff", "#3b48ff", "#963bff", "#de3bff", "#ff3b96"]);
  },
  loadJSONData: function loadJSONData(name, f) {
    var storageData = localStorage.getItem(name);

    if (storageData) {
      var data;
      var error = false;

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
  degrees: function degrees(radians) {
    return radians * (180 / Math.PI);
  },
  radians: function radians(degrees) {
    return degrees * (Math.PI / 180);
  },
  scaleSize: function scaleSize(width, height, scaleWidth, scaleHeight) {
    var ratio = Math.min(scaleWidth / width, scaleHeight / height);
    return {
      width: width * ratio,
      height: height * ratio
    };
  }
};