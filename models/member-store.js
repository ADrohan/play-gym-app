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
    this.store.save();
  },
  
  removeMember(id) {
    const member = this.getMember(id);
   //logger.debug(member);
    this.store.remove(this.collection, member[0]);
    this.store.save();
  },
  
   getMemberByEmail(email) {
    return this.store.findOneBy(this.collection, { email: email });
  },
    
   memberSettingsToUpdate(member) {
    // console.log(member);
    this.store.update(this.collection, member); 
    this.store.save();
  },
  
};

module.exports = memberStore;