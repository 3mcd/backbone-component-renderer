import {
  interleave,
  placeholderTemplate,
  getPlaceholderId,
  swap,
  empty,
  moveChildren,
  findTextNodes,
  substitutePlaceholders
} from './utils';

import { PLACEHOLDER_REGEX, PLACEHOLDER_TEMPLATE } from './const';

const config = {
  Backbone: window.Backbone
};

// Id counters for each view's render cycle.
const idMap = new WeakMap();
// Child view storage.
const childMap = new WeakMap();

// Convert a component into a string. If the component is a Backbone View or
// DOM Node, create a placeholder for the element to be replaced with later.
const parseComponent = (component, parentView) => {
  if (Array.isArray(component)) {
    return component.map(e => parseComponent(e, parentView)).join('');
  }
  if (component instanceof config.Backbone.View) {
    // Render the Backbone.View instance automatically.
    component.render();
  } else if (!(component instanceof Node)) {
    // If the component is anything other than a Node, we just toString it.
    return component;
  }
  // Generate a placeholder for the view or Node for this render cycle.
  const id = idMap.get(parentView) + 1;
  idMap.set(parentView, id);
  return PLACEHOLDER_TEMPLATE(id);
};

// Recursively tear down child views, calling remove method for cleanup.
const teardown = (parentView) => {
  const childViews = childMap.get(parentView);
  idMap.set(parentView, 0);
  childViews.forEach((view) => {
    if (view instanceof config.Backbone.View) {
      teardown(view);
      view.remove();
    }
  });
  childViews.clear();
};

const createPresenterTemplate = (view, components) => {
  return components.map(c => parseComponent(c, view)).reduce((a, c) => a + c);
};

const getChildViews = (view, components) => {
  var childViews = [];
  components.forEach(s => {
    if (Array.isArray(s)) {
      childViews = [...childViews, ...getChildViews(view, s)];
    } else if (s instanceof config.Backbone.View || s instanceof Node) {
      childViews.push(s);
    }
  });
  return childViews;
};

const makeTagFn = (view) => function bbTagFn(segments, ...expressions) {
  var childViews = childMap.get(view);
  if (!Array.isArray(segments)) {
    segments = [segments];
  }
  const components = interleave(segments, expressions).map(
    c => typeof c === 'string' ? c.replace(PLACEHOLDER_REGEX, '') : c
  );
  // Clean up child views
  teardown(view);
  // Update childViews from newly passed components
  childViews = new Set(getChildViews(view, components));
  childMap.set(view, childViews);
  // Get a template string w/ placeholders
  const html = createPresenterTemplate(view, components);
  // Update view's innerHTML with the template string
  // Substitute placeholders with child view elements
  const childViewArr = [...childViews];
  const childViewEls = childViewArr.map(v => v instanceof config.Backbone.View ? v.el : v);
  const tempEl = substitutePlaceholders(childViewEls, html, PLACEHOLDER_REGEX);
  // Empty the view element
  empty(view.el);
  // Move new elements from tempEl to view element
  moveChildren(tempEl, view.el);
  return childViewArr;
};

// Can be used as a template tag or a function.
const presenter = function presenter(view) {
  childMap.set(view, new Set());
  // Return the tagging function.
  return makeTagFn(view);
};

const configurePresenter = function configurePresenter(options) {
  config.Backbone = options.Backbone || Backbone;
};

export { presenter, configurePresenter };