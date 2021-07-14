const events = require("../../../../lib/events.js");
const utils = require("../../../../lib/utils.js");
const dom = require("../../../../lib/dom.js");

const paneApp = new Vue({
	el: "#paneApp",
	data: {
		hideJoints: false,
		hideProperties: true,
		hideHistory: true
	},
	methods: {
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