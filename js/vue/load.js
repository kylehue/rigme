"use strict";

var yj = require("yieldable-json"),
    events = require("../../../lib/events.js"),
    dom = require("../../../lib/dom.js");

var currentJSON;
var loadApp = new Vue({
  el: "#loadApp",
  data: {
    hidden: !0,
    closeMsg: "Close",
    errorMessage: "",
    fileError: !1
  },
  methods: {
    show: function show() {
      var _this = this;

      this.hidden = !1, this.$nextTick(function () {
        _this.$el.style.opacity = "1", dom.query("#loadApp .drag").draggable({
          restrict: !0,
          root: _this.$el
        }), events.emit("renderSleep");
      });
    },
    hide: function hide() {
      currentJSON = void 0, events.emit("renderFocus"), dom.query("#import").addClass("disabled"), this.fileError = !1, this.hidden = !0;
    },
    checkFile: function checkFile() {
      var _this2 = this;

      var t = dom.query("#importInput");
      var r = dom.query("#loadFilename");
      var i = t.node.files[0];

      if (i) {
        var e = i.name;
        t = e.split(".")[e.split(".").length - 1];
        var s = dom.query("#import");
        s.addClass("disabled"), s.text("Processing...", !0), "rigme" == t && (r.text(e, !0), (i = URL.createObjectURL(i)) && fetch(i).then(function (e) {
          e.text().then(function (e) {
            var r,
                i = !1;

            try {
              yj.parseAsync(e, function (e, t) {
                e ? i = !0 : (r = t, i = !1, currentJSON = r, s.text("Load", !0), s.removeClass("disabled"), _this2.fileError = !1);
              });
            } catch (e) {
              s.addClass("disabled"), _this2.errorMessage = "This file is corrupted.", _this2.fileError = !0;
            }
          });
        }));
      }
    },
    validate: function validate() {
      currentJSON && (events.emit("loadProject", currentJSON), this.hide());
    }
  }
});
module.exports = loadApp;