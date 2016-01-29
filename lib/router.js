Router.configure({
  layoutTemplate: 'appIndex',
});

Router.route('home', {
  path: '/',
  action: function() {
    this.render();
  }
});
