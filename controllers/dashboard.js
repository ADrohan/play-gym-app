'use strict';

const accounts = require ('./accounts.js');
const logger = require('../utils/logger');
const memberStore = require('../models/member-store.js');
const Analytics = require('../utils/analytics');
const uuid = require('uuid');


const dashboard = {
  index(request, response) {
    logger.info('dashboard rendering');
    const loggedInUser = accounts.getCurrentUser(request);
    logger.info('found' , loggedInUser.id);
    const viewData = {
      title: 'Play Gym Dashboard',
      member: memberStore.getMember(loggedInUser.id),
      
    };
    logger.info('about to render', memberStore.getMember(loggedInUser.id));
    
    // TESTS for Analylics functions
   // const memberData = memberStore.getMember(loggedInUser.id);
    //logger.info('BMI', Analytics.calculateBMI(memberData[0], 60));
               //logger.info('weight'+ memberData[0].weight);
    //logger.info('ideal weight', Analytics.isIdealBodyWeight(memberData[0], 45));
    
    response.render('dashboard', viewData);
  },
  
  addAssessment(request, response){
    const loggedInUser = accounts.getCurrentUser(request);
    logger.debug(loggedInUser.id);
    const newAssessment = {
      id: uuid(),
      //userid: loggedInUser.id,
      weight: request.body.weight,
      chest: request.body.chest,
      thigh: request.body.thigh,
      upperarm: request.body.upperarm,
      waist: request.body.waist,
      hips: request.body.hips, 
    };
   logger.debug('Creating a new assessment', newAssessment);   
   memberStore.addAssessment(loggedInUser,newAssessment);
    response.redirect('/dashboard');
  },
  
  
  deleteAssessment(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    //console.log(loggedInUser);
    logger.info ('logged in user:' , loggedInUser.id);
    const assessmentId = request.params.id;
    logger.info('getting ready to delete :', assessmentId, 'from', loggedInUser.id);  
    memberStore.removeAssessment(loggedInUser, assessmentId);
    response.redirect('/dashboard');
  },
  
   
};

module.exports = dashboard;
