var events = require("../../lib/events.js");

var utils = require("../../lib/utils.js");

var HAVE_ENOUGH_DATA = 4;
var pct;

function extractFrames(url, options) {
  options = options || {};
  if (options.drop) return;
  var canvas = document.createElement("canvas");
  var context = canvas.getContext("2d");
  var video = document.createElement("video");
  video.crossOrigin = "anonymous";
  video.controls = true;
  video.muted = true;
  video.src = url;
  video.load();
  var frames = [];
  var start = options.start || 1;
  var frameRate = options.frameRate || 24;
  var quality = options.quality || 0.1;
  var width = options.width || 640;
  var height = options.height || 480;
  video.addEventListener("loadedmetadata", function () {
    var end = options.end || video.duration;
    var frameCount = options.frameCount || (end - start) * frameRate;
    var size = utils.scaleSize(video.videoWidth, video.videoHeight, width, height);
    canvas.width = size.width;
    canvas.height = size.height;
    video.currentTime = start;
    video.addEventListener("seeked", function () {
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
  var extract = events.on("extractKeyframeProgress", function (frameCount) {
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    var dataURL = canvas.toDataURL("image/jpeg", quality);
    var img = new Image();
    img.crossOrigin = "anonymous";
    img.src = dataURL;
    var data = {
      image: img,
      time: video.currentTime
    };
    frames.push(data);
    context.clearRect(0, 0, canvas.width, canvas.height);

    if (typeof options.progress == "function") {
      pct = frames.length / frameCount * 100;
      options.progress(data.image, pct);
    }
  });
  events.once("extractKeyframeDone", function (frames) {
    frames.sort(function (a, b) {
      return a.time - b.time;
    });

    for (var i = 0; i < frames.length; i++) {
      frames[i] = frames[i].image;
    }

    options.done(frames);
    events.removeListener(extract);
    canvas.remove();
  });
}

;
module.exports = extractFrames;