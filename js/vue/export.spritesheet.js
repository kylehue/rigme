"use strict";

var events = require("../../../lib/events.js"),
    utils = require("../../../lib/utils.js"),
    dom = require("../../../lib/dom.js"),
    timeline = require("./timeline.js"),
    randomTitle = require("../random.title.js"),
    spritesheetExportApp = new Vue({
  el: "#spritesheetExportApp",
  data: {
    hidden: !0
  },
  methods: {
    show: function show() {
      var _this = this;

      this.hidden = !1, this.$nextTick(function () {
        _this.$el.style.opacity = "1", dom.query("#spritesheetExportApp .drag").draggable({
          restrict: !0,
          root: _this.$el
        }), dom.query("#spritesheetExportApp .custom-checkbox", !0).on("click", function (e) {
          var t = dom.query(e.target).query(".checkbox");
          t.toggleClass("checked");
        }), dom.query("#spritesheetName").value(randomTitle.generate());
        var e = timeline.graph.playbackHandle.start.mark + 1,
            t = timeline.graph.playbackHandle.end.mark + 1,
            r = rigModel.bounds;
        var a = r.max.x - r.min.x,
            s = r.max.y - r.min.y;
        r = Math.ceil(Math.sqrt(t - e));
        dom.query("#spritesheetStart").value(e), dom.query("#spritesheetEnd").value(t), dom.query("#spritesheetCellWidth").value(a.toFixed(2)), dom.query("#spritesheetCellHeight").value(s.toFixed(2)), dom.query("#spritesheetRowCount").value(r), setTimeout(function () {
          var e = document.getElementById("spritesheetName");
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
      var t,
          r = e.target.value;
      var a = e.target.dataset.max;
      "spritesheetRowCount" == e.target.id && (t = parseInt(dom.query("#spritesheetEnd").value()) - parseInt(dom.query("#spritesheetStart").value()), a = 1 + t), "spritesheetStart" == e.target.id && (a = parseInt(dom.query("#spritesheetEnd").value())), "spritesheetEnd" == e.target.id && (a = timeline.app.totalFrames), parseInt(r) > a && (e.target.value = a.toString());
    },
    validateMin: function validateMin(e) {
      var t = e.target.value;
      var r = e.target.dataset.min;
      "spritesheetEnd" == e.target.id && (r = parseInt(dom.query("#spritesheetStart").value())), parseInt(t) < r && (e.target.value = r.toString());
    },
    toggleAmount: function toggleAmount(t) {
      if (t.target == document.activeElement) {
        t.target.value.length || (t.target.value = 1);
        var r = t.wheelDeltaY < 0;
        var e = parseFloat(t.target.value);
        r ? e-- : e++, "spritesheetCellWidth" != t.target.id && "spritesheetCellHeight" != t.target.id || (e = e.toFixed(2)), t.target.value = e.toString(), this.validateAmount(t);
      }
    },
    validate: function validate() {
      var e = dom.query("#spritesheetName").value(),
          t = parseInt(dom.query("#spritesheetStart").value()),
          r = parseInt(dom.query("#spritesheetEnd").value()),
          a = r - t + 1,
          s = parseFloat(dom.query("#spritesheetCellWidth").value()),
          i = parseFloat(dom.query("#spritesheetCellHeight").value()),
          l = parseInt(dom.query("#spritesheetRowCount").value()),
          o = dom.query("#spritesheetShowSkin").query(".checkbox").hasClass("checked"),
          n = dom.query("#spritesheetShowBones").query(".checkbox").hasClass("checked"),
          d = Math.ceil(a / l);
      events.emit("exportSpritesheet", {
        name: e.length ? e : utils.uid(),
        start: t,
        end: r,
        totalFrames: a,
        cellWidth: s,
        cellHeight: i,
        rows: l,
        cols: d,
        showSkin: o,
        showBones: n
      });
    }
  }
});

module.exports = spritesheetExportApp;