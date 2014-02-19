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
    this.$greeter_offset = this.$greeter_wrapper.height();
    this.$greeter_fill = $(".greeter-fill");
    this.$navbar = $('#navbar');
    this.$navbar_offset = this.$navbar.offset().top;
    this.$nav_items = $(".nav-items");

};
window.Application.prototype = {
    init: function(){
        var that = this;
        var appRouter = new window.backbone.Routers.AppRouter();



        var highlight_el = function($el, color, duration) {
            var anim_style = "bounce";
            $el.addClass('animated ' + anim_style);
            $el.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){ $el.removeClass(anim_style) });
        };

        var scroll_offset = 50;

        $('a[href^="#"]').on('click',function (e) {
            e.preventDefault();
            var target = this.hash;
            var $target = $(target);
            //should use backbone router here
            // location.replace(target);
            if ($target.length) {
                //compensate for the stickiness of the navbar
                var target_scrolltop = $target.offset().top - scroll_offset;
                $('html, body').stop().animate({
                    'scrollTop': target_scrolltop
                }, 200, 'swing', function () {
                    highlight_el($("h2", $target));
                });
            }
        });

        this.resizeGreeterFill();
        //this.repositionNavItems();

        //this should be inside the backbone navigation view
        $(window).scroll(function() {
            that.checkForSticky();
            //that.repositionNavItems();
        });

        $(window).resize(function() {
            that.checkForSticky();
        });

        this.renderPdfCanvas();

        //fudge factor of 1px to match with click swing
        $('body').scrollspy({ target: ".nav-container", offset: (scroll_offset + 1)});
    },

    renderPdfCanvas: function(){
        var pdf_canvas = $("#resume-pdf-canvas");
    },

    checkForSticky: function(){
        var cur_scrolltop = $(window).scrollTop();
        var sticky_threshold = this.$navbar.offset().top + $(".nav-items", this.$navbar).height() -1 ;
        var should_be_sticky = (cur_scrolltop > sticky_threshold);

        if (this.is_sticky != should_be_sticky) {
            this.is_sticky = should_be_sticky;
            $("body").toggleClass("sticky-header", this.is_sticky);
        }
    },

    recalculateGreeterWrapperTop: function(){
        var greeter_wrapper_top = this.is_sticky ? this.$navbar.outerHeight(true) - this.$greeter_wrapper.outerHeight(false) : 0;
        this.$greeter_wrapper.css("top", greeter_wrapper_top);
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
