const utils = require("../../../lib/utils.js");
const config = require("../../../lib/config.js");

class History {
	constructor() {
		this.events = [];
		this.present = null;
		this.maxStates = 300;
	}

	add(options) {
		options = options || {};
		
		//Clear redo/future events
		if (this.present) {
			this.events.splice(0, this.events.indexOf(this.present));
		}

		let event = {
			id: utils.uid(),
			label: options.label,
			value: options.value,
			group: options.group,
			time: Date.now()
		};

		this.present = event;

		this.events.push(event);

		this.sortByLatest();

		if (this.events.length > this.maxStates) {
			this.events.pop();
		}
	}

	sortByLatest() {
		this.events.sort((a, b) => b.time - a.time);
	}

	sortByOldest() {
		this.events.sort((a, b) => a.time - b.time);
	}

	getLatest() {
		return this.events[0];
	}

	getOldest() {
		return this.events[this.events.length - 1];
	}

	getNext() {
		return this.events[this.events.indexOf(this.present) - 1] || null;
	}

	getPrevious() {
		return this.events[this.events.indexOf(this.present) + 1] || null;
	}

	forward() {
		this.present = this.getNext();
	}

	backward() {
		this.present = this.getPrevious();
	}
}

const history = new History();

module.exports = history;