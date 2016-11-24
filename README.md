### backbone-presenter

This library enables you to turn your complex Backbone render functions from this:

```js
render() {
	var tpl = `
		<div class="Header-avatar"></div>
		<ul class="Header-links"></ul>
	`;
	this.$el.html(tpl);
	var avatarEl = this.el.querySelector('.Header-avatar');
	var linksEl = this.el.querySelector('.Header-links');
	var avatar = new Avatar();
	avatar.render();
	avatarEl.appendChild(avatar.el);
	var links = this.links.map(({ url, text }) => new Link({ url, text }));
	links.forEach(link => {
		link.render();
		linksEl.appendChild(link.el);
	});
}
```

into this:

```js
render() {
	var links = this.links.map(({ url, text }) => new Link({ url, text }));
	this.presenter`
		${new Avatar}
		<ul>${links}</ul>
	`;
}
```

Anyone who writes large Backbone applications should recognize that the first example isn't hyperbole. Often times BB render functions are full of variable declarations, child view instantiations, rendering and appending. This library takes care of most of that for you, and allows you to write nested Backbone structures similar to how you'd write JSX in a React application.

Best of all, there is no inheritance involved. The library simply exports a function that is used in conjunction with ES6 template literals to set up child content, so it should fit in with any of your pre-existing views.

### Setup

Installation: `npm i backbone-presenter -S`

The library is exported as a UMD module so it should work with your favorite module bundler.

```js
// ES2015 module
import { presenter } from 'backbone-presenter';
// Node/CommonJS
const { presenter } = require('backbone-presenter');
// Script tag
const presenter = window.backbonePresenter;
```

### Usage

The main function you need to get up and running is `presenter`. This function takes a `Backbone.View` instance and returns a new function for use in tagging template literals.

```js
const BaseView = View.extend({
	initialize() {
		this.presenter = presenter(this);
	}
})
```

Of course, inheritance is optional. You could simply call the `presenter` function with a view instance every time you render.

```js
render() {
	presenter(this)`<div class="App">${new ChildView}</div>`;
}
```

You can also call the tagging function as a regular function:

```js
this.presenter(new MenuItem);
```

#### Common patterns

A list of navigation links:

```js
render() {
	var links = this.links.map(({ url, text }) => new Link({ url, text }));
	this.presenter(links);
}
```

Multiple child views in an outer "Layout View":

```js
render() {
	const { presenter, links } = this;
	presenter`
		<header>
			${new Nav({ links })}
		</header>
		<main>
			${new Home}
		</main>
	`;
}
```

#### Accepted types

The tagging function handles primitives, `Backbone.View` instances, `Node` instances and `Array` instances that contain of all aformentioned values.

```js
render() {
	this.presenter`
		Normal text...<br />
		${'Interpolated string'}<br />
		${19208312}<br />
		${[new FooterView, document.createElement('input')]}
	`;
}
```

### Performance

Presenter will manage the child views it creates internally. If a view is re-rendered using the tag function, the child views' `remove()` method will be called automatically.