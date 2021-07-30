"use strict";

var events = require("../../../lib/events.js"),
    dom = require("../../../lib/dom.js"),
    utils = require("../../../lib/utils.js"),
    config = require("../../../lib/config.js");

function createRect(o, p, r, c, s) {
  o.beginPath(), o.rect(p, r, c, s), o.closePath();
}

var cropApp = new Vue({
  el: "#cropApp",
  data: {
    cropFrom: {
      x: 0,
      y: 0
    },
    cropTo: null,
    cropBoundsThickness: 6,
    canvas: null,
    context: null,
    image: null,
    imageSize: null,
    hidden: !0
  },
  methods: {
    show: function show(o) {
      var _this = this;

      this.hidden = !1, this.$nextTick(function () {
        _this.$el.style.opacity = "1", dom.query("#cropApp .drag").draggable({
          restrict: !0,
          root: _this.$el
        }), _this.canvas = document.getElementById("cropCanvas"), _this.context = _this.canvas.getContext("2d"), _this.image = o, _this.imageSize = utils.scaleSize(_this.image.width, _this.image.height, _this.canvas.parentNode.offsetWidth, _this.canvas.parentNode.offsetWidth), _this.canvas.width = _this.imageSize.width, _this.canvas.height = _this.imageSize.height, _this.cropTo || (_this.cropTo = {
          x: _this.imageSize.width,
          y: _this.imageSize.height
        }), _this.redraw();
      }), events.emit("renderSleep");
    },
    redraw: function redraw() {
      if (this.canvas && this.context && this.image) {
        var o = this.context;
        o.clearRect(0, 0, this.canvas.width, this.canvas.height), o.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height), o.beginPath(), o.moveTo(this.cropFrom.x, this.cropFrom.y), o.lineTo(this.cropTo.x, this.cropFrom.y), o.lineTo(this.cropTo.x, this.cropTo.y), o.lineTo(this.cropFrom.x, this.cropTo.y), o.lineTo(this.cropFrom.x, this.cropFrom.y), o.lineTo(0, 0), o.lineTo(0, this.canvas.height), o.lineTo(this.canvas.width, this.canvas.height), o.lineTo(this.canvas.width, 0), o.lineTo(0, 0), o.closePath(), o.fillStyle = "rgba(0, 0, 0, 0.4)", o.fill(), o.save(), o.clip(), createRect(o, this.cropFrom.x - this.cropBoundsThickness / 2, this.cropFrom.y - this.cropBoundsThickness / 2, this.cropTo.x - this.cropFrom.x + this.cropBoundsThickness, this.cropTo.y - this.cropFrom.y + this.cropBoundsThickness), o.fillStyle = config.accent, o.fill(), o.restore();
      }
    },
    hide: function hide() {
      this.hidden = !0, this.canvas = null, this.context = null, events.emit("renderFocus");
    },
    getCrop: function getCrop() {
      return {
        from: {
          x: utils.map(this.cropFrom.x, 0, this.imageSize.width, 0, this.image.width),
          y: utils.map(this.cropFrom.y, 0, this.imageSize.height, 0, this.image.height)
        },
        to: {
          x: utils.map(this.cropTo.x, 0, this.imageSize.width, 0, this.image.width),
          y: utils.map(this.cropTo.y, 0, this.imageSize.width, 0, this.image.width)
        }
      };
    },
    save: function save() {
      this.hide(), events.emit("crop", this.getCrop(), {
        from: this.cropFrom,
        to: this.cropTo
      });
    },
    reset: function reset() {
      this.cropFrom = {
        x: 0,
        y: 0
      }, this.cropTo = {
        x: this.canvas.width,
        y: this.canvas.height
      }, this.redraw();
    }
  }
});

