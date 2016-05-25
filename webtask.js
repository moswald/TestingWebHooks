var azure = require('azure')

return function (context, callback) {
    console.log("1");
    var serviceBusService = azure.createServiceBusService('Endpoint=sb://moswald.servicebus.windows.net/;SharedAccessKeyName=WebTaskSender;SharedAccessKey=VsxilpfsoGvh8L+n7VPQZwbCw07PV5FEyjo9uK8vEHg=;');

    console.log("2");

    var msg = {
        body: 'context.webhook',
        customProperties: {
            extra: 'context.data'
        }
    };

    console.log("3");

     serviceBusService.sendQueueMessage(
         "webhooks",
         msg,
         function(e) {
             console.log("4");
             if (e) {
                 console.log("5");
                 callback(e, '');
             }
             else {
                 console.log("6");
                 callback(null, 'success');
             }
         });

    console.log("7");
}
