'use strict'
var u = require('lodash');
var utils = require('../utils');
var Promise = require('bluebird');
var calculateWinDividend = require('./win'); 
var calculatePlaceDividend = require('./place');
var calculateExactaDividend = require('./exacta'); 
var helpers = require('./helpers');

/**
* This function process the dividend
* @param {result} - result object
* @param {cb} - callback
*/
module.exports = function process(result, cb){
  //marks the race complete
  Promise.promisify(utils.update)('./db/', 'races.json', {raceId: result.raceId} , "completed", true)
    .then(function(){
        //get all the bets for the current race
        return Promise.promisify(utils.find)('./db/', 'bets.json', {raceId: result.raceId});
    }).then(function(betsData){
        //calculates the dividend
        return Promise.promisify(calculateDividend)(betsData, result);
    }).then(function(out){
        cb(null, out);
    }).catch(function(error){
       cb(error);
    });
}

function calculateDividend(betsData,result,cb){
  // Devide the data based on products
  var winBets = [], placeBets = [], exactaBets = [];
  u.each(betsData, function(bet){
       if(bet.product === "W"){
          winBets.push(bet); 
       }else if(bet.product === "P"){
          placeBets.push(bet);
       }else if(bet.product === "E"){
          exactaBets.push(bet);
       }
  });
  // Dividend for all three types of bets are calculated in parallel
  Promise.all([Promise.promisify(calculateWinDividend)(winBets, result),
               Promise.promisify(calculatePlaceDividend)(placeBets, result), 
               Promise.promisify(calculateExactaDividend)(exactaBets, result)])
            .spread(function(WinBetDividend, placeBetDividend, exactaBetDividend){
                 return cb(null, helpers.formatOutput(WinBetDividend, placeBetDividend, exactaBetDividend, result))
            });
}
