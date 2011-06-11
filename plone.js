/*jslint white:false, onevar:true, undef:true, nomen:true, eqeqeq:true, plusplus:true, bitwise:true, regexp:true, newcap:true, immed:true, strict:false, browser:true */
/*global jQuery:false, document:false, window:false, location:false */


(function () {
    var plone, overlay, menu;
    
    // The plone global object
    if (window.plone === undefined) {
        window.plone = {};
    }
    plone = window.plone;

    // Some basic node utilities
    function updateAttrs(elem, attrs) {
        var attr;
        for(attr in attrs) {
            if(attrs.hasOwnProperty(attr)) {
                elem.setAttribute(attr, attrs[attr]);
            }
        }
    }

    function text(s) {
        return document.createTextNode(s);
    }

    function element(tag, attrs, children) {
        var i, length, elem = document.createElement(tag);
        updateAttrs(elem, attrs);
        for(i=0, length=children.length; i < length; i += 1) {
            elem.appendChild(children[i]);
        }
        return elem;
    }

    function div(attrs, children) {
        return element('div', attrs, children);
    }

    function span(attrs, children) {
        return element('span', attrs, children);
    }

    function iframe(attrs) {
        var elem = element('iframe', attrs, []);
        if (elem.allowTransparency !== undefined) {
            elem.allowTransparency = true;
        }
        return elem;
    }


    // Menu elements
    menu = plone.menu = {};
    menu.iframe = iframe({
        id: 'plone-menu',
        name: 'plone-menu',
        src: 'menu.html',
        scrolling: 'no'
    });
    menu.wrapper = div({'class': 'plone-reset', id: 'plone-menu-wrapper'}, [
        menu.iframe
    ]);
    document.body.insertBefore(menu.wrapper, document.body.childNodes[0]);
    menu.window = menu.iframe.contentWindow;

    // Overlay elements
    overlay = plone.overlay = {};
    overlay.closeButton = div({'id': 'plone-overlay-close'}, [
        span({}, [
            text("Close")
        ])
    ]);
    overlay.iframe = iframe({
        id: 'plone-overlay',
        name: 'plone-overlay',
        src: 'about:blank'
    });
    overlay.wrapper = div({id: 'plone-overlay-wrapper'}, [
        overlay.closeButton,
        overlay.iframe,
    ]);
    overlay.mask = div({'class': 'plone-reset', id: 'plone-overlay-mask', style:'display: none;'}, [
        overlay.wrapper
    ]);
    document.body.insertBefore(overlay.mask, document.body.childNodes[0]);
    overlay.window = overlay.iframe.contentWindow;

    // Overlay close event
    overlay._close_listeners = [];
    overlay._notifyClosed = function() {
        var i, length, handler,
            listeners = overlay._close_listeners;
        for(i=0, length=listeners.length; i < length; i += 1) {
            handler = listeners[i][0];
            data = listeners[i][1];
            if (data === undefined) {
                handler();
            } else {
                handler(data);
            }
        }
    };

    overlay.close = function (data, handler) {
        if(data !== undefined) {
            if (handler === undefined) {
                // handler is first argument
                overlay._close_listeners.push([data, undefined]);
            } else {
                overlay._close_listeners.push([handler, data]);
            }
        } else {
            overlay._close()
        }
    };

    overlay._close = function () {
        // Trigger the onbeforeunlaod event
        overlay.window.location.href = "about:blank";
        overlay.window.onunload = function () {
            overlay.mask.style.display = "none";
            overlay._notifyClosed();
        };
    };
    overlay.closeButton.onclick = overlay._close;

    // Overlay open
    overlay.open = function (url, success) {
        overlay.window.location.href = url;
        overlay.mask.style.display = "block";
        overlay.mask.style.height = document.body.clientHeight + 'px'; //XXX This would be better as position fixed.
        overlay.window.onunload = success; // hmmm. How to detect cancel from unload protection?
    };

    // overlay resize
    overlay.resize = function () {
        plone.overlay.iframe.height = plone.overlay.window.document.getElementById('visual-portal-wrapper').scrollHeight;
    };
    overlay.iframe.onload = overlay.resize;

}());
