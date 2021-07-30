var clonedeep = require("lodash.clonedeep");

var rigModel = require("../rig.model.js");

var config = require("../../../lib/config.js");

var utils = require("../../../lib/utils.js");

var vector = require("../../../lib/vector.js");

var contextMenuApp = new Vue({
  el: "#contextMenuApp",
  data: {
    selectedKeyframe: null,
    hidden: true,
    position: {
      x: 0,
      y: 0
    },
    width: document.getElementById("contextMenuApp").offsetWidth,
    height: document.getElementById("contextMenuApp").offsetHeight
  },
  methods: {
    show: function show(x, y) {
      var _this = this;

      this.hidden = false;
      this.$nextTick(function () {
        _this.width = _this.$el.offsetWidth;
        _this.height = _this.$el.offsetHeight;
        _this.position.x = x;
        _this.position.y = y;
        _this.$el.style.left = "".concat(_this.position.x, "px");
        _this.$el.style.top = "".concat(_this.position.y, "px");
      });
    },
    hide: function hide() {
      this.hidden = true;
    },
    copy: function copy() {
      rigModel.copiedKeyframe = clonedeep(rigModel.getKeyframe("selected", true));
    },
    paste: function paste() {
      var timeline = require("./timeline.js");

      var copiedKeyframe = rigModel.copiedKeyframe;

      if (copiedKeyframe) {
        rigModel.setKeyframe(timeline.graph.state.currentMark, {
          position: vector(timeline.graph.state.currentMark * timeline.graph.hatchMark.spacing + timeline.graph.hatchMark.spacing / 2, config.render.keyframe.y),
          locked: timeline.graph.state.currentMark == 0 ? true : false,
          id: utils.uid(),
          joints: copiedKeyframe.joints
        });
      }
    }
  }
});
window.contextMenuApp = contextMenuApp;
module.exports = contextMenuApp;