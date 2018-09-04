
const BMICatagories = [
  
    {
        low:   0.0,
        high: 15.0,
        name: 'Very Severely Underweight'
    },
    {
        low:  15.0,
        high : 16.0,
        name: 'Severely Underweight'
    },
    {
        low:  16.0,
        high : 18.5,
        name : 'Underweight'
    },
    {
        low:  18.5,
        high : 25.0,
        name : 'Normal'
    },
    {
        low:  25.0,
        high : 30.0,
        name : 'Overweight'
    },
    {
        low:  30.0, 
        high : 35.0,
        name : 'Moderately Obese'
    },
    {
        low:  35.0,
        high : 40.0,
        name : 'Severely Obese'
    },
    {
        low:  40.0,
        high : 1000.0,
        name : 'Severely Obese' 
    }  
];

module.exports = {
  BMICatagoriesArray: BMICatagories,
  BmiCategory: function (bmiValue, catagory) {
    if((bmiValue >= catagory.low) && (bmiValue <= catagory.high)){
      return true; 
    }
    return false;
  }
}
