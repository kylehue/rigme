"use strict";

var events = require("../../../lib/events.js"),
    utils = require("../../../lib/utils.js"),
    dom = require("../../../lib/dom.js"),
    timeline = require("./timeline.js"),
    randomTitle = require("../random.title.js"),
    GIFExportApp = new Vue({
  el: "#GIFExportApp",
  data: {
    hidden: !0
  },
  methods: {
    show: function show() {
      var _this = this;

      this.hidden = !1, this.$nextTick(function () {
        _this.$el.style.opacity = "1", dom.query("#GIFExportApp .drag").draggable({
          restrict: !0,
          root: _this.$el
        }), dom.query("#GIFExportApp .custom-checkbox", !0).on("click", function (e) {
          var t = dom.query(e.target).query(".checkbox");
          t.toggleClass("checked");
        }), dom.query("#GIFExportName").value(randomTitle.generate());
        var e = timeline.graph.playbackHandle.start.mark + 1,
            t = timeline.graph.playbackHandle.end.mark + 1,
            a = rigModel.bounds;
        var r = a.max.x - a.min.x,
            o = a.max.y - a.min.y;
        dom.query("#GIFExportStart").value(e), dom.query("#GIFExportEnd").value(t), dom.query("#GIFExportWidth").value(r.toFixed(2)), dom.query("#GIFExportHeight").value(o.toFixed(2)), setTimeout(function () {
          var e = document.getElementById("GIFExportName");
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
      "GIFExportStart" == e.target.id && (a = parseInt(dom.query("#GIFExportEnd").value())), "GIFExportEnd" == e.target.id && (a = timeline.app.totalFrames), parseInt(t) > a && (e.target.value = a.toString());
    },
    validateMin: function validateMin(e) {
      var t = e.target.value;
      var a = e.target.dataset.min;
      "GIFExportEnd" == e.target.id && (a = parseInt(dom.query("#GIFExportStart").value())), parseInt(t) < a && (e.target.value = a.toString());
    },
    toggleAmount: function toggleAmount(t) {
      if (t.target == document.activeElement) {
        t.target.value.length || (t.target.value = 1);
        var a = t.wheelDeltaY < 0;
        var e = parseFloat(t.target.value);
        a ? e-- : e++, "GIFExportWidth" != t.target.id && "GIFExportHeight" != t.target.id || (e = e.toFixed(2)), t.target.value = e.toString(), this.validateAmount(t);
      }
    },
    validate: function validate() {
      var e = dom.query("#GIFExportName").value(),
          t = parseInt(dom.query("#GIFExportStart").value()),
          a = parseInt(dom.query("#GIFExportEnd").value()),
          r = a - t + 1,
          o = parseFloat(dom.query("#GIFExportWidth").value()),
          i = parseFloat(dom.query("#GIFExportHeight").value()),
          l = dom.query("#GIFExportBackground").value(),
          d = dom.query("#GIFExportShowSkin").query(".checkbox").hasClass("checked"),
          n = dom.query("#GIFExportShowBones").query(".checkbox").hasClass("checked");
      events.emit("exportGIF", {
        name: e.length ? e : utils.uid(),
        start: t,
        end: a,
        totalFrames: r,
        width: o,
        height: i,
        showSkin: d,
        showBones: n,
        background: l
      });
    }
  }
});

module.exports = GIFExportApp;