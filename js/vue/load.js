var yj = require("yieldable-json");

var events = require("../../../lib/events.js");

var dom = require("../../../lib/dom.js");

var currentJSON;
var loadApp = new Vue({
  el: "#loadApp",
  data: {
    hidden: true,
    closeMsg: "Close",
    errorMessage: "",
    fileError: false
  },
  methods: {
    show: function show() {
      var _this = this;

      this.hidden = false;
      this.$nextTick(function () {
        _this.$el.style.opacity = "1";
        dom.query("#loadApp .drag").draggable({
          restrict: true,
          root: _this.$el
        });
        events.emit("renderSleep");
      });
    },
    hide: function hide() {
      currentJSON = undefined;
      events.emit("renderFocus");
      dom.query("#import").addClass("disabled");
      this.fileError = false;
      this.hidden = true;
    },
    checkFile: function checkFile() {
      var _this2 = this;

      var fileEl = dom.query("#importInput");
      var filenameEl = dom.query("#loadFilename");
      var file = fileEl.node.files[0];
      if (!file) return;
      var filename = file.name;
      var fileExtension = filename.split(".")[filename.split(".").length - 1];
      var importButton = dom.query("#import");
      importButton.addClass("disabled");
      importButton.text("Processing...", true);

      if (fileExtension == "rigme") {
        filenameEl.text(filename, true);
        var fileURL = URL.createObjectURL(file);

        if (fileURL) {
          fetch(fileURL).then(function (res) {
            res.text().then(function (text) {
              var json;
              var error = false;

              try {
                yj.parseAsync(text, function (err, res) {
                  if (err) {
                    error = true;
                    return;
                  }

                  json = res;
                  error = false;
                  currentJSON = json;
                  importButton.text("Load", true);
                  importButton.removeClass("disabled");
                  _this2.fileError = false;
                });
              } catch (e) {
                importButton.addClass("disabled");
                _this2.errorMessage = "This file is corrupted.";
                _this2.fileError = true;
              }
            });
          });
        }
      }
    },
    validate: function validate() {
      if (!currentJSON) {
        return;
      }

      events.emit("loadProject", currentJSON);
      this.hide();
    }
  }
});
module.exports = loadApp;