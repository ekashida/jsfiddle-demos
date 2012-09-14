/*global YUI:true*/
YUI({
    gallery: 'gallery-2012.07.05-20-01'
}).use('gallery-communication-layer', function (Y, NAME) {
    'use strict';

    Y.CL = Y.CL || new Y.CommunicationLayer();

    // 'src' attribute is required for the handshake so make sure to set one
    // before registration.
    var iframe = Y.Node.create(
        '<iframe src=http://sd.mh.search.yahoo.com/sd/app width=100% height=300px>'
    );

    // CL bindings are defined in the callback using the proxy object.
    Y.CL.register(iframe, function (proxy) {
        Y.log('Registration has succeeded', 'info', NAME);

        // The search layer pings its host for initialization data (e.g., the
        // initial query, the current host page url, etc). Once it is
        // initialized, it notifies the host that it is ready. This binding
        // simply responds to the ping for pageinfo (e.callback()).
        proxy.on('pageinfo', function (e) {
            Y.log('Received "pageinfo" request from host', 'info', NAME);

            // Defaults are assumed when no data is passed.
            e.callback();
        });

        // Define what should happen when the search layer says it's ready.
        // This is where you would remove any loading indicators and begin
        // interaction.
        proxy.ready(function () {
            Y.later(2000, null, function () {
                Y.log('Changing the query string to "aapl"', 'info', NAME);
                proxy.fire('query:change', { p: 'aapl' });
            });
        });
    });

    // Finally, append the sandbox to the document to kick off the CL
    // handshake.
    Y.one("#container").append(iframe);
});
