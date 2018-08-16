'use strict';

const conversion = require('../utils/conversion');

function Analytics() {}
//stack overflow suggessted format

Analytics.calculateBMI = function(member, weight) {
 if (member.height <= 0)
   return 0;
 else
  return conversion.round((weight/(member.height* member.height)), 2);  
};

module.exports = Analytics;

