"use strict";

var events = require("../../../lib/events.js");

var utils = require("../../../lib/utils.js");

var dom = require("../../../lib/dom.js");

var timeline = require("./timeline.js");

var randomTitle = require("../random.title.js");

var GIFExportApp = new Vue({
  el: "#GIFExportApp",
  data: {
    hidden: true
  },
  methods: {
    show: function show() {
      var _this = this;

      this.hidden = false;
      this.$nextTick(function () {
        _this.$el.style.opacity = "1";
        dom.query("#GIFExportApp .drag").draggable({
          restrict: true,
          root: _this.$el
        });
        dom.query("#GIFExportApp .custom-checkbox", true).on("click", function (event) {
          var el = dom.query(event.target).query(".checkbox");
          el.toggleClass("checked");
        });
        dom.query("#GIFExportName").value(randomTitle.generate());
        var startFrame = timeline.graph.playbackHandle.start.mark + 1;
        var endFrame = timeline.graph.playbackHandle.end.mark + 1;
        var bounds = rigModel.bounds;
        var frameWidth = bounds.max.x - bounds.min.x;
        var frameHeight = bounds.max.y - bounds.min.y;
        dom.query("#GIFExportStart").value(startFrame);
        dom.query("#GIFExportEnd").value(endFrame);
        dom.query("#GIFExportWidth").value(frameWidth.toFixed(2));
        dom.query("#GIFExportHeight").value(frameHeight.toFixed(2));
        setTimeout(function () {
          var title = document.getElementById("GIFExportName");
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

      if (e.target.id == "GIFExportStart") {
        max = parseInt(dom.query("#GIFExportEnd").value());
      }

      if (e.target.id == "GIFExportEnd") {
        max = timeline.app.totalFrames;
      }

      if (parseInt(value) > max) {
        e.target.value = max.toString();
      }
    },
    validateMin: function validateMin(e) {
      var value = e.target.value;
      var min = e.target.dataset.min;

      if (e.target.id == "GIFExportEnd") {
        min = parseInt(dom.query("#GIFExportStart").value());
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

      if (e.target.id == "GIFExportWidth" || e.target.id == "GIFExportHeight") {
        value = value.toFixed(2);
      }

      e.target.value = value.toString();
      this.validateAmount(e);
    },
    validate: function validate() {
      var name = dom.query("#GIFExportName").value();
      var startFrame = parseInt(dom.query("#GIFExportStart").value());
      var endFrame = parseInt(dom.query("#GIFExportEnd").value());
      var totalFrames = endFrame - startFrame + 1;
      var width = parseFloat(dom.query("#GIFExportWidth").value());
      var height = parseFloat(dom.query("#GIFExportHeight").value());
      var background = dom.query("#GIFExportBackground").value();
      var showSkin = dom.query("#GIFExportShowSkin").query(".checkbox").hasClass("checked");
      var showBones = dom.query("#GIFExportShowBones").query(".checkbox").hasClass("checked");
      events.emit("exportGIF", {
        name: name.length ? name : utils.uid(),
        start: startFrame,
        end: endFrame,
        totalFrames: totalFrames,
        width: width,
        height: height,
        showSkin: showSkin,
        showBones: showBones,
        background: background
      });
    }
  }
});
module.exports = GIFExportApp;