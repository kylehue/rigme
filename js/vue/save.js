"use strict";

var events = require("../../../lib/events.js");

var dom = require("../../../lib/dom.js");

var randomTitle = require("../random.title.js");

var saveApp = new Vue({
  el: "#saveApp",
  data: {
    hidden: true,
    closeMsg: "Close",
    defaultTitle: randomTitle.generate()
  },
  methods: {
    show: function show() {
      var _this = this;

      this.defaultTitle = randomTitle.generate();
      this.hidden = false;
      this.$nextTick(function () {
        _this.$el.style.opacity = "1";
        dom.query("#saveApp .drag").draggable({
          restrict: true,
          root: _this.$el
        });
        setTimeout(function () {
          var filenameInput = document.getElementById("saveFilename");
          filenameInput.focus();
        }, 100);
        events.emit("renderSleep");
      });
    },
    hide: function hide() {
      this.hidden = true;
      events.emit("renderFocus");
    },
    checkFilename: function checkFilename(e) {
      var downloadButton = document.getElementById("download");

      if (!e.target.value.length) {
        downloadButton.classList.add("disabled");
      } else {
        downloadButton.classList.remove("disabled");
      }
    },
    validate: function validate() {
      var filename = document.getElementById("saveFilename").value;

      if (!filename.length) {
        return;
      }

      events.emit("saveProject", filename);
    }
  }
});
module.exports = saveApp;