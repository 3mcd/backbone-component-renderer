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
	  return isBackboneView(c) ? c.el : c;
	};
	var isChunk = function isChunk(c) {
	  return chunks.has(c);
	};
	var isBackboneView = function isBackboneView(c) {
	  return c instanceof config.backbone.View;
	};
	var isNode = function isNode(c) {
	  return c instanceof Node;
	};
	var isArray = function isArray(c) {
	  return Array.isArray(c);
	};
	var isComponent = function isComponent(c) {
	  return isBackboneView(c) || isNode(c) || isChunk(c);
	};
	var removePlaceholders = function removePlaceholders(c, regex) {
	  return typeof c === 'string' ? c.replace(_const.PLACEHOLDER_REGEX, '') : c;
	};

	var chunks = new WeakSet();

	// Recursively tear down child views and chunks
	var teardown = function () {
	  var childMap = new WeakMap();
	  return function (context, nextChildren) {
	    var children = childMap.get(context);
	    if (children) {
	      cleanup(children);
	    }
	    childMap.set(context, nextChildren);
	  };
	}();

	var cleanup = function cleanup(child) {
	  if (isArray(child)) {
	    child.forEach(cleanup);
	  } else if (isBackboneView(child)) {
	    // Remove the view
	    child.remove();
	    // Ensure we clean up any child views of the view
	    teardown(child);
	  } else if (isChunk(child)) {
	    child.children.forEach(cleanup);
	  }
	};

	var normalizeSegments = function normalizeSegments(segments, expressions) {
	  return (0, _utils.flatten)((0, _utils.interleave)(segments, expressions).map(removePlaceholders));
	};

	var renderBackboneViews = function renderBackboneViews(c) {
	  if (isArray(c)) {
	    c.forEach(renderBackboneViews);
	  } else if (isChunk(c)) {
	    c.children.forEach(renderBackboneViews);
	  } else if (isBackboneView(c)) {
	    c.render();
	  }
	};

	var renderChunkToElement = function renderChunkToElement(chunk, el) {
	  var html = chunk.html,
	      children = chunk.children;
	  // Create an element with the child content of the view.

	  var temp = substitute(children, html, _const.PLACEHOLDER_REGEX);
	  // Empty the view element.
	  (0, _utils.empty)(el);
	  // Move new elements from temp to view element.
	  (0, _utils.moveChildren)(temp, el);
	};

	var substitute = function substitute(children, html, PLACEHOLDER_REGEX) {
	  var chunked = children.map(function (child) {
	    if (chunks.has(child)) {
	      return [].concat(_toConsumableArray(substitute(child.children, child.html, PLACEHOLDER_REGEX).childNodes));
	    }
	    return child;
	  });
	  // Recursively map all Backbone Views to DOM elements
	  var elements = (0, _utils.rMap)(chunked, toEl);
	  // Build DOM.
	  var temp = (0, _utils.injectElements)((0, _utils.tempElement)(html), elements, PLACEHOLDER_REGEX);
	  return temp;
	};

	var makeTagFn = function makeTagFn(view) {
	  return function renderer(segments) {
	    for (var _len = arguments.length, expressions = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      expressions[_key - 1] = arguments[_key];
	    }

	    var ch = isChunk(segments) ? segments : chunk.apply(undefined, arguments);
	    // Clean up all of the Backbone view's children.
	    teardown(view, ch.children);
	    // Recursively render all Backbone Views in chunk.
	    renderBackboneViews(ch);
	    // Render the chunk to the view's element.
	    renderChunkToElement(ch, view.el);
	    return ch;
	  };
	};

	/**
	 * Public API
	 */

	var chunk = function chunk(segments) {
	  var i = 0;
	  var html = '';
	  var children = [];
	  var handleComponent = function handleComponent(c) {
	    if (isComponent(c)) {
	      children.push(c);
	      c = (0, _const.PLACEHOLDER_TEMPLATE)(i++);
	    }
	    html += c;
	  };
	  if (!isArray(segments)) {
	    handleComponent(segments);
	  } else {
	    for (var _len2 = arguments.length, expressions = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	      expressions[_key2 - 1] = arguments[_key2];
	    }

	    normalizeSegments(segments, expressions).forEach(handleComponent);
	  }
	  var ch = { children: children, html: html };
	  chunks.add(ch);
	  return ch;
	};

	// Can be used as a template tag or a function
	var componentRenderer = function componentRenderer(view) {
	  // Return the tagging function
	  return makeTagFn(view);
	};

	var configureRenderer = function configureRenderer(options) {
	  config.backbone = options.backbone || config.backbone;
	};

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
	var flatten = function flatten(a) {
	  return a.reduce(function (a, x) {
	    return a.concat(x);
	  }, []);
	};
	var interleave = function interleave(a1, a2) {
	  return a1.map(function (v, i) {
	    return a2[i] ? [v, a2[i]] : v;
	  }).reduce(function (a, b) {
	    return a.concat(b);
	  }, []);
	};

	var matches = function matches(node, regex) {
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
	  var placeholders = [];
	  // Find placeholder groups. e.g. <% 1 %><% 2 %>
	  var groups = findTextNodes(el).filter(function (p) {
	    return matches(p, regex);
	  });
	  groups.forEach(function (group) {
	    // Find sub-placeholders. e.g. <% 2 %>
	    var matches = group.textContent.match(regex);
	    // For each sub-placeholder
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
	      // Grab the newly isolated placeholder
	      placeholders.push(placeholder);
	      // Keep moving
	      group = rest;
	    });
	  });
	  // Swap each placeholder with its corresponding element in the(elements Array
	  placeholders.forEach(function (placeholder) {
	    var pos = getPlaceholderId(placeholder);
	    swap(elements[pos], placeholder);
	  });
	  // Return the node
	  return el;
	};

	exports.empty = empty;
	exports.findTextNodes = findTextNodes;
	exports.flatten = flatten;
	exports.getPlaceholderId = getPlaceholderId;
	exports.injectElements = injectElements;
	exports.interleave = interleave;
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