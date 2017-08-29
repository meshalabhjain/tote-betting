'use strict'

var helpers = require('./helpers');
var u = require('lodash');

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

