"use strict";

var events = require("../../../lib/events.js");

var utils = require("../../../lib/utils.js");

var dom = require("../../../lib/dom.js");

var timeline = require("./timeline.js");

var randomTitle = require("../random.title.js");

var spritesheetExportApp = new Vue({
  el: "#spritesheetExportApp",
  data: {
    hidden: true
  },
  methods: {
    show: function show() {
      var _this = this;

      this.hidden = false;
      this.$nextTick(function () {
        _this.$el.style.opacity = "1";
        dom.query("#spritesheetExportApp .drag").draggable({
          restrict: true,
          root: _this.$el
        });
        dom.query("#spritesheetExportApp .custom-checkbox", true).on("click", function (event) {
          var el = dom.query(event.target).query(".checkbox");
          el.toggleClass("checked");
        });
        dom.query("#spritesheetName").value(randomTitle.generate());
        var startFrame = timeline.graph.playbackHandle.start.mark + 1;
        var endFrame = timeline.graph.playbackHandle.end.mark + 1;
        var bounds = rigModel.bounds;
        var cellWidth = bounds.max.x - bounds.min.x;
        var cellHeight = bounds.max.y - bounds.min.y;
        var rowCount = Math.ceil(Math.sqrt(endFrame - startFrame));
        dom.query("#spritesheetStart").value(startFrame);
        dom.query("#spritesheetEnd").value(endFrame);
        dom.query("#spritesheetCellWidth").value(cellWidth.toFixed(2));
        dom.query("#spritesheetCellHeight").value(cellHeight.toFixed(2));
        dom.query("#spritesheetRowCount").value(rowCount);
        setTimeout(function () {
          var title = document.getElementById("spritesheetName");
          title.focus();
        }, 100);
        events.emit("renderSleep");
      });
    },
    hide: function hide() {
      this.hidden = true;
      events.emit("renderFocus");
    },
    validateFormat: function validateFormat(e) {
      e.target.value = e.target.value.replace(/[^0-9.-]/g, "").replace(/(\..*)\./g, "$1").replace(/^0+/g, "").replace(/(?<!^)-/g, "");
      this.validateMax(e);
    },
    validateAmount: function validateAmount(e) {
      this.validateMin(e);
      this.validateMax(e);
    },
    validateMax: function validateMax(e) {
      var value = e.target.value;
      var max = e.target.dataset.max;

      if (e.target.id == "spritesheetRowCount") {
        var totalFrames = parseInt(dom.query("#spritesheetEnd").value()) - parseInt(dom.query("#spritesheetStart").value());
        max = totalFrames + 1;
      }

      if (e.target.id == "spritesheetStart") {
        max = parseInt(dom.query("#spritesheetEnd").value());
      }

      if (e.target.id == "spritesheetEnd") {
        max = timeline.app.totalFrames;
      }

      if (parseInt(value) > max) {
        e.target.value = max.toString();
      }
    },
    validateMin: function validateMin(e) {
      var value = e.target.value;
      var min = e.target.dataset.min;

      if (e.target.id == "spritesheetEnd") {
        min = parseInt(dom.query("#spritesheetStart").value());
      }

      if (parseInt(value) < min) {
        e.target.value = min.toString();
      }
    },
    toggleAmount: function toggleAmount(e) {
      if (e.target != document.activeElement) return;

      if (!e.target.value.length) {
        e.target.value = 1;
      }

      var isDown = e.wheelDeltaY < 0;
      var value = parseFloat(e.target.value);

      if (isDown) {
        value--;
      } else {
        value++;
      }

      if (e.target.id == "spritesheetCellWidth" || e.target.id == "spritesheetCellHeight") {
        value = value.toFixed(2);
      }

      e.target.value = value.toString();
      this.validateAmount(e);
    },
    validate: function validate() {
      var name = dom.query("#spritesheetName").value();
      var startFrame = parseInt(dom.query("#spritesheetStart").value());
      var endFrame = parseInt(dom.query("#spritesheetEnd").value());
      var totalFrames = endFrame - startFrame + 1;
      var cellWidth = parseFloat(dom.query("#spritesheetCellWidth").value());
      var cellHeight = parseFloat(dom.query("#spritesheetCellHeight").value());
      var rowCount = parseInt(dom.query("#spritesheetRowCount").value());
      var showSkin = dom.query("#spritesheetShowSkin").query(".checkbox").hasClass("checked");
      var showBones = dom.query("#spritesheetShowBones").query(".checkbox").hasClass("checked");
      var columnCount = Math.ceil(totalFrames / rowCount);
      events.emit("exportSpritesheet", {
        name: name.length ? name : utils.uid(),
        start: startFrame,
        end: endFrame,
        totalFrames: totalFrames,
        cellWidth: cellWidth,
        cellHeight: cellHeight,
        rows: rowCount,
        cols: columnCount,
        showSkin: showSkin,
        showBones: showBones
      });
    }
  }
});
module.exports = spritesheetExportApp;