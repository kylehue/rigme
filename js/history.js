"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var utils = require("../../lib/utils.js"),
    config = require("../../lib/config.js"),
    events = require("../../lib/events.js");

var History = /*#__PURE__*/function () {
  function History() {
    _classCallCheck(this, History);

    this.events = [], this.present = null, this.maxStates = 300, this.eventCount = 0;
  }

  _createClass(History, [{
    key: "add",
    value: function add(t) {
      t = t || {}, this.present && this.events.splice(0, this.events.indexOf(this.present));
      t = {
        id: "E" + utils.uid(),
        label: t.label,
        value: t.value,
        group: t.group,
        time: Date.now()
      };
      this.present = t, this.events.push(t), this.sortByLatest(), this.events.length > this.maxStates && this.events.pop(), this.eventCount++, events.emit("historyChange");
    }
  }, {
    key: "sortByLatest",
    value: function sortByLatest() {
      this.events.sort(function (t, e) {
        return e.time - t.time;
      });
    }
  }, {
    key: "sortByOldest",
    value: function sortByOldest() {
      this.events.sort(function (t, e) {
        return t.time - e.time;
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
    value: function jump(e) {
      var t = this.events.find(function (t) {
        return t.id === e;
      });
      e && (this.present = t);
    }
  }]);

  return History;
}();

var history = new History();
module.exports = history;