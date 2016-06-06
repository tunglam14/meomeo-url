import { Meteor } from 'meteor/meteor';

import '../imports/api/url.js';

Picker.route('/:alter', function(params, req, res, next) {
  Meteor.call('url.get', params.alter, function(err, result){
    var loc = '';
    if(result == undefined) {
      loc = Meteor.absoluteUrl();
    }
    else {
      loc = result.url;
    }

    res.writeHead(302, { Location: loc });
    res.end();
  });
});

Meteor.startup(() => {
  // code to run on server at startup
});
