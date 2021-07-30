"use strict";

var events = require("../../../lib/events.js"),
    utils = require("../../../lib/utils.js"),
    dom = require("../../../lib/dom.js"),
    config = require("../../../lib/config.js"),
    skinningInputIds = ["skinPositionX", "skinPositionY", "skinScaleX", "skinScaleY", "skinAngle"],
    paneApp = new Vue({
  el: "#paneApp",
  data: {
    hideJoints: !1,
    hideProperties: !0,
    hideHistory: !0,
    showLength: !config.animation.linear
  },
  methods: {
    handleFocusOut: function handleFocusOut(e) {
      var t = e.target;
      t.value.length && t.value || (t.value = 0), t._lastValue != t.value && (skinningInputIds.includes(t.id) ? events.emit("jointSkinningInputChange") : "jointZIndex" == t.id ? events.emit("jointZIndexInputChange") : "jointName" == t.id && events.emit("jointNameInputChange")), t._lastValue = t.value;
    },
    handleInput: function handleInput() {
      events.emit("jointNameInputChange", !0);
    },
    validateFormat: function validateFormat(e) {
      e.target.value = e.target.value.replace(/[^0-9.-]/g, "").replace(/(\..*)\./g, "$1").replace(/^0+/g, "").replace(/(?<!^)-/g, ""), "jointX" == e.target.id || "jointY" == e.target.id ? events.emit("jointPositionInputChange") : "jointAngle" == e.target.id ? events.emit("jointAngleInputChange") : "jointLength" == e.target.id ? events.emit("jointLengthInputChange") : "jointZIndex" == e.target.id && events.emit("jointZIndexInputChange"), skinningInputIds.includes(e.target.id) && events.emit("jointSkinningInputChange", !0);
    },
    toggleAmount: function toggleAmount(i) {
      if (i.target == document.activeElement) {
        i.preventDefault(), i.target.value.length || (i.target.value = 1);
        var n = i.wheelDeltaY < 0;
        var e = parseFloat(i.target.value),
            t = 1;
        "skinScaleX" != i.target.id && "skinScaleY" != i.target.id || (t = .1), n ? e -= t : e += t, i.target.value = e.toFixed(2), "jointX" == i.target.id || "jointY" == i.target.id ? events.emit("jointPositionInputChange") : "jointAngle" == i.target.id ? events.emit("jointAngleInputChange") : "jointLength" == i.target.id ? events.emit("jointLengthInputChange") : "jointZIndex" == i.target.id && (events.emit("jointZIndexInputChange", !0), i.target.value = parseInt(i.target.value)), skinningInputIds.includes(i.target.id) && events.emit("jointSkinningInputChange", !0);
      }
    },
    showJoints: function showJoints() {
      this.hideJoints = !1, this.hideProperties = !0, this.hideHistory = !0, dom.query("#jointsTab").addClass("active"), dom.query("#propertiesTab").removeClass("active"), dom.query("#historyTab").removeClass("active"), dom.query("#jointApp").removeClass("hidden"), dom.query("#propertyApp").addClass("hidden"), dom.query("#historyApp").addClass("hidden");
    },
    showProperties: function showProperties() {
      this.hideProperties = !1, this.hideJoints = !0, this.hideHistory = !0, dom.query("#jointsTab").removeClass("active"), dom.query("#propertiesTab").addClass("active"), dom.query("#historyTab").removeClass("active"), dom.query("#jointApp").addClass("hidden"), dom.query("#propertyApp").removeClass("hidden"), dom.query("#historyApp").addClass("hidden");
    },
    showHistory: function showHistory() {
      this.hideHistory = !1, this.hideJoints = !0, this.hideProperties = !0, dom.query("#jointsTab").removeClass("active"), dom.query("#propertiesTab").removeClass("active"), dom.query("#historyTab").addClass("active"), dom.query("#jointApp").addClass("hidden"), dom.query("#propertyApp").addClass("hidden"), dom.query("#historyApp").removeClass("hidden");
    }
  }
});

module.exports = paneApp;