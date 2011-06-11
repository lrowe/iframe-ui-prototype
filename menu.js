/*jslint white:false, onevar:true, undef:true, nomen:true, eqeqeq:true, plusplus:true, bitwise:true, regexp:true, newcap:true, immed:true, strict:false, browser:true */
/*global jQuery:false, document:false, window:false, location:false */

(function ($) {
    var plone = window.parent.plone;
    plone.overlay.close(function () {
        $('.contentViews li.selected').removeClass('selected').addClass('plain');
    })
    $().ready(function() {
        $('.contentViews a').click(function (e) {
            var link = $(this),
                button = link.parents('li:first'),
                menu = button.parents('ul:first'),
                switch_menu;
            if (button.hasClass('selected')) {
                return false;
            }
            plone.overlay.open(link.attr('href'), function () {
                menu.find('li.selected').removeClass('selected').addClass('plain');
                button.removeClass('plain').addClass('selected');
            });
            return false;
        })
    });
}(jQuery));
