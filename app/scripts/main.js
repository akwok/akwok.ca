/*global backbone, $*/
'use strict';


window.backbone = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
};

$(document).ready(function () {
    window.Application.init();
});

window.Application = {};
window.Application.init = function(){
	console.log("start point!");

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

    //this should be inside the backbone navigation view
    var $navbar = $("#navbar");
    var objDistance = $navbar.offset().top;
    $(window).scroll(function() {
        var myDistance = $(window).scrollTop();
        if (myDistance > objDistance){
            $navbar.addClass('navbar-fixed-top');
        }
        if (objDistance > myDistance){
            $navbar.removeClass('navbar-fixed-top');
        }
    });


};