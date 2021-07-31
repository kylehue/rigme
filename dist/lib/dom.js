"use strict";

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var mouse = require("./mouse.js");

var utils = require("./utils.js");

var _draggableElements = [];
var _isDragging = false;

var _activeDragEl = null,
    _activeDragElBounds;

var _dragStartPosition = {};

var _drag = function _drag(event) {
  if (_isDragging) {
    if (_activeDragEl) {
      event.preventDefault();
      var movement = {
        x: _dragStartPosition.x - event.clientX,
        y: _dragStartPosition.y - event.clientY
      };
      var pos = {
        x: _activeDragEl.offsetLeft - movement.x,
        y: _activeDragEl.offsetTop - movement.y
      };

      if (_activeDragEl._restrictDrag) {
        pos.x = utils.clamp(pos.x, 0, innerWidth - _activeDragElBounds.width);
        pos.y = utils.clamp(pos.y, 0, innerHeight - _activeDragElBounds.height);
      }

      if (pos.x < innerWidth - _activeDragElBounds.width && pos.x > 0) {
        _dragStartPosition.x = event.clientX;
        _activeDragEl.style.left = pos.x + "px";
      }

      if (pos.x >= innerWidth - _activeDragElBounds.width) {
        _activeDragEl.style.left = innerWidth - _activeDragElBounds.width + "px";
      }

      if (pos.x <= 0) {
        _activeDragEl.style.left = "0px";
      }

      if (pos.y < innerHeight - _activeDragElBounds.height && pos.y > 0) {
        _dragStartPosition.y = event.clientY;
        _activeDragEl.style.top = pos.y + "px";
      }

      if (pos.y >= innerHeight - _activeDragElBounds.height) {
        _activeDragEl.style.top = innerHeight - _activeDragElBounds.height + "px";
      }

      if (pos.y <= 0) {
        _activeDragEl.style.top = "0px";
      }

      if (typeof _activeDragEl._drag == "function") _activeDragEl._drag(event);
    }
  }

  if (!mouse.pressed) {
    _dragEnd();
  }
};

var _dragStart = function _dragStart(event) {
  if (!_draggableElements.includes(event.target._dragRoot)) return;
  event.preventDefault();
  _isDragging = true;
  _activeDragEl = event.target._dragRoot;
  _activeDragElBounds = _activeDragEl.getBoundingClientRect();
  _dragStartPosition.x = event.clientX;
  _dragStartPosition.y = event.clientY;
  /*let children = _activeDragEl.querySelectorAll("*");
  for (var i = 0; i < children.length; i++) {
  	let child = children[i];
  	let style = getComputedStyle(child);
  	child._userSelect = style.getPropertyValue("user-select");
  	child._pointerEvents = style.getPropertyValue("pointer-events");
  	if (child.getAttribute("disabled")) child._disabled = true;
  }
  
  for (var i = 0; i < children.length; i++) {
  	let child = children[i];
  	child.style.pointerEvents = "none";
  	child.style.userSelect = "none";
  }*/

  if (typeof _activeDragEl._dragStart == "function") _activeDragEl._dragStart(event);
};

var _dragEnd = function _dragEnd(event) {
  if (_activeDragEl) {
    if (typeof _activeDragEl._dragEnd == "function") _activeDragEl._dragEnd(event);
    /*let children = _activeDragEl.querySelectorAll("*");
    for (var i = 0; i < children.length; i++) {
    	let child = children[i];
    	child.style.pointerEvents = child._pointerEvents;
    	child.style.userSelect = child._userSelect;
    	if (child._disabled) child.setAttribute("disabled", "");
    }*/
  }

  _isDragging = false;
  _activeDragEl = null;
};

addEventListener("mousemove", _drag);
addEventListener("mousedown", _dragStart);
addEventListener("mouseup", _dragEnd);

var DOM = /*#__PURE__*/function () {
  function DOM() {
    _classCallCheck(this, DOM);
  }

  _createClass(DOM, [{
    key: "query",
    value: function query(selector, multiple) {
      if (_typeof(selector) == "object") {
        return new Element(selector);
      }

      var searchEl = !this.node ? document : this.node;

      if (!multiple) {
        return new Element(searchEl.querySelector(selector));
      }

      var el = searchEl.querySelectorAll(selector);
      var res = [];

      for (var i = 0; i < el.length; i++) {
        var element = new Element(el[i]);
        res.push(element);
      }

      var nodeList = new NodeList(res);
      return nodeList;
    }
  }, {
    key: "create",
    value: function create(tag) {
      var el = document.createElement(tag);
      var element = new Element(el);

      if (this.node) {
        this.node.appendChild(el);
      }

      return element;
    }
  }]);

  return DOM;
}();

