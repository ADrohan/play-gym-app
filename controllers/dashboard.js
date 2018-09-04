  
const accounts = require ('./accounts.js');
const logger = require('../utils/logger');
const memberStore = require('../models/member-store.js');
const assessmentStore = require('../models/assessment-store.js');
const Analytics = require('../utils/analytics.js');
const uuid = require('uuid');
const moment = require('moment');

const dashboard = {
  index(request, response) {
    logger.info('dashboard rendering');
    const loggedInUser = accounts.getCurrentUser(request);
    logger.info(loggedInUser);
    logger.info('found' , loggedInUser.id);
    console.log(memberStore.getMember(loggedInUser.id));
    const viewData = {
      title: 'Play Gym Dashboard',
      member: memberStore.getMember(loggedInUser.id),
      assessment: assessmentStore.getUserAssessments(loggedInUser.id)
    };
      logger.info('about to render', viewData);
      response.render('dashboard', viewData);
  },
  
  addAssessment(request, response){
    console.log(request);
    const loggedInUser = accounts.getCurrentUser(request);
        console.log(loggedInUser);

    logger.debug(loggedInUser.id);
    let currentDate = moment().format('ll');
    logger.info(currentDate);
    const newAssessment = {
      id: uuid(),
      userid: loggedInUser.id,
      weight: request.body.weight,
      chest: request.body.chest,
      thigh: request.body.thigh,
      upperarm: request.body.upperarm,
      waist: request.body.waist,
      hips: request.body.hips, 
      date: moment().format('lll'),
      comment: ''
    };
    logger.debug('Creating a new assessment', newAssessment); 
      assessmentStore.addAssessment(newAssessment);
      const member = memberStore.getMember(loggedInUser.id);
      //logger.info('MEMBER', member);
      let stats = Analytics.generateMemberStats(member[0],newAssessment);
      //logger.info( 'STATS', stats);
      let memberToUpdate = member[0];
      memberToUpdate.bmi = stats.bmi;
      memberToUpdate.bmiCategory = stats.bmiCategory;
      memberToUpdate.isIdealBodyWeight = stats.isIdealBodyWeight;
      memberToUpdate.trend = stats.trend;
      memberStore.memberSettingsToUpdate(memberToUpdate);
      response.redirect('/dashboard');
  },
  
  deleteAssessment(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    //console.log(loggedInUser);
    logger.info ('logged in user:' , loggedInUser.id);
    const assessmentId = request.params.id;
    logger.info('getting ready to delete :', assessmentId, 'from', loggedInUser.id);  
    assessmentStore.removeAssessment(assessmentId);
    response.redirect('/dashboard');
  },
   
};

module.exports = dashboard;
