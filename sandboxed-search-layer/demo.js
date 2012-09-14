/*global YUI:true*/
YUI({
    gallery: 'gallery-2012.07.05-20-01'
}).use('gallery-communication-layer', function (Y, NAME) {
    'use strict';

    Y.CL = Y.CL || new Y.CommunicationLayer();

    // src attribute is required for the handshake.
    var iframe = Y.Node.create(
        '<iframe src="http://sd.mh.search.yahoo.com/sd/app" width=100% height=400>'
    );

    // CL bindings for the iframe are defined in the registration callback.
    Y.CL.register(iframe, function (proxy) {
        Y.log('Registration has succeeded', 'debug', NAME);

        // Search layer pings host for pageinfo and fires 'ready' after it's
        // done with its initialization.
        proxy.on('pageinfo', function (e) {
            Y.log('Received pageinfo from host', 'error');
            // Search layer assumes defaults, no need to pass anything.
            e.callback();
        });

        // Define what should happen when the search layer says it's ready.
        proxy.ready(function () {
            Y.later(2000, null, function () {
                proxy.fire('query:change', { p: 'aapl' });
            });
        });
    });

    // Finally, append the sandbox to the document to kick off the CL
    // handshake.
    Y.one("#container").append(iframe);
});
