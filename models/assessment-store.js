 'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');
const logger = require('../utils/logger');
const accounts = require('../controllers/accounts.js');

const assessmentStore = {
  
  store: new JsonStore('./models/assessment-store.json', { assessment: [] }),
  collection: 'assessment',

  getAllAssessments() {
    return this.store.findAll(this.collection);
  },
  
  getAssessment(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },
  
  getUserAssessments(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },

   addAssessment(assessment) {
    this.store.add(this.collection, assessment);
    this.store.save();
  },

  removeAssessment(id) {
    const assessment = this.getAssessment(id);
    this.store.remove(this.collection, assessment);
    this.store.save();
  },
    assessmentSettingsToUpdate(assessment) {
    //console.log('ASSESSMENT SETTINGS', assessment);
    this.store.update(this.collection, assessment); 
    this.store.save();
  },
  
}
  
module.exports = assessmentStore;
