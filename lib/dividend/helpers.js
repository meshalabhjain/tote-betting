'use strict'

var config = require('../../config');
var u = require('lodash');

/**
* Calculates the dividend
* @param {totalStake}  - total pool of contribution
* @param {winnersStake} - total sum of contribution by winners
* @param {product} - product either 'W', 'P' , 'E'
*/
exports.calulateDividend = function(totalStake, winnersStake, product){
   var commission = parseInt(getCommissionPercentage(product));
   var stakeAfterCommision = totalStake - (totalStake * commission/100);
   return winnersStake ? u.round(stakeAfterCommision / winnersStake, 2) : 0;
} 

function getCommissionPercentage(product){
  return config.commission[product];
}

/**
* Formats the output
* @param {winBetDividend}  - win bet dividend
* @param {placeBetDividend} - place bet dividend
* @param {exactaBetDividend} - exactabet dividend
* @param {result} - result object
*/
exports.formatOutput =  function(winBetDividend, placeBetDividend, exactaBetDividend, result){
  var outputArray =[];
  outputArray.push("win:"+result.first+":$"+winBetDividend.win)
  outputArray.push("place:"+result.first+":$"+placeBetDividend['place-first'])
  outputArray.push("place:"+result.second+":$"+placeBetDividend['place-second'])
  outputArray.push("place:"+result.third+":$"+placeBetDividend['place-third'])
  outputArray.push("exacta:"+result.first+","+result.second+":$"+exactaBetDividend.exacta)
  return outputArray;
}