var NodeList = /*#__PURE__*/function () {
  function NodeList(elements) {
    _classCallCheck(this, NodeList);

    this.elements = elements || [];
  }

  _createClass(NodeList, [{
    key: "on",
    value: function on(event, f) {
      for (var i = 0; i < this.elements.length; i++) {
        var el = this.elements[i];
        el.on(event, f);
      }
    }
  }, {
    key: "append",
    value: function append(_el) {
      if (_el instanceof NodeList) {
        for (var i = 0; i < this.elements.length; i++) {
          var el = this.elements[i];

          for (var j = 0; j < _el.elements.length; j++) {
            el.append(_el.elements[j]);
          }
        }
      } else {
        for (var i = 0; i < this.elements.length; i++) {
          var _el2 = this.elements[i];

          _el2.append(_el);
        }
      }
    }
  }, {
    key: "value",
    value: function value(str) {
      for (var i = 0; i < this.elements.length; i++) {
        var el = this.elements[i];
        el.value(str);
      }
    }
  }, {
    key: "query",
    value: function query(selector) {
      var res = [];

      if (typeof selector == "string") {
        for (var i = 0; i < this.elements.length; i++) {
          var el = this.elements[i];

          if (el.node.matches(selector)) {
            res.push(el);
          }
        }
      } else if (_typeof(selector) == "object") {
        var element = new Element(selector);
        res.push(element);
      }

      var nodeList = new NodeList(res);
      return nodeList;
    }
  }, {
    key: "text",
    value: function text(txt, overwrite) {
      for (var i = 0; i < this.elements.length; i++) {
        var el = this.elements[i];
        el.text(txt, overwrite);
      }

      return this;
    }
  }, {
    key: "html",
    value: function html(_html, overwrite) {
      for (var i = 0; i < this.elements.length; i++) {
        var el = this.elements[i];
        el.html(_html, overwrite);
      }

      return this;
    }
  }, {
    key: "addClass",
    value: function addClass() {
      var args = [];

      for (var i = 0; i < arguments.length; i++) {
        args.push(arguments[i]);
      }

      for (var i = 0; i < this.elements.length; i++) {
        var el = this.elements[i];
        el.addClass.apply(el, args);
      }

      return this;
    }
  }, {
    key: "removeClass",
    value: function removeClass() {
      var args = [];

      for (var i = 0; i < arguments.length; i++) {
        args.push(arguments[i]);
      }

      for (var i = 0; i < this.elements.length; i++) {
        var el = this.elements[i];
        el.removeClass.apply(el, args);
      }

      return this;
    }
  }, {
    key: "toggleClass",
    value: function toggleClass() {
      var args = [];

      for (var i = 0; i < arguments.length; i++) {
        args.push(arguments[i]);
      }

      for (var i = 0; i < this.elements.length; i++) {
        var el = this.elements[i];
        el.toggleClass.apply(el, args);
      }

      return this;
    }
  }, {
    key: "except",
    value: function except(selector) {
      var res = [];

      for (var i = 0; i < this.elements.length; i++) {
        var el = this.elements[i];

        if (!el.node.matches(selector)) {
          res.push(el);
        }
      }

      var nodeList = new NodeList(res);
      return nodeList;
    }
  }, {
    key: "draggable",
    value: function draggable(options) {
      options = options || {};

      for (var i = 0; i < this.elements.length; i++) {
        var el = this.elements[i].node;
        el.draggable(options);
      }
    }
  }, {
    key: "css",
    value: function css() {
      var args = [];

      for (var i = 0; i < arguments.length; i++) {
        args.push(arguments[i]);
      }

      for (var i = 0; i < this.elements.length; i++) {
        var el = this.elements[i];
        el.css.apply(el, args);
      }

      return this;
    }
  }, {
    key: "prop",
    value: function prop() {
      var args = [];

      for (var i = 0; i < arguments.length; i++) {
        args.push(arguments[i]);
      }

      for (var i = 0; i < this.elements.length; i++) {
        var el = this.elements[i];
        el.prop.apply(el, args);
      }

      return this;
    }
  }, {
    key: "attr",
    value: function attr() {
      var args = [];

      for (var i = 0; i < arguments.length; i++) {
        args.push(arguments[i]);
      }

      for (var i = 0; i < this.elements.length; i++) {
        var el = this.elements[i];
        el.attr.apply(el, args);
      }

      return this;
    }
  }, {
    key: "remove",
    value: function remove() {
      for (var i = 0; i < this.elements.length; i++) {
        var el = this.elements[i];
        this.elements.splice(this.elements.indexOf(el), 1);
        el.remove();
      }
    }
  }]);

  return NodeList;
}();

