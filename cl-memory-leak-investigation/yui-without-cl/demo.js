YUI({filter: 'debug', combine: false}).use('node', function (Y) {

    var body        = Y.one('body'),
        start       = Y.one('#start'),
        end         = Y.one('#end'),
        url         = Y.one('#url'),
        auto        = Y.one('#automate'),
        automated,
        iframe;

    function create () {
        iframe = Y.Node.create('<iframe>');
        if (automated) {
            iframe.once('load', function () {
                Y.later(0, null, function () {
                    destroy();
                });
            });
        }
        iframe.set('src', url.get('value'));
        body.append(iframe);
    }

    function destroy () {
        iframe.remove(true);
        iframe = null;

        if (automated) {
            create();
        }
    }

    start.on('click', function () {
        // disable config inputs
        url.set('disabled', true);
        auto.set('disabled', true);

        automated = auto.get('checked');

        create();
    });

    end.on('click', function () {
        automated = false;
        destroy();

        // enable config inputs
        url.set('disabled', false);
        auto.set('disabled', false);
    });

});
