'use strict'

var helpers = require('./helpers');
var u = require('lodash');

/**
* Calculates dividend of win bets
* @param {winBets}  - Array of win bets
* @param {result} - result object 
* @param {cb} - callback function
*/
module.exports = function calulateWinDividend(winBets, result, cb){
    var totalStake = 0, winnersStake = 0;
    u.each(winBets, function(bet){
      totalStake = totalStake + parseInt(bet.stake);
       if(result.first == bet.selections[0]){
          winnersStake = winnersStake + parseInt(bet.stake);
        }
    });
    var dividend = helpers.calulateDividend(totalStake, winnersStake, "P");
    return cb(null, {'win': dividend} );
}

