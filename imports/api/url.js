import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

import { Helper } from '../helper/url.js';

export const URL = new Mongo.Collection('urls');

Meteor.methods({
  'url.get'(alter){
    return URL.findOne({"alter": alter});
  },
  'url.create'(url){
    console.log('Received: ' + url);

    if(!Helper.isHTTPURL(url)){
      console.log(url + ': is not URL');
      return false;
    }

    // check url is already shorted
    u = URL.findOne({"url": url});
    if(u != undefined) {
      console.log('Check exist, u is ' + typeof(u));
      return u.alter;
    }
    else { 
      // Check alter not duplicate
      do {
        var alter = Helper.randString();
      }
      while(URL.find({"alter": alter}).count() > 0)

      console.log('alter: ' + alter);

      URL.insert({
        url,
        alter: alter,
        createdAt: new Date(),
      });
      return alter;
    }
  },
});
