import './home.html';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Random } from 'meteor/random';
import { Questions } from '../../../api/questions/collection';


Template.currentQuestions.onCreated(function () {
    this.questions = new ReactiveVar([]);
    this.clickedQuestion=new ReactiveVar();

    let self = this;

    self.autorun(function() {
        let query = {
            userId:Meteor.userId()
        }
        self.subscribe('get.questions', query);
    });

})

Template.currentQuestions.helpers({
    getQuestions() {
        return Questions.find({userId: Meteor.userId()});
    },
    getClickedQuestion(){
        return Template.instance().clickedQuestion.get();
    }
})
Template.currentQuestions.events({
    'submit #question-form'(e, template) {
        e.preventDefault();
        let currentQuestion = $('#question-add').val();
        let answerContent1 = $('#answer-1').val();
        let answerContent2 = $('#answer-2').val();
        let answerContent3 = $('#answer-3').val();
        let privateVal = $("#private").prop('checked');
        let newQuestionId=Random.id();
        
        let answer1 = {
            _id:Random.id(),
            content: answerContent1,
            questionId:newQuestionId
        }
        let answer2 = {
            _id:Random.id(),
            content: answerContent2,
            questionId:newQuestionId
        }
        let answer3 = {
            _id:Random.id(),
            content: answerContent3,
            questionId:newQuestionId
        }
        let answersArr=[];
        answersArr.push(answer1);
        answersArr.push(answer2);
        answersArr.push(answer3);

        let newQuestion = {
            _id:newQuestionId,
            content: currentQuestion, 
            answers:answersArr,
            private:privateVal,
            userId:Meteor.userId()
        }
           
        Meteor.call('question.add', newQuestion, function(error, success) { 
            if (error) { 
                console.log('error', error); 
            } 
            if (success) { 
                console.log('success', success); 
            } 
        });
        
        document.querySelector("#question-add").value="";
        document.querySelector("#answer-1").value="";
        document.querySelector("#answer-2").value="";
        document.querySelector("#answer-3").value="";
        
    },

    'click .remove'(event, template) {
        let query={
            _id:this._id
        }
        
        Meteor.call('question.delete', query, function(error, success) { 
            if (error) { 
                console.log('error', error); 
            } 
            if (success) { 
                 console.log('success',success);
            } 
        });
    },

    'click .remove-answer'(event, template) {
        let query={
            "answers._id":this._id
        }

        let foundQues=Questions.findOne(query)
        let filtered = foundQues.answers.filter(m=>m._id!==this._id);
        Questions.update({
            _id:foundQues._id
        },{
            $set:{
                answers:filtered
            }
        })
    },
    'click .update'(event,template) {
        let updateForm=$('#update-form');
        updateForm.removeClass('d-none');
        template.clickedQuestion.set(this);
    },
    'submit #update-form'(e,template){
        e.preventDefault();
        let updatedQuestion = $('#question-update').val();
        let updateAnswerInputs=document.querySelectorAll("#update-answer");
        let initial = template.clickedQuestion.get();
        let newArr=[];

        for (let i = 0; i < Questions.findOne({_id:initial._id}).answers.length; i++) {                        
            initial.answers[i].content=updateAnswerInputs[i].value;
            newArr.push(initial.answers[i]);
        }

        Questions.update({
            _id:initial._id
        },{
            $set:{
                content:updatedQuestion,
                answers:newArr
            }
        })

        let updateForm=$('#update-form');
        updateForm.addClass('d-none');

        updateAnswerInputs.forEach(input => {
            input.value="";
        });
        updatedQuestion="";

        template.clickedQuestion.set('');
    }
})