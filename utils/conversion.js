'use strict';

const Conversion = {
  round: function(numberToConvert, precision){
    var p = Math.pow(10, precision);
    return Math.round(numberToConvert*p)/p;
  },
  convertKgToPounds: function(numberToConvert, precision) {
    return Conversion.round(numberToConvert *2.2, precision);
  },
  convertMetresToInches: function(numberToConvert, precision) {
    return Conversion.round(numberToConvert * 39.37, precision);
  }
};

module.exports = Conversion;