function getMousePosition(o, p) {
  var r = !1,
      c = !1,
      s = !1,
      t = !1;
  return s = o >= cropApp.cropFrom.x - cropApp.cropBoundsThickness && o <= cropApp.cropFrom.x + cropApp.cropBoundsThickness && p >= cropApp.cropFrom.y - cropApp.cropBoundsThickness && p <= cropApp.cropTo.y + cropApp.cropBoundsThickness, t = o >= cropApp.cropTo.x - cropApp.cropBoundsThickness && o <= cropApp.cropTo.x + cropApp.cropBoundsThickness && p >= cropApp.cropFrom.y - cropApp.cropBoundsThickness && p <= cropApp.cropTo.y + cropApp.cropBoundsThickness, r = p >= cropApp.cropFrom.y - cropApp.cropBoundsThickness && p <= cropApp.cropFrom.y + cropApp.cropBoundsThickness && o >= cropApp.cropFrom.x - cropApp.cropBoundsThickness && o <= cropApp.cropTo.x + cropApp.cropBoundsThickness, c = p >= cropApp.cropTo.y - cropApp.cropBoundsThickness && p <= cropApp.cropTo.y + cropApp.cropBoundsThickness && o >= cropApp.cropFrom.x - cropApp.cropBoundsThickness && o <= cropApp.cropTo.x + cropApp.cropBoundsThickness, {
    top: r,
    right: t,
    bottom: c,
    left: s
  };
}

var doc = dom.query("body"),
    isDragging = !1,
    startMousePos,
    startMouse,
    startWidth,
    startHeight;

function dragStart(o) {
  var p, r;
  cropApp.canvas && cropApp.context && (r = o.clientX, p = o.clientY, r = r - (o = cropApp.canvas.getBoundingClientRect()).x, o = p - o.y, isDragging = !0, startMousePos = getMousePosition(r, o), startMouse = {
    x: r - cropApp.cropFrom.x,
    y: o - cropApp.cropFrom.y
  }, startWidth = cropApp.cropTo.x - cropApp.cropFrom.x, startHeight = cropApp.cropTo.y - cropApp.cropFrom.y);
}

function dragEnd() {
  isDragging = !1;
}

function drag(o) {
  var p,
      r = o.clientX,
      c = o.clientY;
  cropApp.canvas && cropApp.context && (c = getMousePosition(o = r - (p = cropApp.canvas.getBoundingClientRect()).x, r = c - p.y), p = o >= cropApp.cropFrom.x + cropApp.cropBoundsThickness / 2 && o <= cropApp.cropTo.x - cropApp.cropBoundsThickness / 2 && r >= cropApp.cropFrom.y + cropApp.cropBoundsThickness / 2 && r <= cropApp.cropTo.y - cropApp.cropBoundsThickness / 2, isDragging ? (startMousePos.top && (cropApp.cropFrom.y = r, cropApp.redraw()), startMousePos.left && (cropApp.cropFrom.x = o, cropApp.redraw()), startMousePos.bottom && (cropApp.cropTo.y = r, cropApp.redraw()), startMousePos.right && (cropApp.cropTo.x = o, cropApp.redraw()), startMousePos.top || startMousePos.bottom || startMousePos.left || startMousePos.right || !p || (cropApp.cropFrom.x = o - startMouse.x, cropApp.cropFrom.y = r - startMouse.y, cropApp.cropTo.x = cropApp.cropFrom.x + startWidth, cropApp.cropTo.y = cropApp.cropFrom.y + startHeight, cropApp.redraw()), cropApp.cropFrom.y = utils.clamp(cropApp.cropFrom.y, 0, cropApp.cropTo.y), cropApp.cropFrom.x = utils.clamp(cropApp.cropFrom.x, 0, cropApp.cropTo.x), cropApp.cropTo.y = utils.clamp(cropApp.cropTo.y, cropApp.cropFrom.y, cropApp.canvas.height), cropApp.cropTo.x = utils.clamp(cropApp.cropTo.x, cropApp.cropFrom.x, cropApp.canvas.width)) : ((c.left || c.right) && doc.css("cursor", "ew-resize"), (c.top || c.bottom) && doc.css("cursor", "ns-resize"), c.top && c.left && doc.css("cursor", "nw-resize"), c.top && c.right && doc.css("cursor", "ne-resize"), c.bottom && c.left && doc.css("cursor", "sw-resize"), c.bottom && c.right && doc.css("cursor", "se-resize"), c.top || c.bottom || c.left || c.right || doc.css("cursor", "unset"), p && doc.css("cursor", "move")));
}

addEventListener("mousedown", dragStart), addEventListener("mouseup", dragEnd), addEventListener("mousemove", drag), module.exports = cropApp;