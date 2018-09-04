'use strict';

const logger = require('../utils/logger');
const conversion = require('../utils/conversion');


const about = {
  index(request, response) {
    logger.info('about rendering');
    const viewData = {
      title: 'About Play Gym',
    };
    response.render('about', viewData);
  },
};

module.exports = about;
