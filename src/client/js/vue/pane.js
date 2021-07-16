const events = require("../../../../lib/events.js");
const utils = require("../../../../lib/utils.js");
const dom = require("../../../../lib/dom.js");
const config = require("../../../../lib/config.js");

const paneApp = new Vue({
	el: "#paneApp",
	data: {
		hideJoints: false,
		hideProperties: true,
		hideHistory: true,
		showLength: !config.animation.linear
	},
	methods: {
		handleInput: function () {
			events.emit("jointNameInputChange");
		},
		validateFormat: function(e) {
			e.target.value = e.target.value.replace(/[^0-9.-]/g, "").replace(/(\..*)\./g, "$1").replace(/^0+/g, "").replace(/(?<!^)-/g, "");

			if (e.target.id == "jointX" || e.target.id == "jointY") {
				events.emit("jointPositionInputChange");
			} else if (e.target.id == "jointAngle") {
				events.emit("jointAngleInputChange");
			} else if (e.target.id == "jointLength") {
				events.emit("jointLengthInputChange");
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
			if (isDown) {
				value--;
			} else {
				value++;
			}

			e.target.value = value.toString();

			if (e.target.id == "jointX" || e.target.id == "jointY") {
				events.emit("jointPositionInputChange");
			} else if (e.target.id == "jointAngle") {
				events.emit("jointAngleInputChange");
			} else if (e.target.id == "jointLength") {
				events.emit("jointLengthInputChange");
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

console.log(paneApp)

module.exports = paneApp;