/*jslint white:false, onevar:true, undef:true, nomen:true, eqeqeq:true, plusplus:true, bitwise:true, regexp:true, newcap:true, immed:true, strict:false, browser:true */
/*global jQuery:false, document:false, window:false, location:false */

/* - dropdown.js - */
/*
 * This is the code for the dropdown menus. It uses the following markup:
 *
 * <dl class="actionMenu" id="uniqueIdForThisMenu">
 *   <dt class="actionMenuHeader">
 *     <!-- The following a-tag needs to be clicked to dropdown the menu -->
 *     <a href="some_destination">A Title</a>
 *   </dt>
 *   <dd class="actionMenuContent">
 *     <!-- Here can be any content you want -->
 *   </dd>
 * </dl>
 *
 * When the menu is toggled, then the dl with the class actionMenu will get an
 * additional class which switches between 'activated' and 'deactivated'.
 * You can use this to style it accordingly, for example:
 *
 * .actionMenu.activated {
 *   display: block;
 * }
 *
 * .actionMenu.deactivated {
 *   display: none;
 * }
 *
 * When you click somewhere else than the menu, then all open menus will be
 * deactivated. When you move your mouse over the a-tag of another menu, then
 * that one will be activated and all others deactivated. When you click on a
 * link inside the actionMenuContent element, then the menu will be closed and
 * the link followed.
 *
 */

/*
 * Provides globals:
 * actionMenuDocumentMouseDown, actionMenuMouseOver, document, hideAllMenus, 
 * initializeMenus, jQuery, toggleMenuHandler 
*/

function resizeIframe() {
    var height;
    var iframe = jQuery('#plone_menu', window.parent.document);
    if (jQuery('dl.actionMenu.activated').length) {
        iframe.height('100%');
    } else {
        height = jQuery('#visual-portal-wrapper').outerHeight();
        iframe.height(height);
        window.parent.document.body.style.marginTop = height+'px';
        iframe[0].style.marginTop = '-'+height+'px';
    }
}

function hideAllMenus() {
    jQuery('dl.actionMenu').removeClass('activated').addClass('deactivated');
    resizeIframe();
}

function toggleMenuHandler(event) {
    var height;
    // swap between activated and deactivated
    jQuery(this).parents('.actionMenu:first')
        .toggleClass('deactivated')
        .toggleClass('activated');
    resizeIframe();
    return false;
}

function actionMenuDocumentMouseDown(event) {
    if (jQuery(event.target).parents('.actionMenu:first').length) {
        // target is part of the menu, so just return and do the default
        return true;
    }

    hideAllMenus();
}

function actionMenuMouseOver(event) {
    var menu_id = jQuery(this).parents('.actionMenu:first').attr('id'),
        switch_menu;
    if (!menu_id) {return true;}

    switch_menu = jQuery('dl.actionMenu.activated').length > 0;
    jQuery('dl.actionMenu').removeClass('activated').addClass('deactivated');
    if (switch_menu) {
        jQuery('#' + menu_id).removeClass('deactivated').addClass('activated');
    }
}

function initializeMenus() {
    jQuery(document).mousedown(actionMenuDocumentMouseDown);

    hideAllMenus();

    // add toggle function to header links
    jQuery('dl.actionMenu dt.actionMenuHeader a')
        .click(toggleMenuHandler)
        .mouseover(actionMenuMouseOver);
        
    // add hide function to all links in the dropdown, so the dropdown closes
    // when any link is clicked
    jQuery('dl.actionMenu > dd.actionMenuContent').click(hideAllMenus);
    jQuery(window).resize(resizeIframe);
}

jQuery(initializeMenus);

