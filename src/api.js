import { createRenderer } from 'lit-js';

/**
 * Public API
 */

const config = { backbone: window.Backbone };

const configureRenderer = (options) => {
  const { backbone } = options;
  config.backbone = options.backbone || config.backbone;
};

var lit = createRenderer({
  parse(view) {
    if (view instanceof config.backbone.View) {
      return view;
    } else if (view.prototype instanceof config.backbone.View) {
      return new view();
    }
  },
  render(view) {
    view.render();
    return view.el;
  },
  destroy(view) {
    view.remove();
  }
});

const chunk = lit.chunk;

const componentRenderer = (view) => {
  return lit.componentRenderer(view.el);
};

const factory = (Ctor) => (...args) => new Ctor(...args);

export {
  chunk,
  componentRenderer,
  configureRenderer,
  factory
};