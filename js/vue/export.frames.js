"use strict";

var events = require("../../../lib/events.js"),
    utils = require("../../../lib/utils.js"),
    dom = require("../../../lib/dom.js"),
    timeline = require("./timeline.js"),
    randomTitle = require("../random.title.js"),
    framesExportApp = new Vue({
  el: "#framesExportApp",
  data: {
    hidden: !0
  },
  methods: {
    show: function show() {
      var _this = this;

      this.hidden = !1, this.$nextTick(function () {
        _this.$el.style.opacity = "1", dom.query("#framesExportApp .drag").draggable({
          restrict: !0,
          root: _this.$el
        }), dom.query("#framesExportApp .custom-checkbox", !0).on("click", function (e) {
          var t = dom.query(e.target).query(".checkbox");
          t.toggleClass("checked");
        }), dom.query("#framesExportName").value(randomTitle.generate());
        var e = timeline.graph.playbackHandle.start.mark + 1,
            t = timeline.graph.playbackHandle.end.mark + 1,
            a = rigModel.bounds;
        var r = a.max.x - a.min.x,
            o = a.max.y - a.min.y;
        dom.query("#framesExportStart").value(e), dom.query("#framesExportEnd").value(t), dom.query("#framesExportWidth").value(r.toFixed(2)), dom.query("#framesExportHeight").value(o.toFixed(2)), setTimeout(function () {
          var e = document.getElementById("framesExportName");
          e.focus();
        }, 100), events.emit("renderSleep");
      });
    },
    hide: function hide() {
      this.hidden = !0, events.emit("renderFocus");
    },
    validateFormat: function validateFormat(e) {
      e.target.value = e.target.value.replace(/[^0-9.-]/g, "").replace(/(\..*)\./g, "$1").replace(/^0+/g, "").replace(/(?<!^)-/g, ""), this.validateMax(e);
    },
    validateAmount: function validateAmount(e) {
      this.validateMin(e), this.validateMax(e);
    },
    validateMax: function validateMax(e) {
      var t = e.target.value;
      var a = e.target.dataset.max;
      "framesExportStart" == e.target.id && (a = parseInt(dom.query("#framesExportEnd").value())), "framesExportEnd" == e.target.id && (a = timeline.app.totalFrames), parseInt(t) > a && (e.target.value = a.toString());
    },
    validateMin: function validateMin(e) {
      var t = e.target.value;
      var a = e.target.dataset.min;
      "framesExportEnd" == e.target.id && (a = parseInt(dom.query("#framesExportStart").value())), parseInt(t) < a && (e.target.value = a.toString());
    },
    toggleAmount: function toggleAmount(t) {
      if (t.target == document.activeElement) {
        t.target.value.length || (t.target.value = 1);
        var a = t.wheelDeltaY < 0;
        var e = parseFloat(t.target.value);
        a ? e-- : e++, "framesExportWidth" != t.target.id && "framesExportHeight" != t.target.id || (e = e.toFixed(2)), t.target.value = e.toString(), this.validateAmount(t);
      }
    },
    validate: function validate() {
      var e = dom.query("#framesExportName").value(),
          t = parseInt(dom.query("#framesExportStart").value()),
          a = parseInt(dom.query("#framesExportEnd").value()),
          r = a - t + 1,
          o = parseFloat(dom.query("#framesExportWidth").value()),
          i = parseFloat(dom.query("#framesExportHeight").value()),
          s = dom.query("#framesExportShowSkin").query(".checkbox").hasClass("checked"),
          l = dom.query("#framesExportShowBones").query(".checkbox").hasClass("checked");
      events.emit("exportFrames", {
        name: e.length ? e : utils.uid(),
        start: t,
        end: a,
        totalFrames: r,
        frameWidth: o,
        frameHeight: i,
        showSkin: s,
        showBones: l
      });
    }
  }
});

module.exports = framesExportApp;