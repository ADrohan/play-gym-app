'use strict';

const logger = require('../utils/logger');
const memberStore = require('../models/member-store.js');

const dashboard = {
  index(request, response) {
    logger.info('dashboard rendering');
    const viewData = {
      title: 'Play Gym Dashboard',
      members: memberStore,
    };
    logger.info('about to render', memberStore);
    response.render('dashboard', viewData);
  },
};

module.exports = dashboard;
