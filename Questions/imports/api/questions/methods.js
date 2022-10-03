import { Questions } from "./collection";




Meteor.methods({ 

    'question.add': function(data) { 
        Questions.insert(data);
    },
    'question.delete': function(query) { 
        query.userId=this._id
        Questions.remove(query);
    },
    'question.get': function(query) { 
        query.userId=this._id
        Questions.remove(query);
    } 
});