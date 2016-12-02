 const {
  configureRenderer,
  createRenderer,
  mount,
  chunk,
  factory
} = backboneComponentRenderer;

const { View, Collection } = Backbone;

configureRenderer({
  rendererProp: 'renderer'
});

const Link = factory(View.extend({
  tagName: 'a',
  initialize(options) {
    this.link = options.link;
    View.prototype.initialize.call(this);
  },
  render() {
    const { url, text } = this.link;
    this.el.href = url;
    // Render any value directly:
    this.renderer(text);
  }
}));

const Nav = factory(View.extend({
  className: 'Nav',
  tagName: 'nav',
  links: [
    { url: '#/home', text: 'Home' },
    { url: '#/about', text: 'About' }
  ],
  render() {
    // Embed iterables that can contain any value (chunk in this example):
    const links = this.links.map(
      link => chunk`<li>${Link({ link })}</li>`
    );
    this.renderer`
      <ul>${links}</ul>
    `;
  }
}));

const Avatar = factory(View.extend({
  className: 'Avatar',
  render() {
    this.renderer`
      <img>
    `;
  }
}))

const Header = factory(View.extend({
  className: 'Header',
  tagName: 'header',
  render() {
    this.renderer`
      ${Avatar}
      ${Nav}
    `;
  }
}));

const Footer = View.extend({
  className: 'Footer',
  tagName: 'footer',
  render() {
    this.renderer`
      ${Nav}
      <p>Have a nice day.</p>
    `;
  }
});

const UserInfo = factory(View.extend({
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
  },
  remove() {
    console.log('Deeply nested child Backbone.view was removed.');
    View.prototype.remove.call(this);
  }
}));

const UserList = factory(View.extend({
  className: 'UserList',
  initialize() {
    this.listenTo(this.collection, 'update', this.render);
  },
  render() {
    const items = this.collection.map(
      model => chunk`<li>${UserInfo({ model })}</li>`
    );
    this.renderer`
      <ul>${items}</ul>
    `;
  }
}));

const UserForm = factory(View.extend({
  className: 'UserForm',
  events: {
    'click button': 'submit'
  },
  initialize() {
    // If you need references to elements later, instead of selected them after
    // you render, you can create them once and insert them in the template.
    this.$name = $('<input />');
    this.$age = $('<input />');
  },
  render() {
    const { $name, $age } = this;
    this.renderer`
      <label>Name: ${$name}</label>
      <label>Age: ${$age}</label>
      <button>Submit</button>
    `;
  },
  submit() {
    const { collection, $name, $age } = this;
    collection.add({
      name: $name.val(),
      age: $age.val()
    });
    $name.val('');
    $age.val('');
  }
}));

const App = factory(View.extend({
  className: 'App',
  render() {
    const { links, collection } = this;
    // Views that render multiple children:
    this.renderer`
      ${Header}
      <main>
        <h2>Backbone Component Renderer</h2>
        <p>Renderer is a really bad word, isn't it?</p>
        ${UserList({ collection })}
        ${UserForm({ collection })}
      </main>
      ${Footer}
    `;
  }
}));

const users = new Collection([
  { name: 'Walt', age: 50 },
  { name: 'Hank', age: 43 },
  { name: 'Jessie', age: 25 }
]);

const app = App({ collection: users });

mount(app, document.body);