## backbone-component-renderer

```js
render() {
	const { filter, onSearch } = this;
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
        	${Articles({ collection: this.collection, filter })}
        </main>
    `;
}
```

### Why?

Often times Backbone render functions are full of child view instantiation and associated rendering and appending. In addition, you'll need to create placeholder elements if you want to append child views to specific parts of a layout, adding additional complexity to your application's HTML structure.

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

The library uses `Backbone.View` for type checking. It will first attempt to find it on `window`. If you are using a module loader or Backbone is otherwise not on the global object, use `configureRenderer` to pass your instance of Backbone in:

```js
import Backbone from 'backbone';
import { componentRenderer, configureRenderer } from 'backbone-component-renderer';

configureRenderer({ backbone: Backbone });
```

### Usage

The main function you need to get up and running is `componentRenderer`. This function takes a `Backbone.View` instance and returns a new function for use in [tagging template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_template_literals). The function returned by `componentRenderer` will be referred to as `renderer` for the remainder of the readme.

The quickest way to start is to create a new `renderer` each time you render a view. You won't lose much in the way of performance, and won't have to modify your inheritance chain:

```js
render() {
	componentRenderer(this)`
		<header>...</header>
		<main class="Page">${this.activePage}</main>
	`;
}
```

If you prefer, you can add a renderer per view instance to a base view. e.g:

```js
const BaseView = View.extend({
	initialize() {
		this.renderer = componentRenderer(this);
	}
})
```

Backbone views passed into `renderer` will be rendered immediately. Their elements will be inserted into the position of the original expression as soon as the template is compiled. In addition, the library will manage any child views it creates internally. If a view is re-rendered, the `remove` function on each descendant view will be called automatically.

**e.g. Nesting components:**

```js
const Nutrition = ...
const FoodItem = BaseView.extend({
	render() {
		const { name, description, nutrition } = this.model.toJSON();
		this.renderer`
			<h4>${name}</h4>
			<p>${description}</p>
			Nutrition: ${new Nutrition({ nutrition })}
		`;
	}
});
const Menu = BaseView.extend({
	render() {
		this.renderer`
			<h3>Our Menu:</h3>
			${this.collection.map(model => new FoodItem({ model }))}
		`;
	}
})
```

You can also call `renderer` as a regular function, and pass it strings and other primitives, DOM elements, `Backbone.View` instances, and even chunks (discussed below):

```js
this.renderer(new BattleView());
this.renderer(['What', new TotallyRadView(), 'whatwhatwhat']);
```

However, you cannot pass a template literal into the tag form of `renderer` and expect the child content to be set up properly, because the expression is evaluated before being passed in:

```js
this.renderer(`
	<ul>${people.map(li)}></ul>
`);
// <ul>[object Object], [object Object]...</ul>
```

#### Chunks

Imagine that you have a collection of models representing people. For each person, you want to create a list item with a `PersonItem` view inside. How would you accomplish that using `renderer`?

This problem is easy to fix with JSX because we aren't working with strings:

```js
{people.map(p => <li><PersonItem ... /></li>)}
```

If you tried to do something like that with `backbone-component-renderer`, you'd get a bug:

```js
`${people.map(p => '<li>' + new PersonItem(...) + '</li>')}` // --> <li>[object Object]</li><li>[object Object]...
```

In order to solve this problem, the library provides another template literal tagging function called `chunk` that will create a sub-template. You can then embed the result in a call to `renderer`, or even other chunks.

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

Templates passed into `chunk` do not need to have a common ancestor.

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

The library exports a function called `factory` that can help reduce the complexity of your templates even further. `factory` takes a constructor function and returns new instances of the constructor when invoked. In this way, you can remove the `new` keyword from your templates completely.

e.g. Using `factory()`

```js
const { componentRenderer, chunk, factory } = backboneComponentRenderer;

const Header = factory(View.extend({...}));
const Footer = factory(View.extend({...}));

const App = View.extend({
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

#### Accepted Types

`renderer` handles primitives, `Backbone.View` instances, `Node` instances, functions, chunks, and `Array` instances that can contain of all aformentioned values.

| Type                            | Behavior                                                             | Warn |
|---------------------------------|----------------------------------------------------------------------|------|
| `String` 					      | Inner HTML                                                           | N    |
| `Object`                        | Ignored                                                              | Y    |
| `Array`                         | Flattened, each value inserted immediately after the other in place. | N    |
| `Array<Array>`                  | Ignored                                                              | Y    |
| `Function`                      | Return value of function inserted in place.                          | N    |
| `Backbone.View`                 | Rendered, child node inserted in place.                              | N    |
| `fn.__proto__ == BB.View`       | New instance created, rendered, child node inserted in place.        | Y    |
| Chunk                           | Rendered in place.                                                   | N    |
| `Node`                          | Inserted in place.                                                   | N    |
| Other                           | `.toString()`                                                        | N    |

Notes:
* Deeply nested arrays are ignored.
* Any non-object value passed into the function forms of `chunk()` or `renderer()` will have their HTML-unsafe characters escaped. e.g:

	```js
	this.renderer('<div></div>'); // renders &lt;div&gt;&lt;/div&gt;
	```