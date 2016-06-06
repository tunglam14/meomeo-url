import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

//import { ReactiveVar } from 'meteor/reactive-var';

import './index.html';

Template.body.helpers({
  shortURL() {
    return Session.get( "shortURL") || '';
  },
});

Template.body.events({
  'submit #submitURL'(event){
    event.preventDefault(); 

    const url = event.target.url.value;
    console.log('URL: ' + url);

    Meteor.call('url.create', url, function(err, result){
      if(!result){
        // shorten failed
        Session.set("shortURL", "Could not shorten this URL, pls double check.");
        return;
      }

      console.log(err, result);
      Session.set("shortURL", Meteor.absoluteUrl(result));
    });
  },
});

Template.body.onCreated(function(){
	console.log('Body load');
})
