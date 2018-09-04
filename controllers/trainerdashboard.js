'use strict';

const logger = require('../utils/logger');
const trainerStore = require('../models/trainer-store.js');
const memberStore = require('../models/member-store.js');
const assessmentStore = require('../models/assessment-store.js');
const Analytics = require('../utils/analytics');

const accounts = require ('./accounts.js');

const trainerdashboard = {
  index(request, response) {
    logger.info('trainer dashboard rendering');
    const members = memberStore.getAllMembers();
    console.log('MEMBER', members);
    
    let index = 0;
    let length = members.length;
    for (index; index < length; index++) {
      let assessments = assessmentStore.getUserAssessments(members[index].id);
      members[index].assessment = assessments;
    }
    
    const viewData = {
     title: 'Trainer Dashboard', 
     memberlist: members
    };
    logger.info('about to render trainerdashboard viewData');
    //logger.info('about to render', viewData);
    response.render('trainerdashboard', viewData);      
  },
     
   trainerAssessment(request, response) {
    const memberId = request.params.id;
     logger.debug('finding trainerassessment member',  memberId);
     const viewData = {
       member: memberStore.getMember(memberId),
       assessment: assessmentStore.getUserAssessments(memberId),
     };
      logger.info('finding memberassessments');
    //logger.info('about to render', memberAssessments);
      response.render('trainerassessment',viewData);  
  },
  
   deleteMember(request, response) {  
    const memberId = request.params.id;
   // logger.debug("member: ", memberId);
    memberStore.removeMember(memberId);
    response.redirect('/trainerdashboard');
  },
  
  
   editComment(request,response) {
     const assessmentId = request.params.id;
     logger.debug(assessmentId);      
     const comment = request.body; 
     logger.info('comment found is: ', comment);     
     const commentToUpdate = {
         id: assessmentId,
         comment: comment.comment 
    };
     logger.info( 'comment to update is"', commentToUpdate);
     assessmentStore.assessmentSettingsToUpdate(commentToUpdate);   
    response.redirect('/trainerdashboard');
      },

};
module.exports = trainerdashboard;