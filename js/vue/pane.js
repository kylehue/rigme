"use strict";

var events = require("../../../lib/events.js");

var utils = require("../../../lib/utils.js");

var dom = require("../../../lib/dom.js");

var config = require("../../../lib/config.js");

var skinningInputIds = ["skinPositionX", "skinPositionY", "skinScaleX", "skinScaleY", "skinAngle"];
var paneApp = new Vue({
  el: "#paneApp",
  data: {
    hideJoints: false,
    hideProperties: true,
    hideHistory: true,
    showLength: !config.animation.linear
  },
  methods: {
    handleFocusOut: function handleFocusOut(e) {
      var el = e.target;

      if (skinningInputIds.includes(el.id)) {
        if (!el.value.length || !el.value) {
          el.value = el.placeholder;
        }
      }

      if (el.id == "jointName") {
        if (!el.value.length || !el.value) {
          el.value = utils.uid();
        }
      }

      if (el._lastValue != el.value) {
        if (skinningInputIds.includes(el.id)) {
          events.emit("jointSkinningInputChange");
        } else if (el.id == "jointZIndex") {
          events.emit("jointZIndexInputChange");
        } else if (el.id == "jointName") {
          events.emit("jointNameInputChange");
        }
      }

      el._lastValue = el.value;
    },
    handleInput: function handleInput() {
      events.emit("jointNameInputChange", true);
    },
    validateFormat: function validateFormat(e) {
      e.target.value = e.target.value.replace(/[^0-9.-]/g, "").replace(/(\..*)\./g, "$1").replace(/^0+/g, "").replace(/(?<!^)-/g, "");

      if (e.target.id == "jointX" || e.target.id == "jointY") {
        events.emit("jointPositionInputChange");
      } else if (e.target.id == "jointAngle") {
        events.emit("jointAngleInputChange");
      } else if (e.target.id == "jointLength") {
        events.emit("jointLengthInputChange");
      } else if (e.target.id == "jointZIndex") {
        events.emit("jointZIndexInputChange");
      }

      if (skinningInputIds.includes(e.target.id)) {
        events.emit("jointSkinningInputChange", true);
      }
    },
    toggleAmount: function toggleAmount(e) {
      if (e.target != document.activeElement) return;
      e.preventDefault();

      if (!e.target.value.length) {
        e.target.value = 1;
      }

      var isDown = e.wheelDeltaY < 0;
      var value = parseFloat(e.target.value);
      var weight = 1;

      if (e.target.id == "skinScaleX" || e.target.id == "skinScaleY") {
        weight = 0.1;
      }

      if (isDown) {
        value -= weight;
      } else {
        value += weight;
      }

      e.target.value = value.toFixed(2);

      if (e.target.id == "jointX" || e.target.id == "jointY") {
        events.emit("jointPositionInputChange");
      } else if (e.target.id == "jointAngle") {
        events.emit("jointAngleInputChange");
      } else if (e.target.id == "jointLength") {
        events.emit("jointLengthInputChange");
      } else if (e.target.id == "jointZIndex") {
        events.emit("jointZIndexInputChange", true);
        e.target.value = parseInt(e.target.value);
      }

      if (skinningInputIds.includes(e.target.id)) {
        events.emit("jointSkinningInputChange", true);
      }
    },
    showJoints: function showJoints() {
      this.hideJoints = false;
      this.hideProperties = true;
      this.hideHistory = true;
      dom.query("#jointsTab").addClass("active");
      dom.query("#propertiesTab").removeClass("active");
      dom.query("#historyTab").removeClass("active");
      dom.query("#jointApp").removeClass("hidden");
      dom.query("#propertyApp").addClass("hidden");
      dom.query("#historyApp").addClass("hidden");
    },
    showProperties: function showProperties() {
      this.hideProperties = false;
      this.hideJoints = true;
      this.hideHistory = true;
      dom.query("#jointsTab").removeClass("active");
      dom.query("#propertiesTab").addClass("active");
      dom.query("#historyTab").removeClass("active");
      dom.query("#jointApp").addClass("hidden");
      dom.query("#propertyApp").removeClass("hidden");
      dom.query("#historyApp").addClass("hidden");
    },
    showHistory: function showHistory() {
      this.hideHistory = false;
      this.hideJoints = true;
      this.hideProperties = true;
      dom.query("#jointsTab").removeClass("active");
      dom.query("#propertiesTab").removeClass("active");
      dom.query("#historyTab").addClass("active");
      dom.query("#jointApp").addClass("hidden");
      dom.query("#propertyApp").addClass("hidden");
      dom.query("#historyApp").removeClass("hidden");
    }
  }
});
module.exports = paneApp;