"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var utils = require("../../lib/utils.js");

var config = require("../../lib/config.js");

var events = require("../../lib/events.js");

var History = /*#__PURE__*/function () {
  function History() {
    _classCallCheck(this, History);

    this.events = [];
    this.present = null;
    this.maxStates = 300;
    this.eventCount = 0;
  }

  _createClass(History, [{
    key: "add",
    value: function add(options) {
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
    }
  }, {
    key: "sortByLatest",
    value: function sortByLatest() {
      this.events.sort(function (a, b) {
        return b.time - a.time;
      });
    }
  }, {
    key: "sortByOldest",
    value: function sortByOldest() {
      this.events.sort(function (a, b) {
        return a.time - b.time;
      });
    }
  }, {
    key: "getLatest",
    value: function getLatest() {
      return this.events[0];
    }
  }, {
    key: "getOldest",
    value: function getOldest() {
      return this.events[this.events.length - 1];
    }
  }, {
    key: "getNext",
    value: function getNext() {
      return this.events[this.events.indexOf(this.present) - 1] || null;
    }
  }, {
    key: "getPrevious",
    value: function getPrevious() {
      return this.events[this.events.indexOf(this.present) + 1] || null;
    }
  }, {
    key: "forward",
    value: function forward() {
      this.present = this.getNext();
    }
  }, {
    key: "backward",
    value: function backward() {
      this.present = this.getPrevious();
    }
  }, {
    key: "jump",
    value: function jump(id) {
      var event = this.events.find(function (e) {
        return e.id === id;
      });

      if (id) {
        this.present = event;
      }
    }
  }]);

  return History;
}();

var history = new History();
module.exports = history;