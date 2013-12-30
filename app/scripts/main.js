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

        //this should be inside the backbone navigation view
        var objDistance = this.$navbar.offset().top;
        $(window).scroll(function() {
            var myDistance = $(window).scrollTop();
            that.$greeter_wrapper.toggleClass('sticky', myDistance > objDistance);
        });

        $(window).resize(function(){ that.resizeGreeterFill(); });
    },
    resizeGreeterFill: function(){
        this.$greeter_fill.height(this.$greeter_wrapper.outerHeight(true));
    },
};

$(document).ready(function () {
    var app = new window.Application();
    app.init();
});
