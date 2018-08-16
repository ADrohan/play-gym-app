'use strict';

const logger = require('../utils/logger');
const conversion = require('../utils/conversion');


const about = {
  index(request, response) {
    logger.info('about rendering');
    //logger.info( conversion.round(1.2678, 2));
    const viewData = {
      title: 'About Play Gym',
    };
    response.render('about', viewData);
  },
};

module.exports = about;
