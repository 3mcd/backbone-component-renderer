import { chunk, makeTagFn, configureRenderer } from './renderer';

/**
 * Public API
 */

const componentRenderer = makeTagFn;

export {
  chunk,
  componentRenderer,
  configureRenderer
};