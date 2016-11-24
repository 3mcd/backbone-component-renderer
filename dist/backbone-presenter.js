(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["backbonePresenter"] = factory();
	else
		root["backbonePresenter"] = factory();
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
	exports.configurePresenter = exports.presenter = undefined;

	var _utils = __webpack_require__(1);

	var _const = __webpack_require__(2);

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var config = {
	  Backbone: window.Backbone
	};

	// Id counters for each view's render cycle.
	var idMap = new WeakMap();
	// Child view storage.
	var childMap = new WeakMap();

	// Convert a component into a string. If the component is a Backbone View or
	// DOM Node, create a placeholder for the element to be replaced with later.
	var parseComponent = function parseComponent(component, parentView) {
	  if (Array.isArray(component)) {
	    return component.map(function (e) {
	      return parseComponent(e, parentView);
	    }).join('');
	  }
	  if (component instanceof config.Backbone.View) {
	    // Render the Backbone.View instance automatically.
	    component.render();
	  } else if (!(component instanceof Node)) {
	    // If the component is anything other than a Node, we just toString it.
	    return component;
	  }
	  // Generate a placeholder for the view or Node for this render cycle.
	  var id = idMap.get(parentView) + 1;
	  idMap.set(parentView, id);
	  return (0, _const.PLACEHOLDER_TEMPLATE)(id);
	};

	// Recursively tear down child views, calling remove method for cleanup.
	var teardown = function teardown(parentView) {
	  var childViews = childMap.get(parentView);
	  idMap.set(parentView, 0);
	  childViews.forEach(function (view) {
	    if (view instanceof config.Backbone.View) {
	      teardown(view);
	      view.remove();
	    }
	  });
	  childViews.clear();
	};

	var createPresenterTemplate = function createPresenterTemplate(view, components) {
	  return components.map(function (c) {
	    return parseComponent(c, view);
	  }).reduce(function (a, c) {
	    return a + c;
	  });
	};

	var getChildViews = function getChildViews(view, components) {
	  var childViews = [];
	  components.forEach(function (s) {
	    if (Array.isArray(s)) {
	      childViews = [].concat(_toConsumableArray(childViews), _toConsumableArray(getChildViews(view, s)));
	    } else if (s instanceof config.Backbone.View || s instanceof Node) {
	      childViews.push(s);
	    }
	  });
	  return childViews;
	};

	var makeTagFn = function makeTagFn(view) {
	  return function bbTagFn(segments) {
	    var childViews = childMap.get(view);
	    if (!Array.isArray(segments)) {
	      segments = [segments];
	    }

	    for (var _len = arguments.length, expressions = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      expressions[_key - 1] = arguments[_key];
	    }

	    var components = (0, _utils.interleave)(segments, expressions).map(function (c) {
	      return typeof c === 'string' ? c.replace(_const.PLACEHOLDER_REGEX, '') : c;
	    });
	    // Clean up child views
	    teardown(view);
	    // Update childViews from newly passed components
	    childViews = new Set(getChildViews(view, components));
	    childMap.set(view, childViews);
	    // Get a template string w/ placeholders
	    var html = createPresenterTemplate(view, components);
	    // Update view's innerHTML with the template string
	    // Substitute placeholders with child view elements
	    var childViewArr = [].concat(_toConsumableArray(childViews));
	    var childViewEls = childViewArr.map(function (v) {
	      return v instanceof config.Backbone.View ? v.el : v;
	    });
	    var tempEl = (0, _utils.substitutePlaceholders)(childViewEls, html, _const.PLACEHOLDER_REGEX);
	    // Empty the view element
	    (0, _utils.empty)(view.el);
	    // Move new elements from tempEl to view element
	    (0, _utils.moveChildren)(tempEl, view.el);
	    return childViewArr;
	  };
	};

	// Can be used as a template tag or a function.
	var presenter = function presenter(view) {
	  childMap.set(view, new Set());
	  // Return the tagging function.
	  return makeTagFn(view);
	};

	var configurePresenter = function configurePresenter(options) {
	  config.Backbone = options.Backbone || Backbone;
	};

	exports.presenter = presenter;
	exports.configurePresenter = configurePresenter;

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
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

	var swap = function swap(el, ref) {
	  return ref.parentNode.replaceChild(el, ref);
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

	var substitutePlaceholders = function substitutePlaceholders(orderedEls, html, regex) {
	  // Create temp element so we aren't doing DOM manipulation directly in the document.
	  var temp = document.createElement('div');
	  var placeholders = [];
	  // Parse HTML text as DOM.
	  temp.innerHTML = html;
	  var groups = findTextNodes(temp).filter(function (p) {
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
	      // split the text node at the beginning and end of the placeholder.
	      placeholder = group.splitText(group.textContent.indexOf(placeholderText));
	      rest = placeholder.splitText(placeholder.textContent.indexOf(placeholderText) + placeholderText.length);
	      // Grab the newly isolated placeholder.
	      placeholders.push(placeholder);
	      // Keep moving.
	      group = rest;
	    });
	  });
	  // Swap each placeholder with its corresponding element in the orderedEls Array.
	  placeholders.forEach(function (placeholder) {
	    var id = getPlaceholderId(placeholder);
	    swap(orderedEls[id - 1], placeholder);
	  });
	  // Return the temporary node.
	  return temp;
	};

	exports.interleave = interleave;
	exports.isPlaceholder = isPlaceholder;
	exports.getPlaceholderId = getPlaceholderId;
	exports.swap = swap;
	exports.empty = empty;
	exports.moveChildren = moveChildren;
	exports.findTextNodes = findTextNodes;
	exports.substitutePlaceholders = substitutePlaceholders;

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