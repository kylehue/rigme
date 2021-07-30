"use strict";

var utils = require("../../lib/utils.js");

var config = require("../../lib/config.js");

var events = require("../../lib/events.js");

var History = /*#__PURE__*/function () {
  function History() {
    this.events = [];
    this.present = null;
    this.maxStates = 300;
    this.eventCount = 0;
  }

  var _proto = History.prototype;

  _proto.add = function add(options) {
    options = options || {}; //Clear redos/future events

    if (this.present) {
      this.events.splice(0, this.events.indexOf(this.present));
    }

    var event = {
      id: "E" + utils.uid(),
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

    this.eventCount++;
    events.emit("historyChange");
  };

  _proto.sortByLatest = function sortByLatest() {
    this.events.sort(function (a, b) {
      return b.time - a.time;
    });
  };

  _proto.sortByOldest = function sortByOldest() {
    this.events.sort(function (a, b) {
      return a.time - b.time;
    });
  };

  _proto.getLatest = function getLatest() {
    return this.events[0];
  };

  _proto.getOldest = function getOldest() {
    return this.events[this.events.length - 1];
  };

  _proto.getNext = function getNext() {
    return this.events[this.events.indexOf(this.present) - 1] || null;
  };

  _proto.getPrevious = function getPrevious() {
    return this.events[this.events.indexOf(this.present) + 1] || null;
  };

  _proto.forward = function forward() {
    this.present = this.getNext();
  };

  _proto.backward = function backward() {
    this.present = this.getPrevious();
  };

  _proto.jump = function jump(id) {
    var event = this.events.find(function (e) {
      return e.id === id;
    });

    if (id) {
      this.present = event;
    }
  };

  return History;
}();

var history = new History();
module.exports = history;