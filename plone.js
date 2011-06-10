/*jslint browser: true */
(function () {
    var plone;
    if (window.plone === undefined) {
        window.plone = {};
    }
    plone = window.plone;

    function createIframe(name, attrs) {
        var attr;
        var iframe = document.createElement('iframe');
        if (iframe.allowTransparency !== undefined) {
            iframe.allowTransparency = true;
        }
        iframe.id = iframe.name = name;
        for(attr in attrs) {
            if(attrs.hasOwnProperty(attr)) {
                iframe.setAttribute(attr, attrs[attr]);
            }
        }
        document.body.insertBefore(iframe, document.body.childNodes[0]);
        return iframe;
    }

    plone.menu = createIframe('plone_menu', {
        src: 'menu.html',
        scrolling: 'no',
        style: 'outline:1px solid red; border:0 none; padding:0; margin:0; position:fixed; width:100%; height:0; z-index: 9999;'
        });

    plone.overlay = createIframe('plone_overlay', {
        style: 'border:0 none; padding:0; margin:0; display:none;'
        });
}());
