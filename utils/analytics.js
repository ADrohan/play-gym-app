
'use strict';

const conversion = require('../utils/conversion');
const logger = require('../utils/logger');

function Analytics() {}
//stack overflow suggessted format
//https://stackoverflow.com/questions/35537760/utility-class-for-functions

Analytics.calculateBMI = function(member, weight) {
 if (member.height <= 0)
   return 0;
 else
  return conversion.round((weight/(member.height* member.height)), 2);  
};

Analytics.isIdealBodyWeight = function(member, weight) {
  const fiveFeet = 60.0;
  let idealBodyWeight;
  const inches = conversion.convertMetresToInches(member.height, 2);
  
  if(inches <= fiveFeet) {
    if ((member.gender.startsWith("M", 0)) || (member.gender.startsWith("m", 0))){
         idealBodyWeight = 50;
    } else { idealBodyWeight = 45; }
  } 
  
  else {
    if ((member.gender.startsWith("M", 0)) || (member.gender.startsWith("m", 0))){
      idealBodyWeight = 50 + ((inches - fiveFeet) * 2.3);
  } else { idealBodyWeight = 45.5 + ((inches - fiveFeet) * 2.3);}
  }  
  logger.info("Ideal Weight " + idealBodyWeight);
  return ((idealBodyWeight <= (weight + 2.0)) && (idealBodyWeight >= (weight - 2.0)));
};

module.exports = Analytics;

