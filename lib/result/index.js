'use strict'

var uniqid = require('uniqid');
var Promise = require('bluebird');
var validate = require('./validator');
var utils = require('../utils');
var processDividends = require('../dividend');


/**
* Result class
* @constructor
* @param {first} - first position the race
* @param {second} - second position the race
* @param {third} - third position the race
* @param {raceId} - Id of the current race 
*/
function Result(first, second, third, raceId) {
  this.resultId = uniqid();
  this.first = first;
  this.second = second;
  this.third = third;
  this.raceId = raceId;
}


/**
* This function takes the result arguments, validates the same before storing those in the storage.
*
* @param {first} - first position the race
* @param {second} - second position the race
* @param {third} - third position the race
* @param {raceId} - Id of the current race 
* @param {cb} - callback 
*/
Result.create = function (first, second, third, raceId, cb){
   var result = new Result (first, second, third, raceId);
   Promise.promisify(validate)(first, second, third)
    .then(function(){
      return result;
    }).then(function(result){
       return Promise.promisify(utils.create)('./db/', 'results.json', result)
        .then(function(){
        return result;
       }); 
    }).then(function(result){
        // Calling method to process the dividend
        return Promise.promisify(processDividends)(result)
        .then(function(output){
         return cb(null, output);
       });     
    }).catch(function(err){
      console.log("Error in validating/saving the result info.", err);
      cb(err);
    });
}


module.exports = Result;