/*jslint white:false, onevar:true, undef:true, nomen:true, eqeqeq:true, plusplus:true, bitwise:true, regexp:true, newcap:true, immed:true, strict:false, browser:true */
/*global jQuery:false, document:false, window:false, location:false */

$(window).load(function() {
    jQuery('#plone-overlay-mask', window.parent.document)[0].style.display = 'block';
    jQuery('#plone-overlay', window.parent.document).height(
        jQuery('#visual-portal-wrapper').outerHeight()
    );
});
