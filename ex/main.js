const { presenter, configurePresenter } = backbonePresenter;

configurePresenter({ Backbone: window.Backbone });

const View = Backbone.View.extend({
  initialize() {
    this.presenter = presenter(this);
    _.bindAll(this, 'presenter');
  },
  remove() {
    Backbone.View.prototype.remove.call(this);
  }
});

const Link = View.extend({
    tagName: 'a',
    initialize(options) {
      const { url, text } = options;
      this.url = url;
      this.text = text;
      View.prototype.initialize.call(this);
    },
    render() {
      const { url, text } = this;
      this.el.href = url;
      this.presenter(text);
    }
});

const Nav = View.extend({
	initialize: function (options) {
		this.links = options.links;
		View.prototype.initialize.call(this);
	},
  render() {
    const { presenter, links } = this;
    this.presenter(links.map(l => new Link(l)));
  }
});

const Home = View.extend({
  className: 'Home',
  render() {
    this.presenter`
      <h1>Hey.</h1>
      ${[
          [
            [[new Clock]],
            'bananas',
            '<br />',
            123,
            '<br />',
            new Clock
          ],
          '<br />',
          '<br />',
          document.createElement('input')
        ]}
      <p>I like exotic meats.</p>
    `;
  }
});

const Clock = View.extend({
  tagName: 'date',
  initialize(options) {
    _.bindAll(this, 'render');
    this.interval = setInterval(this.render, 1000);
    View.prototype.initialize.call(this);
  },
  render() {
    this.presenter(new Date());
  },
  remove() {
    clearInterval(this.interval);
    View.prototype.remove.call(this);
  }
});

const App = View.extend({
	className: 'App',
	links: [
    { url: '#/home', text: 'Home' },
    { url: '#/about', text: 'About' }
  ],
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
});

const app = new App();
app.render();

document.body.appendChild(app.el);