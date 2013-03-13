YUI().use('node', 'app', 'dd', 'scrollview', 'datatable', 'datasource', 'event', 'autocomplete', function (Y) {
    var c         = Y.one('#console'),
        scripts   = Y.all('script'),
        baseUrl   = 'http://dev1-vm4.cx.corp.gq1.yahoo.com/' + Y.version + '/',
        maxUrlLen = 1024,
        modules   = [],
        combos    = [],
        separator, comboUrl, comboUrlMods, numComboUrls, parts, i, j;

    scripts.each(function (script) {
        var url = script.get('src');
        if (url.match(/combo/)) {
            parts = url.split('?');
            parts = parts.pop().split('&');

            parts.forEach(function (part) {
                modules.push(part.split('/')[2]);
            });
        }
    });

    numComboUrls = Math.ceil(modules.join(',').length / (maxUrlLen - baseUrl.length));

    for (i = 0, j = 0; i < numComboUrls; i += 1) {
        comboUrl = baseUrl;
        separator = '';
        for ( ; j < modules.length; j += 1) {
            comboUrl += separator + modules[j];
            separator = ',';

            if (!modules[j + 1] || comboUrl.length + modules[j + 1].length > maxUrlLen) {
                combos.push(comboUrl);
                break;
            }
        }
    }

    combos.forEach(function(url) {
        var p = Y.Node.create('<p>'),
            a = Y.Node.create('<a>');

        p.append(a);
        a.set('href', url);
        a.setContent('(' + url.length + ') [CUSTOM] ' + url);

        c.append(p);
    });
});
