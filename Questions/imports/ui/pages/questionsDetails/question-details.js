import './questions-details.html'
import {FlowRouter} from 'meteor/ostrio:flow-router-extra'
import { Questions } from '../../../api/questions/collection';

Template.questionDetails.onCreated(function(){
    
    this.questionId = new ReactiveVar();
    this.autorun(()=>{ //reactdaki useEffect.
        let urlId = FlowRouter.getParam('_id'); //url-dan data götürmək
        this.questionId.set(urlId);
    })


})
Template.questionDetails.helpers({
    currentQuestion(){
        return Questions.findOne({_id:Template.instance().questionId.get()});
    }
})
