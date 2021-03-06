'use strict'

/**
* This function validates the result arguments
*
* @param {first} - first position the race
* @param {second} - second position the race
* @param {third} - third position the race
* @param {cb} - callback 
*/
function validate(first, second, third, cb){   
  if(!first || !second || !third){
    return cb(new Error("Result should contain all the three positions"));
  }
  if(!(parseInt(first) == first && first>0) || !(parseInt(second) == second && second >0) 
    || !(parseInt(third) == third && third >0)){
    return cb(new Error("Result positions should be positive intergers"));
  } 

  if((first === second) || (second === third) || (third == first)) {
    return cb(new Error("All three positions are expected to be unique"));
  }
  cb();
}

module.exports = validate;