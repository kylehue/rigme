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
		},
		showProperties: function() {
			this.hideJoints = true;
			this.hideProperties = false;
			this.hideHistory = true;

			dom.query("#jointsTab").removeClass("active");
			dom.query("#propertiesTab").addClass("active");
			dom.query("#historyTab").removeClass("active");
		},
		showHistory: function() {
			this.hideJoints = true;
			this.hideProperties = true;
			this.hideHistory = false;

			dom.query("#jointsTab").removeClass("active");
			dom.query("#propertiesTab").removeClass("active");
			dom.query("#historyTab").addClass("active");
		}
	}
});

console.log(paneApp)

module.exports = paneApp;