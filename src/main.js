import {
  empty,
  findTextNodes,
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

const toEl = (c) => isView(c) ? c.el : c;
const isView = (c) => c instanceof config.backbone.View;
const isNode = (c) => c instanceof Node;
const isArray = (c) => Array.isArray(c);
const removePlaceholders = (c, regex) => typeof c === 'string' ? c.replace(PLACEHOLDER_REGEX, '') : c;

const childMap = new WeakMap();
const chunks = new WeakSet();
const idMap = new WeakMap();

// Convert a component into a string. // If the component is a Backbone view,
// render it. If the component is a Backbone view or DOM Node, create a
// placeholder for the element to be replaced with later
const parseComponent = (component, context) => {
  if (isArray(component)) {
    return component.map(e => parseComponent(e, context)).join('');
  }
  if (isView(component)) {
    // Render the Backbone.View instance automatically
    component.render();
  } else if (!isNode(component) && !chunks.has(component)) {
    // If the component is anything other than a Node, we just toString it
    return component;
  }
  // Generate a placeholder for the view or Node for this render cycle
  const id = (idMap.get(context) || 0) + 1;
  idMap.set(context, id);
  return PLACEHOLDER_TEMPLATE(id);
};

// Recursively tear down child views and chunks
const teardown = (context) => {
  const children = childMap.get(context);
  // Reset id counter for next render
  idMap.delete(context);
  if (children) {
    cleanup(children);
  }
};

const cleanup = (child) => {
  if (isArray(child)) {
    child.forEach(cleanup);
  } else if (isView(child)) {
    // Remove the view
    child.remove();
    // Ensure we clean up any child views of the view
    teardown(child);
  } else if (chunks.has(child)) {
    cleanup(child.children);
  }
};

const createPlaceholderTemplate = (components, context) => {
  return components.map(c => parseComponent(c, context)).reduce((a, c) => a + c);
};

const getChildren = (components) => {
  return components.reduce((a, c) => {
    if (isArray(c)) {
      return a.concat(getChildren(c));
    }
    if (isView(c) || c instanceof Node || chunks.has(c)) {
      a.push(c);
    }
    return a;
  }, []);
};

const _chunk = (context = {}) => function chunk(segments, ...expressions) {
  if (!isArray(segments)) {
    segments = [segments];
  }
  const components = interleave(segments, expressions).map(removePlaceholders);
  const c = {
    children: getChildren(components),
    html: createPlaceholderTemplate(components, context)
  };
  chunks.add(c);
  return c;
};

const makeTagFn = (view) => function componentRendererTagFn(segments, ...expressions) {
  teardown(view);
  const chunk = chunks.has(segments) ? segments : _chunk(view)(...arguments);
  childMap.set(view, chunk.children);
  renderChunk(chunk, view.el)
  return chunk;
};

const renderChunk = (chunk, el) => {
  const { html, children } = chunk;
  const temp = substitute(children, html, PLACEHOLDER_REGEX);
  // Empty the view element
  empty(el);
  // Move new elements from temp to view element
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

/**
 * Public API
 */

const chunk = function chunk(...args) {
  return _chunk()(...args);
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