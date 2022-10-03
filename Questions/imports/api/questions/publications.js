import { Questions } from "./collection";


Meteor.publish({'get.questions': function(query={}) {
    console.log(Questions.find(query).fetch())
    return Questions.find(query);
}});


