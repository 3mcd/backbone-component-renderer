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
	exports.factory = exports.configureRenderer = exports.componentRenderer = exports.chunk = undefined;

	var _litJs = __webpack_require__(1);

	/**
	 * Public API
	 */

	var config = { backbone: window.Backbone };

	var configureRenderer = function configureRenderer(options) {
	  var backbone = options.backbone;

	  config.backbone = options.backbone || config.backbone;
	};

	var lit = (0, _litJs.createRenderer)({
	  parse: function parse(view) {
	    if (view instanceof config.backbone.View) {
	      return view;
	    } else if (view.prototype instanceof config.backbone.View) {
	      return new view();
	    }
	  },
	  render: function render(view) {
	    view.render();
	    return view.el;
	  },
	  destroy: function destroy(view) {
	    view.remove();
	  }
	});

	var chunk = lit.chunk;

	var componentRenderer = function componentRenderer(view) {
	  return lit.componentRenderer(view.el);
	};

	var factory = function factory(Ctor) {
	  return function () {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return new (Function.prototype.bind.apply(Ctor, [null].concat(args)))();
	  };
	};

	exports.chunk = chunk;
	exports.componentRenderer = componentRenderer;
	exports.configureRenderer = configureRenderer;
	exports.factory = factory;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory();
		else if(typeof define === 'function' && define.amd)
			define([], factory);
		else if(typeof exports === 'object')
			exports["lit"] = factory();
		else
			root["lit"] = factory();
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
		exports.createRenderer = undefined;

		var _renderer = __webpack_require__(1);

		/**
		 * Public API
		 */

		exports.createRenderer = _renderer.createRenderer;

	/***/ },
	/* 1 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.createRenderer = undefined;

		var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

		var _utils = __webpack_require__(2);

		var _const = __webpack_require__(3);

		function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

		var warn = function warn(msg) {
		  return console.warn('lit-js:', msg);
		};

		var warnings = {
		  TYPE: function TYPE(a, b) {
		    return a + ' must be of type ' + b;
		  },
		  EXP_ARRAY: 'A deeply nested array was used inside of a template expression. Adjust your template to remove redundant nesting of arrays.',
		  EXP_OBJECT: 'An object was used inside of a template expression. Objects other than views, Nodes and and chunks are ignored.',
		  PARSED_NON_OBJECT: 'An array or value other than object was returned from parse(). parse() should return a view instance, usually an object. If you return an object other than a view instance, your views may not be disposed of correctly.'
		};

		var isChunk = function isChunk(c) {
		  return chunks.has(c);
		};
		var isNode = function isNode(c) {
		  return c instanceof Node;
		};
		var isArray = function isArray(c) {
		  return Array.isArray(c);
		};
		var isString = function isString(c) {
		  return typeof c === 'string';
		};
		var isFunction = function isFunction(c) {
		  return c instanceof Function;
		};

		// childMap stores all children of a Node that has been rendered to. The
		// children are stored in an array of either chunks or Nodes, and are
		// recursively cleaned up the next time the Node is rendered to.
		// <Node, Array<Component>>
		var childMap = new WeakMap();
		// componentMap associates Nodes with their corresponding views.
		// <Component, View>
		var componentMap = new WeakMap();
		// chunks keeps track of all chunks for verification.
		// <chunk>
		var chunks = new WeakSet();

		// Recursively tear down child views and chunks
		var teardown = function teardown(el, destroy) {
		  var child = childMap.get(el);
		  if (child) {
		    cleanup(child, destroy);
		  }
		};

		var cleanup = function cleanup(child, destroy) {
		  if (isArray(child)) {
		    child.forEach(function (c) {
		      return cleanup(c, destroy);
		    });
		    return;
		  }
		  var view = componentMap.get(child);
		  if (view) {
		    destroy(view);
		  }
		  if (isNode(child)) {
		    teardown(child, destroy);
		    return;
		  }
		  if (isChunk(child)) {
		    child.children.forEach(function (c) {
		      return cleanup(c, destroy);
		    });
		  }
		};

		var renderChunkToElement = function renderChunkToElement(chunk, el, placeholderMatch) {
		  var html = chunk.html,
		      children = chunk.children;
		  // Create an element with the child content of the view.

		  var temp = inject(children, html, placeholderMatch);
		  // Empty the view element.
		  (0, _utils.empty)(el);
		  // Move new elements from temp to view element.
		  (0, _utils.moveChildren)(temp, el);
		};

		var inject = function inject(children, html, placeholderMatch) {
		  var chunked = children.map(function (child) {
		    if (isChunk(child)) {
		      return [].concat(_toConsumableArray(inject(child.children, child.html, placeholderMatch).childNodes));
		    }
		    return child;
		  });
		  // Build DOM.
		  var temp = (0, _utils.tempElement)(html);
		  (0, _utils.replaceElements)(temp, chunked, placeholderMatch);
		  return temp;
		};

		var _createRenderer = function _createRenderer(config) {
		  var parse = config.parse,
		      render = config.render,
		      destroy = config.destroy,
		      _config$placeholder = config.placeholder,
		      match = _config$placeholder.match,
		      template = _config$placeholder.template;


		  var removePlaceholders = function removePlaceholders(s) {
		    return s.replace(match, '');
		  };

		  var componentRenderer = function componentRenderer(el) {
		    return function renderer(segments) {
		      for (var _len = arguments.length, expressions = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
		        expressions[_key - 1] = arguments[_key];
		      }

		      var ch = isChunk(segments) ? segments : chunk.apply(undefined, arguments);
		      // Remove all child components and store the incoming ones.
		      teardown(el, destroy);
		      childMap.set(el, ch);
		      // Render the chunk to the el.
		      renderChunkToElement(ch, el, match);
		      return ch;
		    };
		  };

		  var chunk = function chunk(segments) {
		    for (var _len2 = arguments.length, expressions = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
		      expressions[_key2 - 1] = arguments[_key2];
		    }

		    // Placeholder index
		    var p = 0;
		    var html = '';
		    var children = [];
		    var components = getComponents.apply(undefined, arguments);
		    components.forEach(function (c) {
		      if (!isString(c)) {
		        children.push(c);
		        c = template(p++);
		      }
		      html += c;
		    });
		    var ch = { children: children, html: html };
		    chunks.add(ch);
		    return ch;
		  };

		  var getComponent = function getComponent(exp) {
		    var arr = [];
		    if (isArray(exp)) {
		      for (var i = 0; i < exp.length; i++) {
		        var c = parseExpression(exp[i]);
		        if (c) {
		          arr.push(c);
		        }
		      }
		    } else {
		      var _c = parseExpression(exp);
		      if (_c) {
		        arr.push(_c);
		      }
		    }
		    return arr;
		  };

		  var getComponents = function getComponents(segments) {
		    for (var _len3 = arguments.length, expressions = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
		      expressions[_key3 - 1] = arguments[_key3];
		    }

		    // componentRenderer() or chunk() was not called as a tag
		    if (!segments.raw) {
		      if (!isArray(segments)) {
		        segments = [segments];
		      }
		      return [].concat(_toConsumableArray(segments), expressions).reduce(function (arr, exp, i) {
		        return arr.concat(getComponent(exp));
		      }, []);
		    }
		    return expressions.reduce(function (arr, exp, i) {
		      var seg = segments[i + 1];
		      arr = arr.concat(getComponent(exp));
		      arr.push(parseSegment(seg));
		      return arr;
		    }, [segments[0]]);
		  };

		  var parseSegment = function parseSegment(s) {
		    s = removePlaceholders(s);
		    return s.replace(_const.HTML_WHITESPACE_REGEX, _const.htmlWhitespaceReplace);
		  };

		  var parseExpression = function parseExpression(c) {
		    var tryParse = function tryParse(c) {
		      var parsed = parse(c);
		      // If the parse() function returns a falsey value, the component must not
		      // be a view.
		      if (!parsed) {
		        return c;
		      }
		      // View library might organize views as arrays.
		      if ((typeof parsed === 'undefined' ? 'undefined' : _typeof(parsed)) !== 'object' || isArray(parsed)) {
		        warn(warnings.PARSED_NON_OBJECT);
		      }
		      // Render the element and return the element (or elements) therein. This
		      // would potentially trigger other calls to componentRenderer which would
		      // recursively set up child content in a depth-first manner.
		      var el = render(parsed);
		      // Multiple elements can be returned from the render function. They are
		      // combined into a chunk. It is assumed that the parent view will clean
		      // them up with destroy() is called.
		      if (isArray(el)) {
		        el = chunk(el);
		      }
		      // Set the element (or chunk) to the View instance in componentMap. The
		      // componentMap is accessed in cleanup() to reconcile an element or chunk
		      // with its view.
		      if ((typeof el === 'undefined' ? 'undefined' : _typeof(el)) === 'object') {
		        componentMap.set(el, parsed);
		      }
		      return el;
		    };
		    if (isString(c)) {
		      return (0, _utils.escape)(removePlaceholders(c));
		    }
		    // Component is already a chunk.
		    if (isChunk(c)) {
		      return c;
		    }
		    // Yield control to the end-user. Attempt to render the component if it is
		    // fact a view instance.
		    c = tryParse(c);
		    // If the component is still a function for whatever reason, execute it and
		    // set the component to the return value of the function.
		    if (isFunction(c)) {
		      c = tryParse(c());
		    }
		    // The function could have potentially returned a chunk. Either way, Node
		    // instances and chunks are the last objects we will accept.
		    if (isNode(c) || isChunk(c)) {
		      return c;
		    }
		    if (isArray(c)) {
		      warn(warnings.EXP_ARRAY);
		      return null;
		    }
		    // Ignore all other objects.
		    if ((typeof c === 'undefined' ? 'undefined' : _typeof(c)) === 'object') {
		      warn(warnings.EXP_OBJECT);
		      return null;
		    }
		    // Stringify all other values.
		    c = '' + c;

		    return c;
		  };

		  return { componentRenderer: componentRenderer, chunk: chunk };
		};

		var createRenderer = function createRenderer() {
		  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

		  var config = {
		    parse: function parse(view) {
		      return view;
		    },
		    render: function render(view) {
		      return view;
		    },
		    destroy: function destroy(view) {
		      return view.parentElement.removeChild(view);
		    },
		    placeholder: {
		      match: _const.PLACEHOLDER_REGEX,
		      template: _const.placeholderTemplate
		    }
		  };

		  var _options$parse = options.parse,
		      parse = _options$parse === undefined ? config.parse : _options$parse,
		      _options$render = options.render,
		      render = _options$render === undefined ? config.render : _options$render,
		      _options$destroy = options.destroy,
		      destroy = _options$destroy === undefined ? config.destroy : _options$destroy,
		      _options$placeholder = options.placeholder,
		      placeholder = _options$placeholder === undefined ? config.placeholder : _options$placeholder;


		  if (!isFunction(render)) {
		    warn(warnings.TYPE('createRenderer option render', 'Function'));
		  } else {
		    config.render = render;
		  }

		  if (!isFunction(destroy)) {
		    warn(warnings.TYPE('createRenderer option destroy', 'Function.'));
		  } else {
		    config.destroy = destroy;
		  }

		  if (!isFunction(parse)) {
		    warn(warnings.TYPE('createRenderer option parse', 'Function.'));
		  } else {
		    config.parse = parse;
		  }

		  var match = placeholder.match,
		      template = placeholder.template;


		  placeholder.match = match;
		  placeholder.template = template;

		  return _createRenderer(config);
		};

		exports.createRenderer = createRenderer;

	/***/ },
	/* 2 */
	/***/ function(module, exports) {

		'use strict';

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
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

		var replaceElements = function replaceElements(el, elements, regex) {
		  var placeholders = [];
		  // Find placeholder groups. e.g. <% 1 %><% 2 %>
		  var groups = findTextNodes(el).filter(function (p) {
		    return matches(p, regex);
		  });
		  groups.forEach(function (group) {
		    // Find sub-placeholders. e.g. <% 2 %>
		    var matches = group.textContent.match(regex);
		    // For each sub-placeholder
		    var rest = group;
		    matches.forEach(function (text, i) {
		      var start = rest.textContent.indexOf(text);
		      var remaining = rest.splitText(start);
		      rest = remaining.splitText(text.length);
		      // Grab the newly isolated placeholder
		      placeholders.push(remaining);
		    });
		  });
		  // Swap each placeholder with its corresponding element in the(elements Array
		  placeholders.forEach(function (placeholder) {
		    var pos = getPlaceholderId(placeholder);
		    swap(elements[pos], placeholder);
		  });
		};

		var escapeChars = {
		  '&': '&amp;',
		  '<': '&lt;',
		  '>': '&gt;',
		  "'": '&#39;',
		  '"': '&quot;'
		};

		var ESCAPE_REGEX = /[&<>'"]/g;
		var escape = function escape(s) {
		  return s.replace(ESCAPE_REGEX, function (m) {
		    return escapeChars[m];
		  });
		};

		exports.empty = empty;
		exports.getPlaceholderId = getPlaceholderId;
		exports.replaceElements = replaceElements;
		exports.moveChildren = moveChildren;
		exports.escape = escape;
		exports.tempElement = tempElement;

	/***/ },
	/* 3 */
	/***/ function(module, exports) {

		'use strict';

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		var PLACEHOLDER_REGEX = /<%([\s\S]+?)%>/g;
		var placeholderTemplate = function placeholderTemplate(id) {
		  return '<% ' + id + ' %>';
		};

		var HTML_WHITESPACE_REGEX = /(^\s+|\>[\s]+\<|\s+$)/g;
		var htmlWhitespaceReplace = function htmlWhitespaceReplace(str) {
		  return str.indexOf('>') === 0 ? '><' : '';
		};

		exports.PLACEHOLDER_REGEX = PLACEHOLDER_REGEX;
		exports.placeholderTemplate = placeholderTemplate;
		exports.HTML_WHITESPACE_REGEX = HTML_WHITESPACE_REGEX;
		exports.htmlWhitespaceReplace = htmlWhitespaceReplace;

	/***/ }
	/******/ ])
	});
	;

/***/ }
/******/ ])
});
;