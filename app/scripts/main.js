/*global backbone, $*/

window.backbone = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
};

window.Application = function(){
    this.$navbar = $('#navbar');
    this.$embedded_resume = $("#embedded-resume");
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

        $('.nav-items a[href^="#"]').on('click',function (e) {
            e.preventDefault();
            var $target = $(this.hash);
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

        //this should be inside the backbone navigation view
        $(window).on("scroll resize", function() {
            that.checkForSticky();
        });

        $(window).on("resize", function(){
            that.resizeResumeEmbed();
        });

        this.resizeResumeEmbed();

        //fudge factor of 1px to match with click swing
        $('body').scrollspy({ target: ".nav-container", offset: (scroll_offset + 1)});

        //enable fancybox
        $(".fancybox, .fancybox-media").fancybox( {
            arrows: false,
            mouseWheel: false,
            iframe : {
                preload: false
            },
            helpers : {
                overlay : {
                    locked : false // try changing to true and scrolling around the page
                },
                media: {}
            }
        });
    },

    resizeResumeEmbed: function() {
        var resume_ratio = (11/8.5);
        this.$embedded_resume.css("height", this.$embedded_resume.width() * resume_ratio + 15)
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
};

$(document).ready(function () {
    var app = new window.Application();
    app.init();
});
