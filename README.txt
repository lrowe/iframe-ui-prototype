Iframe UI demonstrator
=======================

This is a mockup of how an iframe based UI might work. The content menu and
all editing controls are moved into separate iframes. This allows for a degree
of javascript and css isolation - only a small amount of javascript (with no
other dependencies) runs in the main page.

The CSS and layout is not at all tuned for this case yet as it just reuses
standard Plone html. The current Deco editor's GUI is probably more advanced
in this respect, but starting with current Plone seemed easier for this
demonstrator.

Running the example
-------------------

It has so far been tested in Firefox and Chrome. To run in Chrome you will
need to serve the files from a webserver as local files are treated as
separate domains for security purposed. By far the simplest way to do this is
with python:

    $ cd files
    $ python -m SimpleHTTPServer 8000

Then visit http://localhost:8000/page.html

Page
----

This is just a standard Plone page with the javascript stripped out to
simulate a themed page. A ``plone.js`` and ``plone.css`` file is added to it
which is used to render the menu and overlay iframes.

Menu iframe
-----------

Shows how pull down menus can be implemented in an iframe.

dropdown.js

    Shows interaction with parent document using iframe's jQuery. (Would
    probably move to plone.js.)

menu.js

    Interacts with parent document and overlay through a global ``plone``
    object in the parent document.

Overlay iframe
--------------

Shows how the existing forms could be integrated into a redesigned layout.

CSS for overlay wrappers is injected into the parent document, simplifying the
pages shown in the overlay iframe.

(Scrollbar shows up because tinymce has some initiation going on after the
iframe onload event is called to resize the window.)

Open questions
--------------

* How should the menu be positioned, fixed or absolute? The current fixed
  position would be better for showing TinyMCE buttons for Deco editing. It
  may not be suitable for cases where logged in users are generally viewing
  content rather than editing it.

* The javascript could be further isolated by running it in a control iframe,
  allowing for jQuery to be used in plone.js. This is probably only desirably
  if the API of the ``plone`` object grew large.

* How do we deal with overlay content that is more than one screenful long?
