﻿var azure = require('azure')

return function (context, callback) {
    var serviceBusService = azure.createServiceBusService('Endpoint=sb://moswald.servicebus.windows.net/;SharedAccessKeyName=WebTaskSender;SharedAccessKey=VsxilpfsoGvh8L+n7VPQZwbCw07PV5FEyjo9uK8vEHg=;');

    var msg = {
        body: context.webhook,
        customProperties: {
            extra: context.data
        }
    };

    serviceBusService.sendQueueMessage(
        "webhooks",
        msg,
        function(e) {
            if (e) {
                callback(e, 'Failed to enqueue message');
            }
            else {
                callback(null, 'success');
            }
        });
}
