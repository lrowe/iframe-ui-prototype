/*jslint browser: true */
(function () {
    var plone;
    var offset = "40px";
    if (document.plone === undefined) {
        document.plone = {};
    }
    plone = document.plone;

    function createIframe(name, attrs) {
        var attr;
        var iframe = document.createElement('iframe');
        if (iframe.allowTransparency !== undefined) {
            iframe.allowTransparency = true;
        }
        iframe.id = iframe.name = name;
        for(attr in attrs) {
            if(attrs.hasOwnProperty(attr))
                iframe.setAttribute(attr, attrs[attr]);
        }
        document.body.insertBefore(iframe, document.body.childNodes[0]);
        return iframe;
    }
    document.body.style.marginTop = offset;
    plone.menu = createIframe('plone_menu', {
        src: 'menu.html',
        style: 'border:0 none; padding:0; margin:0; position:fixed; width:100%; height: 500px; z-index: 9999; margin-top:-'+offset+';'
        });
    plone.overlay = createIframe('plone_overlay', {
        style: 'border:0 none; padding:0; margin:0; display:none;'
        });
})();