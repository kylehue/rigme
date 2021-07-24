const mouse = require("./mouse.js");
const utils = require("./utils.js");

let _draggableElements = [];

let _isDragging = false;
let _activeDragEl = null,
	_activeDragElBounds;
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

class DOM {
	query(selector, multiple) {
		if (typeof selector == "object") {
			return new Element(selector);
		}

		let searchEl = !this.node ? document : this.node;

		if (!multiple) {
			return new Element(searchEl.querySelector(selector));
		}

		let el = searchEl.querySelectorAll(selector);
		let res = [];

		for (var i = 0; i < el.length; i++) {
			let element = new Element(el[i]);
			res.push(element);
		}

		let nodeList = new NodeList(res);

		return nodeList;
	}

	create(tag) {
		let el = document.createElement(tag);
		let element = new Element(el);
		if (this.node) {
			this.node.appendChild(el);
		}

		return element;
	}
}

class NodeList {
	constructor(elements) {
		this.elements = elements || [];
	}

	on(event, f) {
		for (var i = 0; i < this.elements.length; i++) {
			let el = this.elements[i];
			el.on(event, f);
		}
	}

	append(_el) {
		if (_el instanceof NodeList) {
			for (var i = 0; i < this.elements.length; i++) {
				let el = this.elements[i];
				for (var j = 0; j < _el.elements.length; j++) {
					el.append(_el.elements[j]);
				}
			}
		} else {
			for (var i = 0; i < this.elements.length; i++) {
				let el = this.elements[i];
				el.append(_el);
			}
		}
	}

	value(str) {
		for (var i = 0; i < this.elements.length; i++) {
			let el = this.elements[i];
			el.value(str);
		}
	}

	query(selector) {
		let res = [];
		if (typeof selector == "string") {
			for (var i = 0; i < this.elements.length; i++) {
				let el = this.elements[i];
				if (el.node.matches(selector)) {
					res.push(el);
				}
			}
		} else if (typeof selector == "object") {
			let element = new Element(selector);
			res.push(element);
		}

		let nodeList = new NodeList(res);

		return nodeList;
	}

	text(txt, overwrite) {
		for (var i = 0; i < this.elements.length; i++) {
			let el = this.elements[i];
			el.text(txt, overwrite);
		}

		return this;
	}

	html(html, overwrite) {
		for (var i = 0; i < this.elements.length; i++) {
			let el = this.elements[i];
			el.html(html, overwrite);
		}

		return this;
	}

	addClass() {
		let args = [];
		for (var i = 0; i < arguments.length; i++) {
			args.push(arguments[i]);
		}

		for (var i = 0; i < this.elements.length; i++) {
			let el = this.elements[i];
			el.addClass(...args);
		}

		return this;
	}

	removeClass() {
		let args = [];
		for (var i = 0; i < arguments.length; i++) {
			args.push(arguments[i]);
		}

		for (var i = 0; i < this.elements.length; i++) {
			let el = this.elements[i];
			el.removeClass(...args);
		}

		return this;
	}

	toggleClass() {
		let args = [];
		for (var i = 0; i < arguments.length; i++) {
			args.push(arguments[i]);
		}

		for (var i = 0; i < this.elements.length; i++) {
			let el = this.elements[i];
			el.toggleClass(...args);
		}

		return this;
	}

	except(selector) {
		let res = [];
		for (var i = 0; i < this.elements.length; i++) {
			let el = this.elements[i];
			if (!el.node.matches(selector)) {
				res.push(el);
			}
		}

		let nodeList = new NodeList(res);

		return nodeList;
	}

	draggable(options) {
		options = options || {};
		for (var i = 0; i < this.elements.length; i++) {
			let el = this.elements[i].node;
			el.draggable(options);
		}
	}

	css() {
		let args = [];
		for (var i = 0; i < arguments.length; i++) {
			args.push(arguments[i]);
		}

		for (var i = 0; i < this.elements.length; i++) {
			let el = this.elements[i];
			el.css(...args);
		}

		return this;
	}

	prop() {
		let args = [];
		for (var i = 0; i < arguments.length; i++) {
			args.push(arguments[i]);
		}

		for (var i = 0; i < this.elements.length; i++) {
			let el = this.elements[i];
			el.prop(...args);
		}

		return this;
	}

	attr() {
		let args = [];
		for (var i = 0; i < arguments.length; i++) {
			args.push(arguments[i]);
		}

		for (var i = 0; i < this.elements.length; i++) {
			let el = this.elements[i];
			el.attr(...args);
		}

		return this;
	}

	remove() {
		for (var i = 0; i < this.elements.length; i++) {
			let el = this.elements[i];
			this.elements.splice(this.elements.indexOf(el), 1);
			el.remove();
		}
	}
}

class Element extends DOM {
	constructor(el) {
		super();
		this.node = el;
	}

	draggable(options) {
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

	remove() {
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

	text(txt, overwrite) {
		if (txt) {
			if (overwrite) this.node.innerText = txt;
			else this.node.innerText += txt;
		}

		return this.node.innerText;
	}

	html(html, overwrite) {
		if (html) {
			if (overwrite) this.node.innerHTML = html;
			else this.node.innerHTML += html;
		}

		return this.node.innerHTML;
	}

	addClass() {
		let args = [];
		for (var i = 0; i < arguments.length; i++) {
			args.push(arguments[i]);
		}

		this.node.classList.add(...args);
	}

	removeClass() {
		let args = [];
		for (var i = 0; i < arguments.length; i++) {
			args.push(arguments[i]);
		}

		this.node.classList.remove(...args);
	}

	toggleClass() {
		let args = [];
		for (var i = 0; i < arguments.length; i++) {
			args.push(arguments[i]);
		}

		this.node.classList.toggle(...args);
	}

	hasClass(token) {
		return this.node.classList.contains(token);
	}

	css(styleObject) {
		if (typeof styleObject == "object") {
			let keys = Object.keys(styleObject);
			for (var j = 0; j < keys.length; j++) {
				let key = keys[j];
				let value = styleObject[key];
				this.node.style[key] = value;
			}
		} else {
			if (arguments.length == 2) {
				this.node.style[arguments[0]] = arguments[1];
			}
		}

		return this;
	}

	prop(propsObject) {
		if (typeof propsObject == "object") {
			let keys = Object.keys(propsObject);
			for (var j = 0; j < keys.length; j++) {
				let key = keys[j];
				let value = propsObject[key];
				this.node[key] = value;
			}
		} else {
			if (arguments.length) {
				let arg1 = arguments[0];
				let arg2 = arguments[1];
				if (typeof arg2 != "undefined") this.node[arg1] = arg2;
				return this.node[arg1];
			}
		}

		return this;
	}

	attr(attributesObject) {
		if (typeof attributesObject == "object") {
			let keys = Object.keys(attributesObject);
			for (var j = 0; j < keys.length; j++) {
				let key = keys[j];
				let value = attributesObject[key];
				this.node.setAttribute(key, value);
			}
		} else {
			if (arguments.length) {
				let arg1 = arguments[0];
				let arg2 = arguments[1];
				if (typeof arg2 != "undefined") this.node.setAttribute(arg1, arg2);
				return this.node.getAttribute(arg1);
			}
		}

		return this;
	}

	append(el) {
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

	value(str) {
		if (str) this.prop("value", str);
		return this.node.value;
	}

	on(event, f) {
		this.node.addEventListener(event, f);
	}
}

const dom = new DOM;

module.exports = dom;