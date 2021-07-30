"use strict";

var events = require("../../../lib/events.js");

var utils = require("../../../lib/utils.js");

var dom = require("../../../lib/dom.js");

var timeline = require("./timeline.js");

var randomTitle = require("../random.title.js");

var framesExportApp = new Vue({
  el: "#framesExportApp",
  data: {
    hidden: true
  },
  methods: {
    show: function show() {
      var _this = this;

      this.hidden = false;
      this.$nextTick(function () {
        _this.$el.style.opacity = "1";
        dom.query("#framesExportApp .drag").draggable({
          restrict: true,
          root: _this.$el
        });
        dom.query("#framesExportApp .custom-checkbox", true).on("click", function (event) {
          var el = dom.query(event.target).query(".checkbox");
          el.toggleClass("checked");
        });
        dom.query("#framesExportName").value(randomTitle.generate());
        var startFrame = timeline.graph.playbackHandle.start.mark + 1;
        var endFrame = timeline.graph.playbackHandle.end.mark + 1;
        var bounds = rigModel.bounds;
        var frameWidth = bounds.max.x - bounds.min.x;
        var frameHeight = bounds.max.y - bounds.min.y;
        dom.query("#framesExportStart").value(startFrame);
        dom.query("#framesExportEnd").value(endFrame);
        dom.query("#framesExportWidth").value(frameWidth.toFixed(2));
        dom.query("#framesExportHeight").value(frameHeight.toFixed(2));
        setTimeout(function () {
          var title = document.getElementById("framesExportName");
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
      var num = new RegExp("[^0-9.-]", "g");
      var sym_a = new RegExp("(\..*)\.", "g");
      var sym_b = new RegExp("^0+", "g");
      var sym_c = new RegExp("(?<!^)-", "g");
      e.target.value = e.target.value.replace(num, "").replace(sym_a, "$1").replace(sym_b, "").replace(sym_c, "");
      this.validateMax(e);
    },
    validateAmount: function validateAmount(e) {
      this.validateMin(e);
      this.validateMax(e);
    },
    validateMax: function validateMax(e) {
      var value = e.target.value;
      var max = e.target.dataset.max;

      if (e.target.id == "framesExportStart") {
        max = parseInt(dom.query("#framesExportEnd").value());
      }

      if (e.target.id == "framesExportEnd") {
        max = timeline.app.totalFrames;
      }

      if (parseInt(value) > max) {
        e.target.value = max.toString();
      }
    },
    validateMin: function validateMin(e) {
      var value = e.target.value;
      var min = e.target.dataset.min;

      if (e.target.id == "framesExportEnd") {
        min = parseInt(dom.query("#framesExportStart").value());
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

      if (e.target.id == "framesExportWidth" || e.target.id == "framesExportHeight") {
        value = value.toFixed(2);
      }

      e.target.value = value.toString();
      this.validateAmount(e);
    },
    validate: function validate() {
      var name = dom.query("#framesExportName").value();
      var startFrame = parseInt(dom.query("#framesExportStart").value());
      var endFrame = parseInt(dom.query("#framesExportEnd").value());
      var totalFrames = endFrame - startFrame + 1;
      var frameWidth = parseFloat(dom.query("#framesExportWidth").value());
      var frameHeight = parseFloat(dom.query("#framesExportHeight").value());
      var showSkin = dom.query("#framesExportShowSkin").query(".checkbox").hasClass("checked");
      var showBones = dom.query("#framesExportShowBones").query(".checkbox").hasClass("checked");
      events.emit("exportFrames", {
        name: name.length ? name : utils.uid(),
        start: startFrame,
        end: endFrame,
        totalFrames: totalFrames,
        frameWidth: frameWidth,
        frameHeight: frameHeight,
        showSkin: showSkin,
        showBones: showBones
      });
    }
  }
});
module.exports = framesExportApp;