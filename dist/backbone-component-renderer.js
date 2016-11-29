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
	exports.factory = exports.mount = exports.configureRenderer = exports.createRenderer = exports.chunk = undefined;

	var _litJs = __webpack_require__(1);

	var config = {
	  Backbone: window.Backbone,
	  warn: true,
	  rendererProp: null
	};

	var lit = (0, _litJs.createRenderer)({
	  parse: function parse(component) {
	    var view;
	    if (component instanceof config.Backbone.View) {
	      view = component;
	    } else if (component.prototype instanceof config.Backbone.View) {
	      if (config.warn) {
	        console.warn('backbone-component-renderer: A constructor inheriting from Backbone.View was used inside of a template expression. You could be mixing your use of the "new" keyword with this shorthand. Use a factory function to omit "new" completely.');
	      }
	      view = new component();
	    }
	    if (view) {
	      if (config.rendererProp) {
	        view[config.rendererProp] = _createRenderer(view);
	      }
	      return view;
	    }
	    return false;
	  },
	  render: function render(view) {
	    view.render();
	    return view.el;
	  },
	  destroy: function destroy(view) {
	    view.remove();
	  }
	});

	/**
	 * Public API
	 */

	var chunk = lit.chunk;
	var _createRenderer = function _createRenderer(view) {
	  return lit.componentRenderer(view.el);
	};
	var mount = function mount(view, el) {
	  return lit.componentRenderer(el)(view);
	};
	var configureRenderer = function configureRenderer(options) {
	  var Backbone = options.Backbone,
	      warn = options.warn,
	      rendererProp = options.rendererProp;

	  config.Backbone = options.Backbone || config.Backbone;
	  if (warn != void 0) {
	    config.warn = options.warn;
	  }
	  if (typeof rendererProp === 'string') {
	    config.rendererProp = rendererProp;
	  }
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
	exports.createRenderer = _createRenderer;
	exports.configureRenderer = configureRenderer;
	exports.mount = mount;
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

		var _dom = __webpack_require__(3);

		var _const = __webpack_require__(4);

		var $VALUE_REJECTED = Symbol('rejected');

		var warn = function warn(msg) {
		  return console.warn(_const.ERROR_PREFIX, msg);
		};

		var warnings = {
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
		var isObject = function isObject(c) {
		  return (typeof c === 'undefined' ? 'undefined' : _typeof(c)) === 'object' && !isArray(c);
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
		  var view = componentMap.get(child);
		  if (view) {
		    destroy(view);
		    componentMap.delete(child);
		  }
		  if (isNode(child)) {
		    teardown(child, destroy);
		    return;
		  }
		  if (isChunk(child)) {
		    child.components.forEach(function (c) {
		      return cleanup(c, destroy);
		    });
		  }
		};

		var renderChunkToElement = function renderChunkToElement(chunk, el) {
		  var ch = flattenChunk(chunk);
		  var tt = (0, _dom.tempElement)(ch.html);
		  (0, _dom.replaceElements)(tt, ch.components);
		  (0, _dom.emptyNode)(el);
		  (0, _dom.moveChildNodes)(tt, el);
		};

		var placeholderRegex = new RegExp(_const.PLACEHOLDER_HTML, 'g');

		var flattenChunk = function flattenChunk(chunk) {
		  var i = 0;
		  var newChunk = { components: [] };
		  newChunk.html = chunk.html.replace(placeholderRegex, function (match) {
		    var c = chunk.components[i++];
		    if (isChunk(c)) {
		      var flat = flattenChunk(c);
		      newChunk.components = newChunk.components.concat(flat.components);
		      return flat.html;
		    } else {
		      newChunk.components.push(c);
		    }
		    return match;
		  });
		  return newChunk;
		};

		var _createRenderer = function _createRenderer(config) {
		  var parse = config.parse,
		      render = config.render,
		      destroy = config.destroy;


		  var componentRenderer = function componentRenderer(el) {
		    return function renderer(segments) {
		      for (var _len = arguments.length, expressions = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
		        expressions[_key - 1] = arguments[_key];
		      }

		      teardown(el, destroy);
		      var ch = isChunk(segments) ? segments : chunk.apply(undefined, arguments);
		      // Remove all child components and store the incoming ones.
		      childMap.set(el, ch);
		      // Render the chunk to the el.
		      renderChunkToElement(ch, el);
		      return ch;
		    };
		  };

		  var createChunk = function createChunk(segments) {
		    var html = '';
		    var components = [];
		    var asTag = !!segments.raw;

		    if (!isArray(segments)) {
		      segments = [segments];
		    }

		    if (asTag) {
		      html += segments[0];
		    }

		    for (var i = asTag ? 1 : 0, len = segments.length; i < len; i++) {
		      var seg = segments[i];
		      var exp = asTag ? arguments.length <= i - 1 + 1 ? undefined : arguments[i - 1 + 1] : seg;
		      if (!asTag && isString(seg)) {
		        html += (0, _utils.escape)(seg);
		        continue;
		      }
		      var parsed = parseExpressions(exp);
		      for (var _i = 0, _len2 = parsed.length; _i < _len2; _i++) {
		        var c = parsed[_i];
		        if (isString(c)) {
		          html += (0, _utils.escape)(c);
		        } else {
		          components.push(c);
		          html += _const.PLACEHOLDER_HTML;
		        }
		      }
		      if (asTag) {
		        html += seg;
		      }
		    }

		    return { components: components, html: html };
		  };

		  var chunk = function chunk(segments) {
		    for (var _len3 = arguments.length, expressions = Array(_len3 > 1 ? _len3 - 1 : 0), _key2 = 1; _key2 < _len3; _key2++) {
		      expressions[_key2 - 1] = arguments[_key2];
		    }

		    var ch = createChunk.apply(undefined, arguments);
		    chunks.add(ch);
		    return ch;
		  };

		  var tryParse = function tryParse(exp) {
		    var parsed = parse(exp);
		    // If the parse() function returns a falsey value, the component must not
		    // be a view.
		    if (!parsed) {
		      return exp;
		    }
		    // View library might organize views as arrays.
		    if (!isObject(parsed)) {
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
		    if (isObject(el)) {
		      componentMap.set(el, parsed);
		    }
		    return el;
		  };

		  var parseExpression = function parseExpression(exp) {
		    // Ignore null/undefined.
		    if (exp == void 0) {
		      return $VALUE_REJECTED;
		    }
		    if (isString(exp) || isChunk(exp)) {
		      return exp;
		    }
		    // Yield control to the end-user. Attempt to render the component if it is
		    // fact a view instance.
		    exp = tryParse(exp);
		    // If the component is still a function for whatever reason, execute it and
		    // set the component to the return value of the function.
		    if (isFunction(exp)) {
		      exp = tryParse(exp());
		    }
		    // The function could have potentially returned a chunk. Either way, Node
		    // instances and chunks are the last objects we will accept.
		    if (isChunk(exp) || isNode(exp)) {
		      return exp;
		    }
		    if (isArray(exp)) {
		      warn(warnings.EXP_ARRAY);
		      return $VALUE_REJECTED;
		    }
		    // Ignore all other objects.
		    if (isObject(exp)) {
		      warn(warnings.EXP_OBJECT);
		      return $VALUE_REJECTED;
		    }
		    // Stringify all other values.
		    exp = '' + exp;

		    return exp;
		  };

		  var parseExpressions = function parseExpressions(exp) {
		    var arr = [];
		    if (isArray(exp)) {
		      for (var i = 0, len = exp.length; i < len; i++) {
		        var c = parseExpression(exp[i]);
		        if (c !== $VALUE_REJECTED) {
		          arr.push(c);
		        }
		      }
		    } else {
		      var _c = parseExpression(exp);
		      if (_c !== $VALUE_REJECTED) {
		        arr.push(_c);
		      }
		    }
		    return arr;
		  };

		  return { componentRenderer: componentRenderer, chunk: chunk };
		};

		var createRenderer = function createRenderer() {
		  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

		  var config = (0, _utils.applyConfig)((0, _const.createDefaultConfig)(), options, _const.CONFIG_TYPES, _const.ERROR_PREFIX);
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

		var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

		var applyConfig = function applyConfig(config, next) {
		  var types = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
		  var errorPrefix = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

		  for (var prop in next) {
		    var type = types ? types[prop] : null;
		    var setting = next[prop];
		    if ((typeof setting === 'undefined' ? 'undefined' : _typeof(setting)) === 'object' && setting !== null) {
		      applyConfig(config[prop], setting, type);
		    } else {
		      if (!types || (type === 'string' ? (typeof setting === 'undefined' ? 'undefined' : _typeof(setting)) === type : setting instanceof type)) {
		        config[prop] = next[prop];
		      } else {
		        throw new TypeError(errorPrefix + 'Setting "' + prop + '" must be of type ' + (type instanceof Function ? type.name : type) + '.');
		      }
		    }
		  }
		  return config;
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

		exports.escape = escape;
		exports.applyConfig = applyConfig;

	/***/ },
	/* 3 */
	/***/ function(module, exports) {

		'use strict';

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});

		function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

		var getPlaceholderId = function getPlaceholderId(node) {
		  return Number(node.textContent.match(/[\w\.]+/)[0]);
		};

		var isMatch = function isMatch(str, regex) {
		  regex.lastIndex = 0;
		  return regex.test(str);
		};

		var swap = function swap(el, ref) {
		  var parent = ref.parentNode;
		  if (Array.isArray(el)) {
		    swap(el[0], ref);
		    for (var i = 1, len = el.length; i < len; i++) {
		      parent.insertBefore(el[i], el[i - 1].nextSibling);
		    }
		  } else {
		    parent.replaceChild(el, ref);
		  }
		};

		var emptyNode = function emptyNode(parent) {
		  while (parent.firstChild) {
		    parent.removeChild(parent.firstChild);
		  }
		};

		var moveChildNodes = function moveChildNodes(from, to) {
		  while (from.childNodes.length > 0) {
		    to.appendChild(from.childNodes[0]);
		  }
		};

		var tempElement = function tempElement(html) {
		  var el = document.createElement('span');
		  el.innerHTML = html || '';
		  return el;
		};

		var replaceElements = function replaceElements(el, elements, regex) {
		  var p = [].concat(_toConsumableArray(el.getElementsByClassName('__lit')));
		  for (var i = elements.length - 1; i >= 0; i--) {
		    swap(elements[i], p[i]);
		  }
		};

		exports.emptyNode = emptyNode;
		exports.tempElement = tempElement;
		exports.moveChildNodes = moveChildNodes;
		exports.replaceElements = replaceElements;

	/***/ },
	/* 4 */
	/***/ function(module, exports) {

		'use strict';

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		var ERROR_PREFIX = 'litjs: ';

		var CONFIG_TYPES = {
		  parse: Function,
		  render: Function,
		  destroy: Function
		};

		var createDefaultConfig = function createDefaultConfig() {
		  return {
		    parse: function parse(view) {
		      return view;
		    },
		    render: function render(view) {
		      return view;
		    },
		    destroy: function destroy(view) {
		      return view.parentElement.removeChild(view);
		    }
		  };
		};

		var PLACEHOLDER_HTML = '<span class="__lit"></span>';

		var HTML_WHITESPACE_REGEX = /(^\s+|\>[\s]+\<|\s+$)/g;
		var htmlWhitespaceReplace = function htmlWhitespaceReplace(str) {
		  return str.indexOf('>') === 0 ? '><' : '';
		};

		exports.CONFIG_TYPES = CONFIG_TYPES;
		exports.ERROR_PREFIX = ERROR_PREFIX;
		exports.HTML_WHITESPACE_REGEX = HTML_WHITESPACE_REGEX;
		exports.PLACEHOLDER_HTML = PLACEHOLDER_HTML;
		exports.htmlWhitespaceReplace = htmlWhitespaceReplace;
		exports.createDefaultConfig = createDefaultConfig;

	/***/ }
	/******/ ])
	});
	;

/***/ }
/******/ ])
});
;