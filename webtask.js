var request = require('request');

return function (context, callback) {
    if (context.data.slack_token && context.data.slack_channel) {
        console.log('Posting message to slack for repository '
            + context.webhook.repository.full_name);
        var url = 'https://slack.com/api/chat.postMessage'
            + '?token=' + context.data.slack_token
            + '&channel=' + context.data.slack_channel
            + '&user=' + (context.data.slack_user || 'WebTask')
            + '&text=' + encodeURIComponent('Changes in `' + context.webhook.repository.full_name + '`');
        request({ url: url, method: 'POST' }, function (error, res, body) {
            callback(error, body);
        });
    }
    else {
        console.log('Repository ' + context.webhook.repository.full_name + ' changed but slack credentials not supplied.');
        return callback();
    }
}



//var azure = require('azure')

//return function (context, callback) {
//    return callback(null, 'success');
    //console.log("1");
    //var serviceBusService = azure.createServiceBusService('Endpoint=sb://moswald.servicebus.windows.net/;SharedAccessKeyName=WebTaskSender;SharedAccessKey=VsxilpfsoGvh8L+n7VPQZwbCw07PV5FEyjo9uK8vEHg=;');

    //console.log("2");

    //var msg = {
     //   body: 'context.webhook',
      //  customProperties: {
       //     extra: 'context.data'
       // }
   // };

    //console.log("3");

    // serviceBusService.sendQueueMessage(
    //     "webhooks",
    //     msg,
    //     function(e) {
    //         console.log("4");
    //         if (e) {
    //             console.log("5");
    //             callback(e, '');
    //         }
    //         else {
    //             console.log("6");
    //             callback(null, 'success');
    //         }
    //     });

    //console.log("7");
//}
