import { expect } from 'chai';
import Backbone from './backbone.mock';
import { PLACEHOLDER_TEMPLATE } from '../src/const';
import { interleave } from '../src/utils';
import { chunk, componentRenderer, configureRenderer } from '../src/api';
import sinon from 'sinon/pkg/sinon';

configureRenderer({ backbone: Backbone });

const noop = () => false;
const addSpy = (obj, prop, fn) => obj[prop] = sinon.spy(fn instanceof Function ? fn : noop);
const runTestsWithMode = (tests, tag) => Object.keys(tests).forEach(t => it(t, () => tests[t](true)));

describe('API', () => {

  describe('chunk', () => {
    const tests = {
      'embeds primitive values as text content': (tag) => {
        var primitives = ['ABC', 123, true];
        primitives.forEach(x => {
          const ch = tag ? chunk`${x}` : chunk(x);
          expect(ch.html).to.equal(x.toString());
        });
      },
      'embeds single components': (tag) => {
        const child = new Backbone.View();
        const ch = tag ? chunk`${child}` : chunk(child);
        expect(ch.children[0]).to.equal(child);
      },
      'embeds an array of components': (tag) => {
        const components = [ new Backbone.View(), chunk('abc'), document.createElement('div'), chunk(123) ];
        const ch = tag ? chunk`${components}` : chunk(components);
        // Each component should be added to the chunk's children, in an identical order:
        expect(ch.children.length).to.equal(components.length);
        components.forEach((child, i) => expect(ch.children[i]).to.equal(child));
      },
      'embeds an array of components and primitives in the correct order': (tag) => {
        const components = [ new Backbone.View(), chunk('abc'), document.createElement('div'), chunk(123) ];
        const primitives = ['ABC', 123, false, 'DEF'];
        const children = interleave(primitives, components);
        const ch = tag ? chunk`${children}` : chunk(children);
        const placeholders = components.map((a, i) => PLACEHOLDER_TEMPLATE(i));
        // Each component should be preceded by any primitives before it, e.g. HTML content:
        placeholders.forEach((p, i) => {
          let prev = ch.html.slice(ch.html.indexOf(primitives[i]), ch.html.indexOf(p));
          expect(prev).to.equal(primitives[i].toString());
        });
      }
    };
    describe('as a tag', () => runTestsWithMode(tests, true));
    describe('as a function', () => runTestsWithMode(tests, false));
  });

  describe('renderer', () => {
    var app;
    var children;
    var nestedView;

    beforeEach(() => {
      app = new Backbone.View();
      children = [new Backbone.View(), new Backbone.View()];
      nestedView = new Backbone.View();
      // render() spies
      addSpy(nestedView, 'render');
      children.forEach((c, i) => addSpy(c, 'render'));
      addSpy(children[0], 'render', () => componentRenderer(children[0])(nestedView));
      // remove() spies
      addSpy(nestedView, 'remove');
      children.forEach((c, i) => addSpy(c, 'remove'));
    });

    const tests = {
      'generates and injects elements generated from template into Backbone view': (tag) => {
        tag ? componentRenderer(app)([chunk`<div>${children}</div>`]) : componentRenderer(app)`${chunk`<div>${children}</div>`}`;
        expect(app.el.children[0].children[0]).to.equal(children[0].el);
        expect(app.el.children[0].children[1]).to.equal(children[1].el);
      },
      'calls the render method of all descendant Backbone views': (tag) => {
        tag ? componentRenderer(app)(children) : componentRenderer(app)`${children}`;
        children.forEach(c => expect(c.render.called).to.be.true);
        expect(nestedView.render.called).to.be.true;
      },
      'calls the remove method of all descendant Backbone views upon subsequent executions': (tag) => {
        componentRenderer(app)`${children}`;
        tag ? componentRenderer(app)(children) : componentRenderer(app)`${children}`;
        children.forEach(c => expect(c.remove.called).to.be.true);
        expect(nestedView.remove.called).to.be.true;
      }
    };
    describe('as a tag', () => runTestsWithMode(tests, true));
    describe('as a function', () => runTestsWithMode(tests, false));
  });

});