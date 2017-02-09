import { createRenderer } from 'lit-js';

const config = {
  Backbone: window.Backbone,
  warn: true,
  rendererProp: null
};

const isView = (obj) => obj instanceof config.Backbone.View;
const isViewCtor = (obj) => obj.prototype instanceof config.Backbone.View;
const isJQuery = (obj) => obj instanceof config.Backbone.$ || ('jQuery' in window && obj instanceof jQuery);

var lit = createRenderer({
  parse(component) {
    var view = false;
    if (isView(component)) {
      view = component;
    } else if (isViewCtor(component)) {
      if (config.warn) {
        console.warn('backbone-component-renderer: A constructor inheriting from Backbone.View was used inside of a template expression. You could be mixing your use of the "new" keyword with this shorthand. Use a factory function to omit "new" completely.');
      }
      view = new component();
    }
    if (view) {
      // Assign renderer to view instance.
      if (config.rendererProp) {
        view[config.rendererProp] = _createRenderer(view);
      }
    } else if (isJQuery(component)) {
      view = component;
    }
    return view;
  },
  render(view) {
    if (isView(view)) {
      view.render();
      return view.el;
    }
    // View is a jQuery object.
    return [...view];
  },
  destroy(view) {
    if (isView(view)) {
      view.remove();
    } else {
      // View is a jQuery object.
      view.detach();
    }
  }
});

const { chunk, componentRenderer } = lit;

/**
 * Public API
 */

const _createRenderer = (view) => componentRenderer(view.el);

const mount = (view, el) => {
  if (isJQuery(el)) {
    el = el[0];
  }
  componentRenderer(el)(view);
};

const configureRenderer = (options) => {
  const { Backbone, jQuery, warn, rendererProp } = options;
  
  config.Backbone = options.Backbone || config.Backbone;
  config.jQuery = options.jQuery || config.jQuery;

  if (warn != void(0)) {
    config.warn = options.warn;
  }

  if (typeof rendererProp === 'string') {
    config.rendererProp = rendererProp;
  }
};

const factory = (Ctor) => {
  const fn = function (...args) {
    return new Ctor(...args);
  };

  Object.assign(fn, Ctor);

  return fn;
};

export {
  chunk,
  _createRenderer as createRenderer,
  configureRenderer,
  mount,
  factory
};