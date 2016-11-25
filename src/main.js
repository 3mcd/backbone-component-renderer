import {
  empty,
  findTextNodes,
  flatten,
  getPlaceholderId,
  injectElements,
  interleave,
  moveChildren,
  placeholderTemplate,
  rMap,
  swap,
  tempElement
} from './utils';

import { PLACEHOLDER_REGEX, PLACEHOLDER_TEMPLATE } from './const';

const config = {
  backbone: window.Backbone
};

const toEl = (c) => isBackboneView(c) ? c.el : c;
const isChunk = (c) => chunks.has(c);
const isBackboneView = (c) => c instanceof config.backbone.View;
const isNode = (c) => c instanceof Node;
const isArray = (c) => Array.isArray(c);
const isComponent = (c) => isBackboneView(c) || isNode(c) || isChunk(c);
const removePlaceholders = (c, regex) => typeof c === 'string' ? c.replace(PLACEHOLDER_REGEX, '') : c;

const chunks = new WeakSet();

// Recursively tear down child views and chunks
const teardown = (function () {
  const childMap = new WeakMap();
  return (context, nextChildren) => {
    const children = childMap.get(context);
    if (children) {
      cleanup(children);
    }
    childMap.set(context, nextChildren);
  };
})();

const cleanup = (child) => {
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

const normalizeSegments = (segments, expressions) => flatten(interleave(segments, expressions).map(removePlaceholders));

const renderBackboneViews = (c) => {
  if (isArray(c)) {
    c.forEach(renderBackboneViews);
  } else if (isChunk(c)) {
    c.children.forEach(renderBackboneViews);
  } else if (isBackboneView(c)) {
    c.render();
  }
};

const renderChunkToElement = (chunk, el) => {
  const { html, children } = chunk;
  // Create an element with the child content of the view.
  const temp = substitute(children, html, PLACEHOLDER_REGEX);
  // Empty the view element.
  empty(el);
  // Move new elements from temp to view element.
  moveChildren(temp, el);
};

const substitute = (children, html, PLACEHOLDER_REGEX) => {
  const chunked = children.map(child => {
    if (chunks.has(child)) {
      return [...substitute(child.children, child.html, PLACEHOLDER_REGEX).childNodes];
    }
    return child;
  });
  // Recursively map all Backbone Views to DOM elements
  const elements = rMap(chunked, toEl);
  // Build DOM.
  const temp = injectElements(tempElement(html), elements, PLACEHOLDER_REGEX);
  return temp;
};

const makeTagFn = (view) => function renderer(segments, ...expressions) {
  const ch = isChunk(segments) ? segments : chunk(...arguments);
  // Clean up all of the Backbone view's children.
  teardown(view, ch.children);
  // Recursively render all Backbone Views in chunk.
  renderBackboneViews(ch);
  // Render the chunk to the view's element.
  renderChunkToElement(ch, view.el);
  return ch;
};

/**
 * Public API
 */

const chunk = function chunk(segments, ...expressions) {
  var i = 0;
  var html = '';
  const children = [];
  const handleComponent = c => {
    if (isComponent(c)) {
      children.push(c);
      c = PLACEHOLDER_TEMPLATE(i++);
    }
    html += c;
  };
  if (!isArray(segments)) {
    handleComponent(segments);
  } else {
    normalizeSegments(segments, expressions).forEach(handleComponent);
  }
  const ch = { children, html };
  chunks.add(ch);
  return ch;
};

// Can be used as a template tag or a function
const componentRenderer = function componentRenderer(view) {
  // Return the tagging function
  return makeTagFn(view);
};

const configureRenderer = function configureRenderer(options) {
  config.backbone = options.backbone || config.backbone;
};

export {
  chunk,
  componentRenderer,
  configureRenderer
};