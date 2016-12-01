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

		var _utils = __webpack_require__(2);

		var _types = __webpack_require__(3);

		var _chunk = __webpack_require__(6);

		var _dom = __webpack_require__(7);

		var _const = __webpack_require__(8);

		var _parser = __webpack_require__(9);

		var _parser2 = _interopRequireDefault(_parser);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		var warn = function warn(msg) {
		  return console.warn(_const.ERROR_PREFIX, msg);
		};

		var warnings = {
		  EXP_ARRAY: 'A deeply nested array was used inside of a template value. Adjust your template to remove redundant nesting of arrays.',
		  EXP_OBJECT: 'An object was used inside of a template value. Objects other than views, Nodes and and chunks are ignored.',
		  PARSED_NON_OBJECT: 'An array or value other than object was returned from parse(). parse() should return a view instance, usually an object. If you return an object other than a view instance, your views may not be disposed of correctly.'
		};

		// In theory, use of WeakMaps will prevent us from causing memory leaks.
		// Sometimes we will hold on to many nodes at a time, and those nodes may be
		// removed in functions outside of the library.

		var chunkMap = (0, _types.map)(); // <Node, Chunk>
		var viewMap = (0, _types.map)(); // <Component, View>

		/**
		 * Recursively destroy any objects we have associated with a DOM node.
		 * @param  {Node} node
		 * @param  {Function} destroy
		 * @return {void}
		 */
		var teardown = function teardown(node, destroy) {
		  var ch = chunkMap.get(node);
		  if (ch) {
		    chunkMap.delete(ch);
		    cleanup(ch, destroy);
		  }
		};

		/**
		 * Recursively remove the underlying views of DOM nodes, calling the supplied
		 * remove() method along the way.
		 * @param  {Component} c
		 * @param  {Function} destroy
		 * @return {void}
		 */
		var cleanup = function cleanup(c, destroy) {
		  // Since a view's render() can return a chunk or an array of elements that
		  // is then converted into a chunk, both chunks and nodes (aka components)
		  // can have an underlying view.
		  var view = viewMap.get(c);
		  // If the component had an underlying view, destroy it.
		  if (view) {
		    destroy(view);
		    viewMap.delete(c);
		  }
		  // Recurse into the chunk to attempt to clean up any child views.
		  // Base case: component wasn't a chunk or chunk has no child components. 
		  if ((0, _chunk.isChunk)(c)) {
		    for (var i = 0, len = c.components.length; i < len; i++) {
		      cleanup(c.components[i], destroy);
		    }
		    return;
		  }
		  // Component wasn't a chunk, it was a node. The node could have an underlying
		  // chunk. Recurse back into teardown to check if it has a chunk to attempt to
		  // further clean up descendant views.
		  // Base case: component is not a chunk.
		  teardown(c, destroy);
		};

		var _createRenderer = function _createRenderer(config) {
		  var parse = config.parse,
		      render = config.render,
		      destroy = config.destroy;


		  var chunk = function chunk(strings) {
		    for (var _len = arguments.length, values = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
		      values[_key - 1] = arguments[_key];
		    }

		    return (0, _chunk.compileChunk)(strings, values, getComponent);
		  };

		  var getComponent = function getComponent(val) {
		    var parsed = parse(val);
		    // If the parse() function returns a falsey value, the component must not
		    // be a view.
		    if (!parsed) {
		      return val;
		    }
		    // Supplied parse function returned a non-Object value.
		    if (!(0, _utils.isObject)(parsed)) {
		      warn(warnings.PARSED_NON_OBJECT);
		    }
		    // Render the view and return the element (or elements) therein. This
		    // would potentially trigger other calls to componentRenderer which would
		    // build up child content in a depth-first manner.
		    var node = render(parsed);
		    // Multiple elements can be returned from the render function. They are
		    // combined into a chunk. It is assumed that the parent view will clean
		    // them up with destroy() is called.
		    if ((0, _utils.isArray)(node)) {
		      node = chunk(node);
		    }
		    // Set the element (or chunk) to the View instance in viewMap. The
		    // viewMap is accessed in cleanup() to reconcile an element or chunk
		    // with its view.
		    if ((0, _utils.isObject)(node)) {
		      viewMap.set(node, parsed);
		    }
		    return node;
		  };

		  var componentRenderer = function componentRenderer(node) {
		    return function renderer(strings) {
		      teardown(node, destroy);

		      for (var _len2 = arguments.length, values = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
		        values[_key2 - 1] = arguments[_key2];
		      }

		      var ch = (0, _chunk.isChunk)(strings) ? strings : chunk.apply(undefined, [strings].concat(values));
		      // Remove all child components and store the incoming ones.
		      chunkMap.set(node, ch);
		      // Render the chunk to the node.
		      (0, _chunk.renderChunk)(ch, node);
		      return ch;
		    };
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

		var isArray = function isArray(obj) {
		  return Array.isArray(obj);
		};
		var isFunction = function isFunction(obj) {
		  return obj instanceof Function;
		};
		var isNode = function isNode(obj) {
		  return obj instanceof Node;
		};
		var isObject = function isObject(obj) {
		  return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && !isArray(obj);
		};
		var isString = function isString(obj) {
		  return typeof obj === 'string';
		};

		var htmlEscapeChars = {
		  '&': '&amp;',
		  '<': '&lt;',
		  '>': '&gt;',
		  "'": '&#39;',
		  '"': '&quot;'
		};

		var ESCAPE_REGEX = /[&<>'"]/g;
		var escapeHTML = function escapeHTML(s) {
		  return s.replace(ESCAPE_REGEX, function (m) {
		    return htmlEscapeChars[m];
		  });
		};

		exports.escapeHTML = escapeHTML;
		exports.applyConfig = applyConfig;
		exports.isArray = isArray;
		exports.isFunction = isFunction;
		exports.isNode = isNode;
		exports.isObject = isObject;
		exports.isString = isString;

	/***/ },
	/* 3 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.set = exports.map = undefined;

		var _map = __webpack_require__(4);

		var _map2 = _interopRequireDefault(_map);

		var _set = __webpack_require__(5);

		var _set2 = _interopRequireDefault(_set);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		exports.map = _map2.default;
		exports.set = _set2.default;

	/***/ },
	/* 4 */
	/***/ function(module, exports) {

		'use strict';

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		/**
		 * Create a WeakMap. Falls back to naive map implementation if WeakMap is
		 * unsupported.
		 * @return {WeakMap}
		 */
		var map = function map() {
		  if ('WeakMap' in window) {
		    return new WeakMap();
		  }
		  var keys = [];
		  var values = [];
		  var pos = function pos(obj) {
		    for (var i = 0, len = keys.length; i < len; i++) {
		      if (keys[i] === obj) {
		        return i;
		      }
		    }
		    return false;
		  };
		  var get = function get(obj) {
		    return values[pos(obj)];
		  };
		  var set = function set(obj, val) {
		    var i = pos(obj);
		    if (i) {
		      values[i] = val;
		    } else {
		      keys.push(obj);
		      values.push(obj);
		    }
		  };
		  var _delete = function _delete(obj) {
		    var i = pos(obj);
		    if (i) {
		      keys.splice(i, 1);
		      values.splice(i, 1);
		    }
		  };
		  return { get: get, set: set, delete: _delete };
		};

		exports.default = map;

	/***/ },
	/* 5 */
	/***/ function(module, exports) {

		'use strict';

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		/**
		 * Create a WeakSet. Falls back to naive set implementation if WeakSet is
		 * unsupported.
		 * @return {WeakSet}
		 */
		var set = function set() {
		  if ('WeakSet' in window) {
		    return new WeakSet();
		  }
		  var values = [];
		  var add = function add(obj) {
		    return !has(obj) ? values.push(obj) : false;
		  };
		  var has = function has(obj) {
		    return values.indexOf(obj) > -1;
		  };
		  var _delete = function _delete(obj) {
		    return has(obj) ? values.splice(values.indexOf(obj), 1)[0] : false;
		  };
		  return { add: add, has: has, delete: _delete };
		};

		exports.default = set;

	/***/ },
	/* 6 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.renderChunk = exports.compileChunk = exports.isChunk = exports.chunks = undefined;

		var _types = __webpack_require__(3);

		var _utils = __webpack_require__(2);

		var _dom = __webpack_require__(7);

		var _const = __webpack_require__(8);

		var _parser = __webpack_require__(9);

		var _parser2 = _interopRequireDefault(_parser);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		var chunks = (0, _types.set)(); // <Chunk>

		var isChunk = function isChunk(obj) {
		  return chunks.has(obj);
		};

		var compileChunk = function compileChunk(strings, values, getComponent) {
		  var html = '';
		  var components = [];
		  var asTag = !!strings.raw;

		  if (!(0, _utils.isArray)(strings)) {
		    strings = [strings];
		  }

		  if (asTag) {
		    html += strings[0];
		  }

		  for (var i = asTag ? 1 : 0, len = strings.length; i < len; i++) {
		    var str = strings[i];
		    var val = asTag ? values[i - 1] : str;
		    if (!asTag && (0, _utils.isString)(str)) {
		      html += (0, _utils.escapeHTML)(str);
		      continue;
		    }
		    var parsed = (0, _parser2.default)(val, getComponent);
		    for (var _i = 0, _len = parsed.length; _i < _len; _i++) {
		      var c = parsed[_i];
		      if ((0, _utils.isString)(c)) {
		        html += (0, _utils.escapeHTML)(c);
		      } else {
		        components.push(c);
		        html += _const.PLACEHOLDER_HTML;
		      }
		    }
		    if (asTag) {
		      html += str;
		    }
		  }

		  var ch = { components: components, html: html };

		  chunks.add(ch);

		  return ch;
		};

		/**
		 * Render a chunk to an Element.
		 * @param  {Chunk} chunk
		 * @param  {Element} el
		 * @return {void}
		 */
		var renderChunk = function renderChunk(chunk, el) {
		  // Flatten chunk in order to speed up compilation of the template.
		  var ch = flattenChunk(chunk);
		  var temp = (0, _dom.tempElement)(ch.html);
		  (0, _dom.replaceElements)(temp, ch.components);
		  (0, _dom.emptyNode)(el);
		  (0, _dom.moveChildNodes)(temp, el);
		};

		var placeholderRegex = new RegExp(_const.PLACEHOLDER_HTML, 'g');

		/**
		 * Create a new chunk that is the flattened version of a chunk. Any placeholder
		 * generated for a chunk will be swapped out by that chunk's html string.
		 *   html       -> All descendant template content recursively embedded in
		 *   components -> All descendant nodes in a flat array.
		 * @param  {Chunk} chunk
		 * @return {Chunk}
		 */
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

		exports.chunks = chunks;
		exports.isChunk = isChunk;
		exports.compileChunk = compileChunk;
		exports.renderChunk = renderChunk;

	/***/ },
	/* 7 */
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
		  var p = [].concat(_toConsumableArray(el.getElementsByTagName('litpl')));
		  for (var i = elements.length - 1; i >= 0; i--) {
		    swap(elements[i], p[i]);
		  }
		};

		exports.emptyNode = emptyNode;
		exports.tempElement = tempElement;
		exports.moveChildNodes = moveChildNodes;
		exports.replaceElements = replaceElements;

	/***/ },
	/* 8 */
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
		    parse: function parse(c) {
		      if (c.nodeType) {
		        return c;
		      }
		    },
		    render: function render(view) {
		      return view;
		    },
		    destroy: function destroy(view) {
		      view.parentElement.removeChild(view);
		    }
		  };
		};

		var PLACEHOLDER_HTML = '<litpl></litpl>';

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

	/***/ },
	/* 9 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});

		var _chunk = __webpack_require__(6);

		var _utils = __webpack_require__(2);

		var $VALUE_REJECTED = {};

		var parseValue = function parseValue(val, getComponent) {
		  // Ignore null/undefined.
		  if (val == void 0) {
		    return $VALUE_REJECTED;
		  }
		  if ((0, _utils.isString)(val) || (0, _chunk.isChunk)(val)) {
		    return val;
		  }
		  val = getComponent(val);
		  // If the component is still a function for whatever reason, execute it and
		  // set the component to the return value of the function.
		  if ((0, _utils.isFunction)(val)) {
		    val = getComponent(val());
		  }
		  // The function could have potentially returned a chunk. Either way, Node
		  // instances and chunks are the last objects we will accept.
		  if ((0, _chunk.isChunk)(val) || (0, _utils.isNode)(val)) {
		    return val;
		  }
		  if ((0, _utils.isArray)(val)) {
		    warn(warnings.EXP_ARRAY);
		    return $VALUE_REJECTED;
		  }
		  // Ignore all other objects.
		  if ((0, _utils.isObject)(val)) {
		    warn(warnings.EXP_OBJECT);
		    return $VALUE_REJECTED;
		  }
		  // Stringify all other values.
		  val = '' + val;

		  return val;
		};

		var parser = function parser(val, getComponent) {
		  var arr = [];
		  var tryParse = function tryParse(val) {
		    var c = parseValue(val, getComponent);
		    if (c !== $VALUE_REJECTED) {
		      arr.push(c);
		    }
		  };
		  if ((0, _utils.isArray)(val)) {
		    val.forEach(tryParse);
		  } else {
		    tryParse(val);
		  }
		  return arr;
		};

		exports.default = parser;

	/***/ }
	/******/ ])
	});
	;

/***/ }
/******/ ])
});
;