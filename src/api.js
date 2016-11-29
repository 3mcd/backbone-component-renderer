import { createRenderer } from 'lit-js';

const config = {
  Backbone: window.Backbone,
  warn: true,
  rendererProp: null
};

var lit = createRenderer({
  parse(component) {
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
  render(view) {
    view.render();
    return view.el;
  },
  destroy(view) {
    view.remove();
  }
});

/**
 * Public API
 */

const chunk = lit.chunk;
const _createRenderer = (view) => lit.componentRenderer(view.el);
const mount = (view, el) => lit.componentRenderer(el)(view);
const configureRenderer = (options) => {
  const { Backbone, warn, rendererProp } = options;
  config.Backbone = options.Backbone || config.Backbone;
  if (warn != void(0)) {
    config.warn = options.warn;
  }
  if (typeof rendererProp === 'string') {
    config.rendererProp = rendererProp;
  }
};
const factory = (Ctor) => (...args) => new Ctor(...args);

export {
  chunk,
  _createRenderer as createRenderer,
  configureRenderer,
  mount,
  factory
};