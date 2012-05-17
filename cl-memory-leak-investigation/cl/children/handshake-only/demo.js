YUI({filter: 'debug', combine: false}).use('cl', function (Y) {

    Y.CL = new Y.CommunicationLayer();
    Y.CL.ready();

});
