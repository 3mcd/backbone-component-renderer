### backbone-component-renderer

This library enables you to turn your complex Backbone render functions from this:

```js
template() {
	return `
		<div class="Header-avatar"></div>
		<ul class="Header-links"></ul>
	`;
},
render() {
	this.$el.html(this.template());
	var avatarEl = this.$('.Header-avatar');
	var linksEl = this.$('.Header-links');
	var avatar = new Avatar();
	avatar.render();
	avatarEl.append(avatar.el);
	var links = this.links.map(link => new Link({ link }));
	links.forEach(link => {
		var li = $('<li/>');
		li.append(link.el);
		link.render();
		linksEl.append(link);
	});
}
```

into this:

```js
render() {
	var links = this.links.map(
		link => chunk`<li>${new Link({ link })}</li>`
	);
	this.componentRenderer`
		${new Avatar()}
		<ul>${links}</ul>
	`;
}
```

### Why?

Often times Backbone render functions are full of variable declarations, child view creation, rendering, and appending. In addition, you'll need to create placeholder elements if you want to append child views to specific parts of a layout, adding additional complexity to your HTML structure.

`backbone-component-renderer` allows you to write nested Backbone View structures in a more declarative way, without placeholder elements or verbose `render()` calls.

Best of all, there is no inheritance or other over-arching pattern you have to subscribe to. The library exports a function that is used in conjunction with ES6 template literals to set up child content, and it should fit in with any of your pre-existing views.

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

The main function you need to get up and running is `componentRenderer`. This function takes a `Backbone.View` instance and returns a new function for use in tagging template literals.

e.g. Give all views in your application a component renderer:

```js
const BaseView = View.extend({
	initialize() {
		this.componentRenderer = componentRenderer(this);
	}
})
```

Of course, inheritance is optional. You could call `componentRenderer` with a view instance every time you render:

```js
render() {
	componentRenderer(this)`<div class="App">${new ChildView}</div>`;
}
```

You can also call the tagging function as a regular function, and pass it strings, elements, Views, and even chunks (discussed below):

```js
this.componentRenderer(new MenuItem());
```

Backbone View instances passed into the `componentRenderer` will be rendered immediately. Their elements will be inserted into the position of the original expression as soon as the template is compiled.

#### Chunks

Imagine that you have a collection of people models. For each person, you want to create a list item with a `PersonItem` view inside. How would you accomplish that using the component renderer? Here are a couple of incorrect solutions:

```js
`<li>${people}</li>` // --> <li><div/><div/>...</li>
`${people.map(v => '<li>' + v + '</li>')}` // --> <li>[object Object]</li><li>[object Object]...
```

The library provides another template literal tagging function called `chunk` that will create a sub-template that you can then embed in a call to `componentRenderer`, or even other chunks.

```js
${people.map(v => chunk`<li>${v}</li>`)}
```

`chunk` can get kind of ugly in complex templates and is best hidden behind helper functions. Here is an example `wrap` function that takes a Backbone View and a tag name. The function returns a chunk with the view surrounded by the specified tag:

```js
const wrap = (v, tag) => chunk`<${tag}>${v}</${tag}>`;
const li = (v) => wrap(v, 'li');
...
componentRenderer`
	<h3>Employees</h3>
	<ul>${people.map(li)}></ul>
`;
```

#### Accepted Types

`componentRenderer` handles primitives, `Backbone.View` instances, `Node` instances, chunks, and `Array` instances that can contain of all aformentioned values.

```js
render() {
	this.componentRenderer`
		Normal text...<br />
		${[[[[['Really'], 'Dumb']]]]}<br />
		${19208312}<br />
		${[new FooterView, document.createElement('input')]}
	`;
}
```

### Performance

The component renderer will manage any child views it creates internally. If a view is re-rendered using the `componentRenderer` function, the `remove` function of all of that view's children will be called automatically. This also includes any Backbone Views that were created using the `chunk` function.