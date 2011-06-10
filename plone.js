/*jslint white:false, onevar:true, undef:true, nomen:true, eqeqeq:true, plusplus:true, bitwise:true, regexp:true, newcap:true, immed:true, strict:false, browser:true */
/*global jQuery:false, document:false, window:false, location:false */


(function () {
    var plone;
    if (window.plone === undefined) {
        window.plone = {};
    }
    plone = window.plone;

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

    plone.menu = div({'class': 'plone-reset', id: 'plone-menu-wrapper'}, [
        iframe({
            id: 'plone-menu',
            name: 'plone-menu',
            src: 'menu.html',
            scrolling: 'no'
        })
    ]);
    document.body.insertBefore(plone.menu, document.body.childNodes[0]);

    plone.overlay = div({'class': 'plone-reset', id: 'plone-overlay-mask'}, [
        div({id: 'plone-overlay-wrapper'}, [
            div({'id': 'plone-overlay-close'}, [
                span({}, [
                    text("Close")
                ])
            ]),
            iframe({
                id: 'plone-overlay',
                name: 'plone-overlay',
                src: 'overlay.html'
            })
        ])
    ]);
    document.body.insertBefore(plone.overlay, document.body.childNodes[0]);

}());
