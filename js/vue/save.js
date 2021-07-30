"use strict";

var events = require("../../../lib/events.js"),
    dom = require("../../../lib/dom.js"),
    randomTitle = require("../random.title.js"),
    saveApp = new Vue({
  el: "#saveApp",
  data: {
    hidden: !0,
    closeMsg: "Close",
    defaultTitle: randomTitle.generate()
  },
  methods: {
    show: function show() {
      var _this = this;

      this.defaultTitle = randomTitle.generate(), this.hidden = !1, this.$nextTick(function () {
        _this.$el.style.opacity = "1", dom.query("#saveApp .drag").draggable({
          restrict: !0,
          root: _this.$el
        }), setTimeout(function () {
          var e = document.getElementById("saveFilename");
          e.focus();
        }, 100), events.emit("renderSleep");
      });
    },
    hide: function hide() {
      this.hidden = !0, events.emit("renderFocus");
    },
    checkFilename: function checkFilename(e) {
      var t = document.getElementById("download");
      e.target.value.length ? t.classList.remove("disabled") : t.classList.add("disabled");
    },
    validate: function validate() {
      var e = document.getElementById("saveFilename").value;
      e.length && events.emit("saveProject", e);
    }
  }
});

module.exports = saveApp;