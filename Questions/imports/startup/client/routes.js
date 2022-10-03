import {FlowRouter} from 'meteor/ostrio:flow-router-extra'

import '../../ui/components/footer/footer';
import '../../ui/components/header/header';
import '../../ui/pages/notFound/notFound'


import '../../ui/pages/home/home';
import '../../ui/pages/main/main'
import '../../ui/pages/users/users'
import '../../ui/pages/questionsDetails/question-details'

import '../../ui/components/navigation/navigation';

import '../../ui/layout/mainLayout'

FlowRouter.triggers.enter([CheckIsLoggedIn],{ //IsLoggedInAuth
    only:['App.questions','App.details']
});


FlowRouter.route('/',{
    name:'App.home',
    action(){
        BlazeLayout.render('mainLayout',{
            main:'welcome'
        });
    },
});
FlowRouter.route('/questions',{
    name:'App.questions',
    action(){
        BlazeLayout.render('mainLayout',{
            main:'currentQuestions'
        });
    },
});
FlowRouter.route('/users',{
    name:'App.users',
    action(){
        BlazeLayout.render('mainLayout',{
            main:'users'
        });
    },
});

FlowRouter.route('/question-details/:_id',{
    name:'App.details',
    action(){
        BlazeLayout.render('mainLayout',{
            main:'questionDetails'
        });
    },
});

FlowRouter.route('*',{
    name:'App.notFound',
    action(){
        BlazeLayout.render('notFound');
    },
});

function CheckIsLoggedIn(context,redirect) {
    if(!Meteor.userId()){
        redirect('/users');
    }
}
