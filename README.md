## backbone-component-renderer

```js
render() {
	const { filter, onSearch, collection } = this;
    const links = this.links.map(
        link => chunk`<li>${ new Link({ link }) }</li>`
    );
    this.renderer`
    	<header>
	        <nav>
	            <ul>${links}</ul>
	        </nav>
	        ${Avatar}
	        ${SearchBar({ onSearch })}
        </header>
        <main>
        	${Articles({ collection })}
        </main>
    `;
}
```

### Why?

Backbone render functions are often full of child view instantiation, rendering, and appending. In addition, you need to create placeholder elements any time you want to append child views to specific parts of a layout, adding additional complexity to your application's HTML structure.

`backbone-component-renderer` allows you to write nested Backbone view structures in a more declarative way, without placeholder elements (for the most part) or verbose `render()` calls.

There is no inheritance or other overarching pattern you have to subscribe to because the library is mainly comprised of a [template literal tag function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_template_literals) to build view hierarchies. It can be implemented incrementally in larger projects, supports IE9 and later, and is relatively small (~20kb w/ comments, unminified).

__Disclaimer:__ This isn't a VDOM library, and template literals aren't JSX ([or are they?](https://github.com/trueadm/t7)). The syntax that `backbone-component-renderer` provides will make your Backbone render functions prettier, but you can still fall into the same traps that a Backbone app without this library might. Just because you can embed views provided by your router right next to static views and re-render the whole app doesn't mean you should.

### Setup

Installation: `npm i backbone-component-renderer -S`

The library is exported as a UMD module so it should work with your favorite module bundler:

```js
// ES2015 module
import { componentRenderer } from 'backbone-component-renderer';
// Node/CommonJS
const { componentRenderer } = require('backbone-component-renderer');
// Script tag
const { componentRenderer } = window.backboneComponentRenderer;
```

The library uses `Backbone.View` for type checking. If you're using a module loader or Backbone is otherwise not on `window`, use `configureRenderer` to pass your instance of Backbone in:

```js
import Backbone from 'backbone';
import { componentRenderer, configureRenderer } from 'backbone-component-renderer';

configureRenderer({ Backbone });
```

Other config options:
* `warn` (type: `Boolean`, default: `true`) - Enable or disable warnings.
* `rendererProp` (type: `String`, default `null`) - If set as a string, automatically add `renderer` functions to Backbone views on the property name specified.

### Usage

The main function you need to get up and running is `createRenderer`. This function takes a `Backbone.View` instance and returns a new function that you'll use to render your views.

The quickest way to start is to create one of these functions with `createRenderer` each time you render a view. This function can take a variety of parameters, but the simplest way to use it is as a template literal tagging function:

```js
render() {
	createRenderer(this)`
		<header>...</header>
		<main class="Home">${new HomeView()}</main>
	`;
}
```

You can add this function to every view instance via a base view. e.g:

```js
const BaseView = View.extend({
	initialize() {
		this.renderer = createRenderer(this);
	}
})
```

> Note: The function returned from `createRenderer` will be referred to as `renderer` for the remainder of this document.

Any expression that evaluates to a Backbone view inside the template will be rendered immediately, and its element will be inserted into the position of the original expression.

When a view is re-rendered with `renderer`, the library will automatically call `remove` on any child views it created previously.

#### Arrays

The library will also render arrays of views:

```js
const Menu = BaseView.extend({
	render() {
		this.renderer`
			<h3>Our Menu:</h3>
			${this.collection.map(model => new FoodItem({ model }))}
		`;
	}
})
```

#### jQuery

You can pass jQuery instances to `renderer`. Elements within a jQuery collection will be inserted in order as if they were in an array, e.g:

```js
const els = $('<div />').add($('<div />'));
componentRenderer(document.body)(els); // Renders <div></div><div></div>
```

jQuery elements inserted into a template will be [detached](https://api.jquery.com/detach/) but not [removed](https://api.jquery.com/remove/). This will allow you to maintain data and event handlers on elements created by jQuery between renders.

It would probably be better to use `View.events` in this example, but the point still stands:

```js
initialize() {
    this.$name = $('<input />').on(...);
    this.$age = $('<input />').on(...);
},
render() {
    const { $name, $age } = this;
    // $name and $age are the same jQuery instances. Each render, they are
    // detached but not removed, meaning their event handlers aren't removed.
    this.renderer`
        <label>Name: ${$name}</label>
        <label>Age: ${$age}</label>
        <button>Submit</button>
    `;
}
```

#### As a function

`renderer` can also be used as a regular function. You can pass it strings and other primitives, DOM elements, `Backbone.View` instances, arrays, jQuery collections and chunks (discussed below):

```js
this.renderer(new BattleView());
this.renderer(['What', new TotallyRadView(), 'whatwhatwhat']);
```

However, you can't pass a template literal into the tag form of `renderer` and expect the child content to be set up properly, because the expression is evaluated before being passed in:

```js
this.renderer(`
	<ul>${people.map(model => new PersonView({ model }))}></ul>
`);
// <ul>[object Object], [object Object]...</ul>
```

#### HTML safety

HTML characters in strings are automatically escaped if used in template literal expressions or passed directly into the `renderer` function:

```js
this.renderer(['<div>']);  // renders &lt;div&gt;
this.renderer`${'<div>'}`; // renders &lt;div&gt;
```

#### Chunks

Imagine that you have a collection of models representing people. For each person, you want to create a list item with a `PersonItem` view inside. How would you accomplish that using `renderer`?

This problem is easy to fix with JSX because we aren't working with strings:

```js
{people.map(p => <li><PersonItem ... /></li>)}
```

If you tried to do something like that with `renderer`, you'd get a bug:

```js
`${people.map(p => '<li>' + new PersonItem(...) + '</li>')}` // --> <li>[object Object]</li><li>[object Object]...
```

In order to solve this problem, the library provides another template literal tagging function called `chunk` that will create an object that can then be embedded in another template:

```js
${people.map(p => chunk`<li>${new PersonItem(...)}</li>`)}
```

`chunk` can get kind of ugly in more complex templates, so it's best hidden behind helper functions. Here's an example of a `wrap` function that takes a Backbone view and a tag name. The function returns a chunk with the view surrounded by the specified element:

```js
const wrap = (v, tag) => chunk`<${tag}>${v}</${tag}>`;
const li = (v) => wrap(v, 'li');
// ...
renderer`
	<h3>Employees</h3>
	<ul>${people.map(v => li(new PersonItem(...)))}></ul>
`;
```

Templates passed into `chunk` or `renderer` don't need to have a common ancestor:

```js
const dlGroup = (t, d) => chunk`
	<dt>${t}</dt>
	<dd>${d}</dd>
`;
const dl = (pairs) => chunk`<dl>${pairs.map(dlGroup)}</dl>`;
const benny = dl([
	['Name', 'Benny'],
	['Age', 15]
]);
```

### Utilities

The library exports a few functions to help reduce the complexity of your templates even further. 

#### `factory(ctor)`

`factory` takes a constructor function and returns new instances of the constructor when invoked. In this way, you can remove the `new` keyword from your templates completely.

e.g. Using `factory()`:

```js
const { componentRenderer, chunk, factory } = backboneComponentRenderer;

const Header = factory(View.extend({...}));
const Footer = factory(View.extend({...}));

const App = BaseView.extend({
	render() {
		const { user, page } = this;
		this.renderer`
			${Header({ user })}
			${page}
			${Footer}
		`;
	}
});
```

#### `mount(app, el)`

`mount` will render a component with `renderer` to a DOM element. This is especially useful with the `rendererProp` config option, because all views and sub-views of the call will be assigned a `renderer` instance without adding or modifying a base view.

e.g. Using `mount()` to render a root view to the document:

```js
const el = document.getElementById('app');
const app = new App();
mount(app, el);
```

### Regions

Re-rendering an entire view can be dangerous. Take the following example:

```js
render() {
    // Bad! Re-renders Header AND Footer
    this.renderer`
        ${Header}
        ${this.page}
        ${Footer}
    `;
},
show(view) {
    this.page = view;
    this.render();
}
```

Here we are rendering `Header` and `Footer` each time `show` is called. This is bad for performance and we'd lose any internal state that those views may have had. Instead, let's mount these views to a placeholder element:

```js
initialize() {
    this.page = $('<div />');
},
render() {
    this.renderer`
        ${Header}
        ${this.page}
        ${Footer}
    `;
},
show(view) {
    // Render the next view into the page element.
    mount(view, this.page);
}
```

There is one downside to this solution: we have introduced an additional element into our HTML heirarchy. But it's a small price to pay to not affect the state of other components that don't need to be re-rendered.

### License

The MIT License (MIT)
Copyright (c) 2016 Eric McDaniel

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.