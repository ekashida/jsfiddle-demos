YUI({filter: 'debug', combine: false}).use('node', 'cl', function (Y) {

    var body        = Y.one('body'),
        start       = Y.one('#start'),
        end         = Y.one('#end'),
        url         = Y.one('#url'),
        loads       = Y.one('#loads'),
        auto        = Y.one('#automate'),
        count       = 0,
        numLoads,
        automated,
        iframe;

    Y.CL = new Y.CommunicationLayer();

    function create () {
        iframe = Y.Node.create('<iframe>');
        iframe.set('src', url.get('value'));

        Y.CL.register(iframe, function (proxy) {
            if (automated) {
                proxy.ready(function () {
                    destroy();
                });
            }
        });

        body.append(iframe);
    }

    function destroy () {
        iframe.remove(true);
        iframe = null;

        if (console.markTimeline) {
            console.markTimeline(++count);
        }

        if (automated && (numLoads && count < numLoads)) {
            create();
        }
    }

    start.on('click', function () {
        automated = auto.get('checked');
        numLoads = loads.get('value') || 0;

        create();
    });

    end.on('click', function () {
        automated = false;
        destroy();
    });

});
