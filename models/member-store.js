'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');
const logger = require('../utils/logger');
const accounts = require('../controllers/accounts.js');

const memberStore = {
  
  store: new JsonStore('./models/member-store.json', { members: [] }),
  collection: 'members',
      
  
  getAllMembers() {
    return this.store.findAll(this.collection);
  },
  
  getMember(id) {
    return this.store.findBy(this.collection, { id: id });
  },
      
  addMember(member) {
    this.store.add(this.collection, member);
  },
   
  addAssessment(id,assessment) {
    const member = this.getMember(id.id);
    logger.debug(member[0]);
    member[0].assessment.push(assessment);
   // member[0].assessment.reverse();
     this.store.save();
 },
  
  removeAssessment(loggedInUser, assessmentId) {
    const assessments = loggedInUser.assessment;
    logger.debug('removing this assessment', assessmentId);
    _.remove(assessments, { id: assessmentId});
    this.store.save();
  },
  
  removeMember(id) {
    const member = this.getMember(id);
   logger.debug(member);
    this.store.remove(this.collection, member[0]);
    this.store.save();
  },
  
   getMemberByEmail(email) {
    return this.store.findOneBy(this.collection, { email: email });
  },
    
   memberSettingsToUpdate(member) {
    this.store.update(this.collection, member); 
    this.store.save();
},
   
};

module.exports = memberStore;