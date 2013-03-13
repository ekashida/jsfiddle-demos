YUI().use('node', 'app', 'dd', 'scrollview', 'datatable', 'datasource', 'event', 'autocomplete', function (Y) {
    var c = Y.one('#console'),
        scripts = Y.all('script'),
        combos = [];

    scripts.each(function (script) {
        var url = script.get('src');
        if (url.match(/combo/)) {
            var p = Y.Node.create('<p>'),
                a = Y.Node.create('<a>');

            p.append(a);
            a.set('href', url);
            a.setContent('[CURRENT] (' + url.length + ') ' + url);

            c.append(p);
        }
    });
});
