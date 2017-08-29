'use strict'

var helpers = require('./helpers');
var u = require('lodash');

module.exports = function calulatExactaDividend(exactaBets, result, cb){
    var totalStake = 0, winnersStake= 0;
    u.each(exactaBets, function(bet){
      totalStake = totalStake + parseInt(bet.stake);
       if(result.first === bet.selections[0] && result.second === bet.selections[1]){
          winnersStake = winnersStake + parseInt(bet.stake);
        }
    });

    var dividend = helpers.calulateDividend(totalStake, winnersStake, "E");
    return cb(null, {'exacta': dividend});
}