var Element = /*#__PURE__*/function (_DOM) {
  _inherits(Element, _DOM);

  var _super = _createSuper(Element);

  function Element(el) {
    var _this;

    _classCallCheck(this, Element);

    _this = _super.call(this);
    _this.node = el;
    return _this;
  }

  _createClass(Element, [{
    key: "draggable",
    value: function draggable(options) {
      options = options || {};
      this.node._dragRoot = options.root || this.node;
      this.node._dragRoot._restrictDrag = options.restrict;
      this.node._dragRoot._dragStart = options.dragStart;
      this.node._dragRoot._dragEnd = options.dragEnd;
      this.node._dragRoot._drag = options.drag;

      if (!_draggableElements.includes(this.node._dragRoot)) {
        _draggableElements.push(this.node._dragRoot);
      }
    }
  }, {
    key: "remove",
    value: function remove() {
      if (this.node.parentNode) {
        this.node.parentNode.removeChild(this.node);
      } else {
        try {
          this.node.remove();
        } catch (e) {
          console.warn("Couldn't remove element");
        }
      }
    }
  }, {
    key: "text",
    value: function text(txt, overwrite) {
      if (txt) {
        if (overwrite) this.node.innerText = txt;else this.node.innerText += txt;
      }

      return this.node.innerText;
    }
  }, {
    key: "html",
    value: function html(_html2, overwrite) {
      if (_html2) {
        if (overwrite) this.node.innerHTML = _html2;else this.node.innerHTML += _html2;
      }

      return this.node.innerHTML;
    }
  }, {
    key: "addClass",
    value: function addClass() {
      var _this$node$classList;

      var args = [];

      for (var i = 0; i < arguments.length; i++) {
        args.push(arguments[i]);
      }

      (_this$node$classList = this.node.classList).add.apply(_this$node$classList, args);
    }
  }, {
    key: "removeClass",
    value: function removeClass() {
      var _this$node$classList2;

      var args = [];

      for (var i = 0; i < arguments.length; i++) {
        args.push(arguments[i]);
      }

      (_this$node$classList2 = this.node.classList).remove.apply(_this$node$classList2, args);
    }
  }, {
    key: "toggleClass",
    value: function toggleClass() {
      var _this$node$classList3;

      var args = [];

      for (var i = 0; i < arguments.length; i++) {
        args.push(arguments[i]);
      }

      (_this$node$classList3 = this.node.classList).toggle.apply(_this$node$classList3, args);
    }
  }, {
    key: "hasClass",
    value: function hasClass(token) {
      return this.node.classList.contains(token);
    }
  }, {
    key: "css",
    value: function css(styleObject) {
      if (_typeof(styleObject) == "object") {
        var keys = Object.keys(styleObject);

        for (var j = 0; j < keys.length; j++) {
          var key = keys[j];
          var value = styleObject[key];
          this.node.style[key] = value;
        }
      } else {
        if (arguments.length == 2) {
          this.node.style[arguments[0]] = arguments[1];
        }
      }

      return this;
    }
  }, {
    key: "prop",
    value: function prop(propsObject) {
      if (_typeof(propsObject) == "object") {
        var keys = Object.keys(propsObject);

        for (var j = 0; j < keys.length; j++) {
          var key = keys[j];
          var value = propsObject[key];
          this.node[key] = value;
        }
      } else {
        if (arguments.length) {
          var arg1 = arguments[0];
          var arg2 = arguments[1];
          if (typeof arg2 != "undefined") this.node[arg1] = arg2;
          return this.node[arg1];
        }
      }

      return this;
    }
  }, {
    key: "attr",
    value: function attr(attributesObject) {
      if (_typeof(attributesObject) == "object") {
        var keys = Object.keys(attributesObject);

        for (var j = 0; j < keys.length; j++) {
          var key = keys[j];
          var value = attributesObject[key];
          this.node.setAttribute(key, value);
        }
      } else {
        if (arguments.length) {
          var arg1 = arguments[0];
          var arg2 = arguments[1];
          if (typeof arg2 != "undefined") this.node.setAttribute(arg1, arg2);
          return this.node.getAttribute(arg1);
        }
      }

      return this;
    }
  }, {
    key: "append",
    value: function append(el) {
      if (el instanceof NodeList) {
        for (var i = 0; i < el.elements.length; i++) {
          this.node.appendChild(el.elements[i].node);
        }
      } else {
        if (el.node) {
          this.node.appendChild(el.node);
        } else {
          this.node.appendChild(el);
        }
      }

      return this;
    }
  }, {
    key: "value",
    value: function value(str) {
      if (str) this.prop("value", str);
      return this.node.value;
    }
  }, {
    key: "on",
    value: function on(event, f) {
      this.node.addEventListener(event, f);
    }
  }]);

  return Element;
}(DOM);

var dom = new DOM();
module.exports = dom;