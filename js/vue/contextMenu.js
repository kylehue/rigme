"use strict";

var clonedeep = require("lodash.clonedeep"),
    rigModel = require("../rig.model.js"),
    config = require("../../../lib/config.js"),
    utils = require("../../../lib/utils.js"),
    vector = require("../../../lib/vector.js"),
    contextMenuApp = new Vue({
  el: "#contextMenuApp",
  data: {
    selectedKeyframe: null,
    hidden: !0,
    position: {
      x: 0,
      y: 0
    },
    width: document.getElementById("contextMenuApp").offsetWidth,
    height: document.getElementById("contextMenuApp").offsetHeight
  },
  methods: {
    show: function show(e, t) {
      var _this = this;

      this.hidden = !1, this.$nextTick(function () {
        _this.width = _this.$el.offsetWidth, _this.height = _this.$el.offsetHeight, _this.position.x = e, _this.position.y = t, _this.$el.style.left = "".concat(_this.position.x, "px"), _this.$el.style.top = "".concat(_this.position.y, "px");
      });
    },
    hide: function hide() {
      this.hidden = !0;
    },
    copy: function copy() {
      rigModel.copiedKeyframe = clonedeep(rigModel.getKeyframe("selected", !0));
    },
    paste: function paste() {
      var e = require("./timeline.js"),
          t = rigModel.copiedKeyframe;

      t && rigModel.setKeyframe(e.graph.state.currentMark, {
        position: vector(e.graph.state.currentMark * e.graph.hatchMark.spacing + e.graph.hatchMark.spacing / 2, config.render.keyframe.y),
        locked: 0 == e.graph.state.currentMark,
        id: utils.uid(),
        joints: t.joints
      });
    }
  }
});

window.contextMenuApp = contextMenuApp, module.exports = contextMenuApp;