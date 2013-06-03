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
        this.scrollToView("#test");

	},

    // scrollToView: function(id){
    //     var $target = $(id);
    //     if ($target.length) {
    //         $('html, body').stop().animate({
    //             'scrollTop': $target.offset().top
    //         }, 200, 'swing');
    //     }
    // },

});
