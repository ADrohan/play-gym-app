//javascript tutorial ENUM Types - https://www.youtube.com/watch?v=zyEyqvzeWcY
//https://stackoverflow.com/questions/287903/what-is-the-preferred-syntax-for-defining-enums-in-javascript

const BMI = {
  
    VERY_SEVERELY_UNDERWEIGHT : {
        value : 15.0,
        string : 'Very Severely Underweight'
    },
    SEVERELY_UNDERWEIGHT : {
        value : 16.0,
        string : 'Severely Underweight'
    },
    UNDERWEIGHT : {
        value : 18.5,
        string : 'Underweight'
    },
    NORMAL : {
        value : 25.0,
        string : 'Normal'
    },
    OVERWEIGHT : {
        value : 30.0,
        string : 'Normal'
    },
    MODERATELY_OBESE : {
        value : 35.0,
        string : 'Moderately Obese'
    },
    SEVERELY_OBESE : {
        value : 40.0,
        string : 'Severely Obese'
    },
    VERY_SEVERELY_OBESE : {
        value : 1000.0,
        string : 'Severely Obese' 
    }  
};

//function BMIRange(rangeHigh){
 //this.rangeHigh = rangeHigh; 
//}

/*
function BmiCategory(bmiValue) {
 if(bmiValue < this.rangeHigh) {
  return true; 
 }
  return false;
}
*/

