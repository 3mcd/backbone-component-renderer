(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["backboneComponentRenderer"] = factory();
	else
		root["backboneComponentRenderer"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.configureRenderer = exports.componentRenderer = exports.chunk = undefined;

	var _utils = __webpack_require__(1);

	var _const = __webpack_require__(2);

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var config = {
	  backbone: window.Backbone
	};

	var toEl = function toEl(c) {
	  return isView(c) ? c.el : c;
	};
	var isView = function isView(c) {
	  return c instanceof config.backbone.View;
	};
	var isNode = function isNode(c) {
	  return c instanceof Node;
	};
	var isArray = function isArray(c) {
	  return Array.isArray(c);
	};
	var removePlaceholders = function removePlaceholders(c, regex) {
	  return typeof c === 'string' ? c.replace(_const.PLACEHOLDER_REGEX, '') : c;
	};

	var childMap = new WeakMap();
	var chunks = new WeakSet();
	var idMap = new WeakMap();

	// Convert a component into a string. If the component is a Backbone View or
	// DOM Node, create a placeholder for the element to be replaced with later.
	var parseComponent = function parseComponent(component, context) {
	  if (isArray(component)) {
	    return component.map(function (e) {
	      return parseComponent(e, context);
	    }).join('');
	  }
	  if (isView(component)) {
	    // Render the Backbone.View instance automatically.
	    component.render();
	  } else if (!isNode(component) && !chunks.has(component)) {
	    // If the component is anything other than a Node, we just toString it.
	    return component;
	  }
	  // Generate a placeholder for the view or Node for this render cycle.
	  var id = (idMap.get(context) || 0) + 1;
	  idMap.set(context, id);
	  return (0, _const.PLACEHOLDER_TEMPLATE)(id);
	};

	// Recursively tear down child views and chunks.
	var teardown = function teardown(context) {
	  var children = childMap.get(context);
	  // Reset id counter for next render.
	  idMap.delete(context);
	  if (children) {
	    cleanup(children);
	  }
	};

	var cleanup = function cleanup(child) {
	  if (isArray(child)) {
	    child.forEach(cleanup);
	  } else if (isView(child)) {
	    // Remove the view.
	    child.remove();
	    // Ensure we clean up any child views of the view.
	    teardown(child);
	  } else if (chunks.has(child)) {
	    cleanup(child.children);
	  }
	};

	var createPlaceholderTemplate = function createPlaceholderTemplate(components, context) {
	  return components.map(function (c) {
	    return parseComponent(c, context);
	  }).reduce(function (a, c) {
	    return a + c;
	  });
	};

	var getChildren = function getChildren(components) {
	  return components.reduce(function (a, c) {
	    if (isArray(c)) {
	      return a.concat(getChildren(c));
	    }
	    if (isView(c) || c instanceof Node || chunks.has(c)) {
	      a.push(c);
	    }
	    return a;
	  }, []);
	};

	var _chunk = function _chunk() {
	  var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  return function chunk(segments) {
	    if (!isArray(segments)) {
	      segments = [segments];
	    }

	    for (var _len = arguments.length, expressions = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      expressions[_key - 1] = arguments[_key];
	    }

	    var components = (0, _utils.interleave)(segments, expressions).map(removePlaceholders);
	    var c = {
	      children: getChildren(components),
	      html: createPlaceholderTemplate(components, context)
	    };
	    chunks.add(c);
	    return c;
	  };
	};

	var makeTagFn = function makeTagFn(view) {
	  return function componentRendererTagFn(segments) {
	    for (var _len2 = arguments.length, expressions = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	      expressions[_key2 - 1] = arguments[_key2];
	    }

	    teardown(view);
	    var chunk = chunks.has(segments) ? segments : _chunk(view).apply(undefined, arguments);
	    childMap.set(view, chunk.children);
	    renderChunk(chunk, view.el);
	    return chunk;
	  };
	};

	var renderChunk = function renderChunk(chunk, el) {
	  var html = chunk.html,
	      children = chunk.children;

	  var temp = substitute(children, html, _const.PLACEHOLDER_REGEX);
	  // Empty the view element
	  (0, _utils.empty)(el);
	  // Move new elements from temp to view element
	  (0, _utils.moveChildren)(temp, el);
	};

	var substitute = function substitute(children, html, PLACEHOLDER_REGEX) {
	  var chunked = children.map(function (child) {
	    if (chunks.has(child)) {
	      return [].concat(_toConsumableArray(substitute(child.children, child.html, PLACEHOLDER_REGEX).childNodes));
	    }
	    return child;
	  });
	  // Recursively map all Backbone Views to DOM elements.
	  var elements = (0, _utils.rMap)(chunked, toEl);
	  // Build DOM.
	  var temp = (0, _utils.injectElements)((0, _utils.tempElement)(html), elements, PLACEHOLDER_REGEX);
	  return temp;
	};

	/**
	 * Public API
	 */

	var chunk = function chunk() {
	  return _chunk().apply(undefined, arguments);
	};

	// Can be used as a template tag or a function.
	var componentRenderer = function componentRenderer(view) {
	  // Return the tagging function.
	  return makeTagFn(view);
	};

	var configureRenderer = function configureRenderer(options) {
	  config.backbone = options.backbone || config.backbone;
	};

	window.childMap = childMap;

	exports.chunk = chunk;
	exports.componentRenderer = componentRenderer;
	exports.configureRenderer = configureRenderer;

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var rMap = function rMap(a, cb) {
	  return a.map(function (x) {
	    return Array.isArray(x) ? x.map(cb) : cb(x);
	  });
	};

	var interleave = function interleave(a1, a2) {
	  return a1.map(function (v, i) {
	    return a2[i] ? [v, a2[i]] : v;
	  }).reduce(function (a, b) {
	    return a.concat(b);
	  }, []);
	};

	var isPlaceholder = function isPlaceholder(node, regex) {
	  regex.lastIndex = 0;
	  return regex.test(node.textContent);
	};

	var getPlaceholderId = function getPlaceholderId(node) {
	  return Number(node.textContent.match(/[\w\.]+/)[0]);
	};

	var swap = function swap(els, ref) {
	  var parent = ref.parentNode;
	  if (Array.isArray(els)) {
	    swap(els[0], ref);
	    els.slice(1).forEach(function (el, i) {
	      return parent.insertBefore(el, els[i].nextSibling);
	    });
	  } else {
	    parent.replaceChild(els, ref);
	  }
	};
	var empty = function empty(parent) {
	  while (parent.firstChild) {
	    parent.removeChild(parent.firstChild);
	  }
	};
	var moveChildren = function moveChildren(from, to) {
	  while (from.childNodes.length > 0) {
	    to.appendChild(from.childNodes[0]);
	  }
	};

	var findTextNodes = function findTextNodes(el) {
	  var n,
	      a = [],
	      walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
	  while (n = walk.nextNode()) {
	    a.push(n);
	  }return a;
	};

	var tempElement = function tempElement(html) {
	  var el = document.createElement('span');
	  el.innerHTML = html || '';
	  return el;
	};

	var injectElements = function injectElements(el, elements, regex) {
	  // Create temp element so we aren't doing DOM manipulation directly in the document.
	  var placeholders = [];
	  var groups = findTextNodes(el).filter(function (p) {
	    return isPlaceholder(p, regex);
	  });
	  groups.forEach(function (group) {
	    // Find sub-placeholders.
	    var matches = group.textContent.match(regex);
	    var finalMatch = matches[matches.length - 1];
	    // For each sub-placeholder,
	    matches.forEach(function (placeholderText, i) {
	      var placeholder;
	      var rest;

	      if (i === 0) {
	        rest = group.splitText(group.textContent.indexOf(placeholderText) + placeholderText.length);
	        placeholder = group;
	      } else {
	        placeholder = group.splitText(group.textContent.indexOf(placeholderText));
	        if (i !== matches.length) {
	          rest = placeholder.splitText(placeholder.textContent.indexOf(placeholderText) + placeholderText.length);
	        }
	      }
	      // Grab the newly isolated placeholder.
	      placeholders.push(placeholder);
	      // Keep moving.
	      group = rest;
	    });
	  });
	  // Swap each placeholder with its corresponding element in the(elements Array.
	  placeholders.forEach(function (placeholder) {
	    var id = getPlaceholderId(placeholder);
	    swap(elements[id - 1], placeholder);
	  });
	  // Return the node.
	  return el;
	};

	exports.empty = empty;
	exports.findTextNodes = findTextNodes;
	exports.getPlaceholderId = getPlaceholderId;
	exports.injectElements = injectElements;
	exports.interleave = interleave;
	exports.isPlaceholder = isPlaceholder;
	exports.moveChildren = moveChildren;
	exports.rMap = rMap;
	exports.swap = swap;
	exports.tempElement = tempElement;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var PLACEHOLDER_REGEX = /<%([\s\S]+?)%>/g;
	var PLACEHOLDER_TEMPLATE = function PLACEHOLDER_TEMPLATE(id) {
	  return "<% " + id + " %>";
	};

	exports.PLACEHOLDER_REGEX = PLACEHOLDER_REGEX;
	exports.PLACEHOLDER_TEMPLATE = PLACEHOLDER_TEMPLATE;

/***/ }
/******/ ])
});
;