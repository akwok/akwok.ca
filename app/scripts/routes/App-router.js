/*global backbone, Backbone*/

backbone.Routers.AppRouter = Backbone.Router.extend({
	routes: {
		'': 'home',
		'test': 'test'
	},

    initialize: function(attributes) {
        Backbone.history.start();
    },

    home: function(){
        console.log("home");
    },

	test: function(){
		console.log('navigated to test');
	}
});
