'use strict'

var config = require('../../config');
var u = require('lodash');

exports.calulateDividend = function(winStake, winnersStake, product){
   var commission = parseInt(getCommissionPercentage(product));
   var stakeAfterCommision = winStake - (winStake * commission/100);
   return winnersStake ? u.round(stakeAfterCommision / winnersStake, 2) : 0;
} 

function getCommissionPercentage(product){
  return config.commission[product];
}

exports.formatOutput =  function(winBetDividend, placeBetDividend, exactaBetDividend, result){
  var outputArray =[];
  outputArray.push("win:"+result.first+":$"+winBetDividend.win)
  outputArray.push("place:"+result.first+":$"+placeBetDividend['place-first'])
  outputArray.push("place:"+result.second+":$"+placeBetDividend['place-second'])
  outputArray.push("place:"+result.third+":$"+placeBetDividend['place-third'])
  outputArray.push("exacta:"+result.first+","+result.second+":$"+exactaBetDividend.exacta)
  return outputArray;
}
