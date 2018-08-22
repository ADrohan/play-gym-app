'use strict';

const logger = require('../utils/logger');
const trainerStore = require('../models/trainer-store.js');
const memberStore = require('../models/member-store.js');

const trainerdashboard = {
  index(request, response) {
    logger.info('trainer dashboard rendering');
    const viewData = {
     title: 'Trainer Dashboard', 
     memberlist: memberStore.getAllMembers(),
      
    };
    
   // logger.info('about to render', memberStore.getAllMembers());
    response.render('trainerdashboard', viewData);      
  },

  trainerAssessment(request, response) {
    const memberId = request.params.id;
    // logger.debug('finding trainerassessment member' + memberId);
    const member = memberStore.getMember(memberId);
     // logger.debug(member);
    const memberAssessments = member[0].assessment;
    logger.debug('finding memberassessments');
    logger.info('about to render', memberAssessments);
     
    response.render('trainerassessment', {memberAssessments: memberAssessments});   
  },
  
  deleteMember(request, response) {  
    const memberId = request.params.id;
   // logger.debug("member: ", memberId);
    memberStore.removeMember(memberId);
    response.redirect('/trainerdashboard');
  },
};
module.exports = trainerdashboard;