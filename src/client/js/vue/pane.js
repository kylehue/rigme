const events = require("../../../../lib/events.js");
const utils = require("../../../../lib/utils.js");
const dom = require("../../../../lib/dom.js");
const config = require("../../../../lib/config.js");

const skinningInputIds = ["skinPositionX", "skinPositionY", "skinScaleX", "skinScaleY", "skinAngle"];

const paneApp = new Vue({
	el: "#paneApp",
	data: {
		hideJoints: false,
		hideProperties: true,
		hideHistory: true,
		showLength: !config.animation.linear
	},
	methods: {
		handleFocusOut: function(e) {
			let el = e.target;

			if (!el.value.length || !el.value) {
				el.value = 0;
			}

			if (el._lastValue != el.value) {
				if (skinningInputIds.includes(el.id)) {
					events.emit("jointSkinningInputChange");
				}else if (el.id == "jointZIndex") {
					events.emit("jointZIndexInputChange");
				}else if (el.id == "jointName") {
					events.emit("jointNameInputChange");
				}
			}

			el._lastValue = el.value;
		},
		handleInput: function() {
			events.emit("jointNameInputChange", true);
		},
		validateFormat: function(e) {
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
		toggleAmount: function(e) {
			if (e.target != document.activeElement) return;
			e.preventDefault();
			if (!e.target.value.length) {
				e.target.value = 1;
			}

			let isDown = e.wheelDeltaY < 0;
			let value = parseFloat(e.target.value);
			let weight = 1;
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
		showJoints: function() {
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
		showProperties: function() {
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
		showHistory: function() {
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