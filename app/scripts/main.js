/*global backbone, $*/
'use strict';


window.backbone = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
};

window.Application = function(){
    this.$greeter_wrapper = $('.greeter-wrapper');
    this.$greeter_fill = $(".greeter-fill");
    this.$navbar = $('#navbar');
    this.$navbar_offset = this.$navbar.offset().top;
    this.$nav_items = $(".nav-items");

};
window.Application.prototype = {
    init: function(){
        var that = this;
        var appRouter = new window.backbone.Routers.AppRouter();

        $('body').scrollspy();

        $('a[href^="#"]').on('click',function (e) {
            e.preventDefault();
            var target = this.hash,
            $target = $(target);
            if ($target.length) {
                $('html, body').stop().animate({
                    'scrollTop': $target.offset().top
                }, 200, 'swing', function () {
                    window.location.hash = target;
                });
            }
        });

        this.resizeGreeterFill();
        this.repositionNavItems();

        //this should be inside the backbone navigation view
        
        $(window).scroll(function() {
            that.checkForSticky();
            that.repositionNavItems();
        });

        $(window).resize(function(){ 
            that.repositionNavItems();
            that.resizeGreeterFill(); 
        });
    },

    checkForSticky: function(){
        var cur_scrolltop = $(window).scrollTop();
        var should_be_sticky = (cur_scrolltop > this.$navbar_offset);
        if (this.is_sticky != should_be_sticky) {
            console.log("toggling sticky");
            this.is_sticky = should_be_sticky;
            this.repositionNavItems();
            this.$greeter_wrapper.toggleClass('sticky', this.is_sticky);

            //set the greeter wrapper's top offset so that just the navbar is visible iff sticky
            var greeter_wrapper_top = this.is_sticky ? this.$navbar.outerHeight(true) - this.$greeter_wrapper.outerHeight(false) : 0;
            this.$greeter_wrapper.css("top", greeter_wrapper_top);
        }

        
    },

    repositionNavItems: function(){
        if (this.is_sticky) {
            this.$nav_items.css({ right: 0 });
        } else {
            this.$nav_items.css({ right: this.$navbar.width()/2 - this.$nav_items.outerWidth(true)/2});
        }
    },

    resizeGreeterFill: function(){
        this.$greeter_fill.height(this.$greeter_wrapper.outerHeight(true));
    },
};

$(document).ready(function () {
    var app = new window.Application();
    app.init();
});
