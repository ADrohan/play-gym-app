'use strict';

const logger = require('../utils/logger');
const uuid = require('uuid');
const trainerStore = require('../models/trainer-store');
const memberStore = require('../models/member-store.js');

const accounts = {

  index(request, response) {
    const viewData = {
      title: 'Login or Signup',
    };
    response.render('index', viewData);
  },

  login(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('login', viewData);
  },

  logout(request, response) {
    response.cookie('dashboard', '');
    response.redirect('/');
  },

  signup(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('signup', viewData);
  },
 
  register(request, response) {
    console.log('GETTING TO REGISTER');
   const member = {
     id: uuid(),
     email: request.body.email,
     password: request.body.password,
     name: request.body.name,
     address: request.body.address,
     gender: request.body.gender,
     height: request.body.height,
     startingweight: request.body.startingweight,
     bmi: " ",
     bmiCategory: " ",
     isIdealBodyWeight: " ",
     trend: " "
   };
    console.log("MEMBER", member);
    memberStore.addMember(member);
    logger.info(`registering ${member.email}`);
    response.redirect('/');
  },
  
  authenticate(request, response) {
    const member = memberStore.getMemberByEmail(request.body.email);
    console.log(member);
    const trainer = trainerStore.getTrainerByEmail(request.body.email);
    if (member) {
      response.cookie('dashboard', member.email);
      logger.info(`logging in ${member.email}`);
      response.redirect('/dashboard');
    }
    else if (trainer) {
      response.cookie('trainerashboard', trainer.email);
      logger.info(`logging in ${trainer.email}`);
      response.redirect('/trainerdashboard');
    }
    else {
      response.redirect('/login');
    }
  },
  
  getCurrentUser(request) {
    const memberEmail = request.cookies.dashboard;
    return memberStore.getMemberByEmail(memberEmail);
  },
  
  
  settings(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const memberSettings = memberStore.getMemberByEmail(loggedInUser.email);
    //logger.debug('debugging', memberSettings);
    response.render('settings', {member:memberSettings});
    }, 
      
   updateSettings(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
//    logger.debug('debugging: loggedInUser', loggedInUser);
    const memberSettings = memberStore.getMemberByEmail(loggedInUser.email);     
    const member = request.body;
    
    const memberToUpdate = { 
      id: memberSettings.id,
      name: member.name,
      gender: member.gender,
      email: member.email,
      password: member.password,
      address: member.address,
      height: member.height,
      startingweight: member.startingweight
    };

    memberStore.memberSettingsToUpdate(memberToUpdate);
    response.render('settings', {member: memberStore.getMemberByEmail(loggedInUser.email)});
    },

};

module.exports = accounts;