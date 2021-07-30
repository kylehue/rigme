"use strict";

var events = require("../../lib/events.js"),
    utils = require("../../lib/utils.js"),
    HAVE_ENOUGH_DATA = 4;

var pct;

function extractFrames(e, c) {
  if (!(c = c || {}).drop) {
    var d = document.createElement("canvas"),
        g = d.getContext("2d"),
        l = document.createElement("video");
    l.crossOrigin = "anonymous", l.controls = !0, l.muted = !0, l.src = e, l.load();
    var i = [],
        r = c.start || 1,
        n = c.frameRate || 24,
        a = c.quality || .1,
        s = c.width || 640,
        o = c.height || 480;
    l.addEventListener("loadedmetadata", function () {
      var e = c.end || l.duration;
      var t = c.frameCount || (e - r) * n;
      e = utils.scaleSize(l.videoWidth, l.videoHeight, s, o);
      d.width = e.width, d.height = e.height, l.currentTime = r, l.addEventListener("seeked", function () {
        !c.drop && i.length < t ? (events.emit("extractKeyframeProgress", t), l.currentTime += 1 / n) : events.emit("extractKeyframeDone", i);
      });
    });
    var m = events.on("extractKeyframeProgress", function (e) {
      g.drawImage(l, 0, 0, d.width, d.height);
      var t = d.toDataURL("image/jpeg", a);
      var r = new Image();
      r.crossOrigin = "anonymous", r.src = t;
      t = {
        image: r,
        time: l.currentTime
      };
      i.push(t), g.clearRect(0, 0, d.width, d.height), "function" == typeof c.progress && (pct = i.length / e * 100, c.progress(t.image, pct));
    });
    events.once("extractKeyframeDone", function (e) {
      e.sort(function (e, t) {
        return e.time - t.time;
      });

      for (var t = 0; t < e.length; t++) {
        e[t] = e[t].image;
      }

      c.done(e), events.removeListener(m), d.remove();
    });
  }
}

module.exports = extractFrames;