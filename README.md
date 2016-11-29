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
        	${Articles({ collection, filter })}
        </main>
    `;
}
```

### Why?

Backbone render functions are often full of child view instantiation and associated rendering and appending. In addition, you'll need to create placeholder elements if you want to append child views to specific parts of a layout, adding additional complexity to your application's HTML structure.

`backbone-component-renderer` allows you to write nested Backbone view structures in a more declarative way, without placeholder elements or verbose `render()` calls.

There is no inheritance or other overarching pattern you have to subscribe to because the library is mainly comprised of a [template literal tag function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_template_literals) to build view hierarchies. You can implement it incrementally in larger projects, and it has a very small file size.

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

The quickest way to start is to create one of these functions with `createRenderer` each time you render a view. This function can take a variety of parameters, but the simplest way to use it is as a (template literal tagging function)[tagging template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_template_literals):

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

`renderer` can also be used as a regular function. You can pass it strings and other primitives, DOM elements, `Backbone.View` instances, arrays, and chunks (discussed below):

```js
this.renderer(new BattleView());
this.renderer(['What', new TotallyRadView(), 'whatwhatwhat']);
```

However, you cannot pass a template literal into the tag form of `renderer` and expect the child content to be set up properly, because the expression is evaluated before being passed in:

```js
this.renderer(`
	<ul>${people.map(model => new PersonView({ model }))}></ul>
`);
// <ul>[object Object], [object Object]...</ul>
```

HTML characters in  strings are automatically escaped if used in template literal expressions or passed directly into the `renderer` function:

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

`chunk` can get kind of ugly in more complex templates, so it's is best hidden behind helper functions. Here's an example of a `wrap` function that takes a Backbone view and a tag name. The function returns a chunk with the view surrounded by the specified element:

```js
const wrap = (v, tag) => chunk`<${tag}>${v}</${tag}>`;
const li = (v) => wrap(v, 'li');
// ...
renderer`
	<h3>Employees</h3>
	<ul>${people.map(v => li(new PersonItem(...)))}></ul>
`;
```

Templates passed into `chunk` or `renderer` do not need to have a common ancestor:

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

#### Utilities

##### `factory(ctor)`

The library exports a function called `factory` that can help reduce the complexity of your templates even further. `factory` takes a constructor function and returns new instances of the constructor when invoked. In this way, you can remove the `new` keyword from your templates completely.

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

##### `mount(app, el)`

`mount` will render a component with `renderer` to a DOM element. This is especially useful with the `rendererProp` config option, because all views and sub-views of the call will be assigned a `renderer` instance without adding or modifying a base view.

```js
const el = document.getElementById('app');
const app = new App();
mount(app, el);
```