const { componentRenderer, chunk, configureRenderer } = backboneComponentRenderer;

configureRenderer({ backbone: window.Backbone });

const View = Backbone.View.extend({
  initialize() {
    this.renderer = componentRenderer(this);
    _.bindAll(this, 'renderer');
  },
  remove() {
    Backbone.View.prototype.remove.call(this);
  }
});

const Link = View.extend({
  tagName: 'a',
  initialize(options) {
    this.url = options.url;
    this.text = options.text;
    View.prototype.initialize.call(this);
  },
  render() {
    const { url, text } = this;
    this.el.href = url;
    // Render any value directly:
    this.renderer(text);
  },
  remove() {
    console.log('Child view removed.');
    View.prototype.remove.call(this);
  }
});

const Nav = View.extend({
  tagName: 'nav',
  links: [
    { url: '#/home', text: 'Home' },
    { url: '#/about', text: 'About' }
  ],
  render() {
    // Embed iterables that can contain any value (chunk in this example):
    this.renderer`
      <ul>${ this.links.map(l => chunk`<li>${new Link(l)}</li>`) }</ul>
    `;
  }
});

const UserInfo = View.extend({
  className: 'UserInfo',
  render() {
    const { name, age } = this.model.toJSON();
    this.renderer`
      <dl>
        <dt>Name</dt>
        <dd>${name}</dd>
        <dt>Age</dt>
        <dd>${age}</dd>
      </dl>
    `;
  }
});

const Header = View.extend({
  tagName: 'header',
  render() {
    const { links } = this;
    this.renderer`
      ${new Nav()}
    `;
  }
});

const Footer = View.extend({
  tagName: 'footer',
  render() {
    const { links } = this;
    this.renderer`
      ${new Nav}
      <p>Have a nice day.</p>
    `;
  }
});

const App = View.extend({
  className: 'App',
  render() {
    const { links, collection } = this;
    // Views that render multiple children:
    this.renderer`
      ${new Header}
      <main>
        <h2>Backbone Component Renderer</h2>
        <p>Renderer is a really bad word, isn't it?</p>
        ${collection.map(model => new UserInfo({ model }))}
      </main>
      ${new Footer}
    `;
  }
});

const users = new Backbone.Collection([
  { name: 'Walt', age: 50 },
  { name: 'Hank', age: 43 },
  { name: 'Jessie', age: 25 }
]);

const app = new App({ collection: users });

app.render();

document.body.appendChild(app.el);
window.app = app;