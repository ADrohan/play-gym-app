
'use strict';

const conversion = require('../utils/conversion');
const logger = require('../utils/logger');
const accounts = require('../controllers/accounts.js');
const BMICategories = require('../utils/BMI.js');

function calculateBMI(member, weight) {
    if (member.height <= 0)
       return 0;
    else
       return conversion.round((weight/(member.height * member.height)), 2);  
};

function determineBMICatagory (bmiValue) {
    let lengthOfArray = BMICategories.BMICatagoriesArray.length;
    for (let i = 0; i < lengthOfArray; i++) {
    if(BMICategories.BmiCategory(bmiValue, BMICategories.BMICatagoriesArray[i] )) {
     return BMICategories.BMICatagoriesArray[i].name;
     }
 }
    return 'No category available';
}


function isIdealBodyWeight (member, weight) {
  console.log('Ideal Body Weight',member);
  
  const fiveFeet = 60.0;
  let idealBodyWeight = 0;
  const inches = conversion.convertMetresToInches(member.height, 2);
  if(inches <= fiveFeet) {
    if ((member.gender.startsWith("M", 0)) || (member.gender.startsWith("m", 0))){
      idealBodyWeight = 50;
    } else { 
      idealBodyWeight = 45; 
    }
  } 
  else {
    if ((member.gender.startsWith("M", 0)) || (member.gender.startsWith("m", 0))){
      idealBodyWeight = 50 + ((inches - fiveFeet) * 2.3);
    } else { 
      idealBodyWeight = 45.5 + ((inches - fiveFeet) * 2.3);
    }
  }  
   return ((idealBodyWeight <= (weight + 2.0)) && (idealBodyWeight >= (weight - 2.0)));
}

const Analytics= {
  generateMemberStats: function (member, assessment) {
    let memberStats = {
        bmi: 0,
        bmiCategory: "",
        isIdealBodyWeight: false,
        trend: false
    };
    let weight = assessment.weight;
    logger.info('weight' , weight);
    memberStats.bmi = calculateBMI(member, weight);
    memberStats.bmiCategory = determineBMICatagory (memberStats.bmi);
    memberStats.isIdealBodyWeight = isIdealBodyWeight (member, weight);
    memberStats.trend = false;
    return memberStats;
  }
};

module.exports = Analytics;

