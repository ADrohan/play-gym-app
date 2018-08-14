'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');
const logger = require('../utils/logger');
const accounts = require('../controllers/accounts.js');

//const memberStore = require('./member-store.json').members;

//module.exports = memberStore;


const memberStore = {
  
  store: new JsonStore('./models/member-store.json', { members: [] }),
  collection: 'members',
      
     //memberCollection: require('./member-store.json').members,
  
  getAllMembers() {
   //return this.memberCollection;
    return this.store.findAll(this.collection);
  },
  
  getMember(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },
  
   getThisMember(id) {
    return this.store.findBy(this.collection, {id: id}); 
  },
     
  addAssessment(userid,assessment) {
    logger.debug("userid: " + userid.id);
    const member = this.getMember(userid.id);
    logger.debug(member[0]);
    member[0].assessment.push(assessment);
   // member[0].assessment.reverse();
     this.store.save();
 },
  
  removeMember(id) {
    const member = this.getThisMember(id);
   logger.debug(member);
    this.store.remove(this.collection, member[0]);
    this.store.save();
  },
  
   getMemberByEmail(email) {
    return this.store.findOneBy(this.collection, { email: email });
  },
  
  memberSettingsToUpdate(loggedInUser,member) {
    //logger.debug('memberSettingdsToUpdate:', memberId);
    
    //logger.debug('memberSettingsToupdate', memberSettings);
    logger.debug('member from parameter', member);
    //const memberId = this.getMember(loggedInUser.id);
    var memberToUpdate = this.getMember(loggedInUser.id);
    memberToUpdate = member;
    logger.debug('memberAfterUpdate', memberToUpdate);
    this.store.save();
    
    //memberSettings.address = this.members.address;
    
    //memberSettings.address = member.address;
  //   const loggedInUser = accounts.getCurrentUser(request);
  //memberSettings.address = this.member.address;
  //  memberSettings[0].address = this.member.address;
},
   
};

module.exports = memberStore;