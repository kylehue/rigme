const mouse = require("./mouse.js");
const utils = require("./utils.js");

let _draggableElements = [];

class NodeList {
	constructor(elements) {
		this.elements = elements || [];
	}

	query(selector) {
		let res = [];
		if (typeof selector == "string") {
			for (var i = 0; i < this.elements.length; i++) {
				let el = this.elements[i];
				if (el.matches(selector)) {
					res.push(el);
				}
			}
		} else if (typeof selector == "object") {
			res.push(selector);
		}

		let nodeList = new NodeList(res);

		return nodeList;
	}

	except(selector) {
		let res = [];
		for (var i = 0; i < this.elements.length; i++) {
			let el = this.elements[i];
			if (!el.matches(selector)) {
				res.push(el);
			}
		}

		let nodeList = new NodeList(res);

		return nodeList;
	}

	draggable(options) {
		options = options || {};
		for (var i = 0; i < this.elements.length; i++) {
			let el = this.elements[i];
			el._dragRoot = options.root || el;
			el._dragRoot._restrictDrag = options.restrict;
			el._dragRoot._dragStart = options.dragStart;
			el._dragRoot._dragEnd = options.dragEnd;
			el._dragRoot._drag = options.drag;

			if (!_draggableElements.includes(el._dragRoot)) {
				_draggableElements.push(el._dragRoot);
			}
		}
	}

	css(styleObject) {
		if (typeof styleObject == "object") {
			let keys = Object.keys(styleObject);
			for (var i = 0; i < this.elements.length; i++) {
				let el = this.elements[i];
				for (var j = 0; j < keys.length; j++) {
					let key = keys[j];
					let value = styleObject[key];
					el.style[key] = value;
				}
			}
		} else {
			if (arguments.length == 2) {
				for (var i = 0; i < this.elements.length; i++) {
					let el = this.elements[i];
					el.style[arguments[0]] = arguments[1];
				}
			}
		}

		return this;
	}

	prop(propsObject) {
		if (typeof propsObject == "object") {
			let keys = Object.keys(propsObject);
			for (var i = 0; i < this.elements.length; i++) {
				let el = this.elements[i];
				for (var j = 0; j < keys.length; j++) {
					let key = keys[j];
					let value = propsObject[key];
					el[key] = value;
				}
			}
		} else {
			if (arguments.length) {
				let arg1 = arguments[0];
				let arg2 = arguments[1] || "";
				for (var i = 0; i < this.elements.length; i++) {
					let el = this.elements[i];
					el[args1] = args2;
				}
			}
		}

		return this;
	}

	attr(attributesObject) {
		if (typeof attributesObject == "object") {
			let keys = Object.keys(attributesObject);
			for (var i = 0; i < this.elements.length; i++) {
				let el = this.elements[i];
				for (var j = 0; j < keys.length; j++) {
					let key = keys[j];
					let value = attributesObject[key];
					el.setAttribute(key, value);
				}
			}
		} else {
			if (arguments.length) {
				let arg1 = arguments[0];
				let arg2 = arguments[1] || "";
				for (var i = 0; i < this.elements.length; i++) {
					let el = this.elements[i];
					el.setAttribute(arg1, arg2);
				}
			}
		}

		return this;
	}

	remove() {
		for (var i = 0; i < this.elements.length; i++) {
			let el = this.elements[i];
			if (typeof el.parentNode == "object") {
				el.parentNode.removeChild(el);
			} else {
				el.remove();
			}

			this.elements.splice(this.elements.indexOf(el), 1);
		}
	}
}

let _isDragging = false;
let _activeDragEl = null, _activeDragElBounds;
let _dragStartPosition = {};

var _drag = event => {
	if (_isDragging) {
		if (_activeDragEl) {
			event.preventDefault();
			let movement = {
				x: _dragStartPosition.x - event.clientX,
				y: _dragStartPosition.y - event.clientY
			};

			let pos = {
				x: _activeDragEl.offsetLeft - movement.x,
				y: _activeDragEl.offsetTop - movement.y
			}

			if (_activeDragEl._restrictDrag) {
				pos.x = utils.clamp(pos.x, 0, innerWidth - _activeDragElBounds.width);

				pos.y = utils.clamp(pos.y, 0, innerHeight - _activeDragElBounds.height);
			}

			if (pos.x < innerWidth - _activeDragElBounds.width && pos.x > 0) {
				_dragStartPosition.x = event.clientX;
				_activeDragEl.style.left = pos.x + "px";
			}

			if (pos.x >= innerWidth - _activeDragElBounds.width) {
				_activeDragEl.style.left = (innerWidth - _activeDragElBounds.width) + "px";
			}

			if (pos.x <= 0) {
				_activeDragEl.style.left = "0px";
			}

			if (pos.y < innerHeight - _activeDragElBounds.height && pos.y > 0) {
				_dragStartPosition.y = event.clientY;
				_activeDragEl.style.top = pos.y + "px";
			}

			if (pos.y >= innerHeight - _activeDragElBounds.height) {
				_activeDragEl.style.top = (innerHeight - _activeDragElBounds.height) + "px";
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

var _dragStart = event => {
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

var _dragEnd = event => {
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

module.exports = {
	query: function(selector) {
		let el = document.querySelectorAll(selector);
		let res = [];

		for (var i = 0; i < el.length; i++) {
			res.push(el[i]);
		}

		let nodeList = new NodeList(res);

		return nodeList;
	}
}