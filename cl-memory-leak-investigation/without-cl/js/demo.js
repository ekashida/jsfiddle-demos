(function (win, doc) {

    var body        = doc.getElementsByTagName('body')[0],
        start       = doc.getElementById('start'),
        end         = doc.getElementById('end'),
        url         = doc.getElementById('url'),
        loads       = doc.getElementById('loads'),
        auto        = doc.getElementById('automate'),
        count       = 0,
        numLoads,
        automated,
        iframe;

    function create () {
        iframe = doc.createElement('iframe');
        if (automated) {
            iframe.addEventListener('load', loadHandler);
        }
        iframe.src = url.value;
        body.appendChild(iframe);
    }

    function loadHandler () {
        setTimeout(function () {
            destroy();
        }, 0);
    }

    function destroy () {
        iframe.removeEventListener('load', loadHandler);
        iframe.parentNode.removeChild(iframe);
        iframe = null;

        if (console.markTimeline) {
            console.markTimeline(++count);
        }

        if (automated && (numLoads && count < numLoads)) {
            create();
        }
    }

    start.addEventListener('click', function () {
        automated = auto.checked;
        numLoads = loads.value || 0;

        create();
    });

    end.addEventListener('click', function () {
        automated = false;
        destroy();
    });

})(window, document);
