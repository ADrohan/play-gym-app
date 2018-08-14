'use strict';

const userstore = require('../models/user-store');
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
    const user = request.body;
    user.id = uuid();
    userstore.addUser(user);
    logger.info(`registering ${user.email}`);
    response.redirect('/');
  },

  authenticate(request, response) {
    const user = userstore.getUserByEmail(request.body.email);
    const trainer = trainerStore.getTrainerByEmail(request.body.email);
    if (user) {
      //response.cookie('playlist', user.email);
      response.cookie('dashboard', user.email);
      logger.info(`logging in ${user.email}`);
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
    const userEmail = request.cookies.dashboard;
    return userstore.getUserByEmail(userEmail);
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
    
    //logger.debug('new address: ', request.body.address);
    // not right logger.debug('requesting new address: ', request.body.address);
    
   
    /*
    const member = {
     // id: memberSettings.id,
      email: request.body.email,
      name: request.body.name,
      password: request.body.password,
      address: request.body.address,
      address: newAddress,
      gender: request.body.gender,
      height: request.body.height,
      startingweight: request.body.startweight
    };
    */
    
   
  
    // logger.debug('new address entered: ', request.body.address);
    
    //logger.debug ('address entered: ', this.member[0].address);
    //const update = memberStore.memberSettingsToUpdate(memberSettings);
    //const update = memberStore.memberSettingsToUpdate(memberSettings[0]);
   
    //const update = memberStore.memberSettingsToUpdate({member:memberSettings});
 
    
    //const update = memberStore.memberSettingsToUpdate(loggedInUser, member);
    
  
    //memberSettings.email = this.members.email;
   // memberSettings.name = this.member.name;
    //memberSettings.password = this.member.password;
    //memberSettings[0].address = this.member.address;
    
    //memberSettings.address = this.member.address;
    
   // memberSettings.address = this.member.address;
    //memberSettings.gender = this.member.gender;
    //memberSettings.height = this.member.height;
    //memberSettings.startingweight = this.member.startingweight;
  //  logger.debug('debugging: uddate', update);
   // response.redirect('settings', update);
    
    

};

module.exports = accounts;