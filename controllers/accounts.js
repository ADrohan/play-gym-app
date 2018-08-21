'use strict';

//const userstore = require('../models/user-store');
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

  /*
  register(request, response) {
    const member = request.body;
    member.id = uuid();
    memberStore.addMember(member);
    logger.info(`registering ${member.email}`);
    response.redirect('/');
  },
  */
  
  register(request, response) {
   const member = {
     id: uuid(),
     email: request.body.email,
     password: request.body.password,
     name: request.body.name,
     address: request.body.address,
     gender: request.body.gender,
     height: request.body.height,
     startingweight: request.body.startingweight,
     assessment: [],
   };
    memberStore.addMember(member);
    logger.info(`registering ${member.email}`);
    response.redirect('/');
  },
  
  authenticate(request, response) {
    const member = memberStore.getMemberByEmail(request.body.email);
    const trainer = trainerStore.getTrainerByEmail(request.body.email);
    if (member) {
      //response.cookie('playlist', user.email);
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
    //get logged in user
    const loggedInUser = accounts.getCurrentUser(request);
    //logger.debug('debugging', loggedInUser);
    //find member details user.
    const memberSettings = memberStore.getMemberByEmail(loggedInUser.email);
    //logger.debug('debugging', memberSettings);
    response.render('settings', {member:memberSettings});
    }, 
  
  updateSettings(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
//    logger.debug('debugging: loggedInUser', loggedInUser);
    const memberSettings = memberStore.getMemberByEmail(loggedInUser.email);
//    logger.debug('debugging memberSettings', memberSettings);
//    logger.debug('current address: ', memberSettings.address);
   
    //const newAddress = request.body;
    //logger.debug('new address: ', newAddress);
    
    const member = request.body;
    logger.debug('Creating new settings', member);   
    
    memberStore.memberSettingsToUpdate(loggedInUser, member);
    
    response.render('settings', {member: memberStore.getMemberByEmail(loggedInUser.email)});
    },

};

module.exports = accounts;