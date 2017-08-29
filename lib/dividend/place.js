'use strict'

var helpers = require('./helpers');
var u = require('lodash');

module.exports = function calulatPlaceDividend(placeBets, result, cb){
    var totalStake = 0, winnersStakeForFirst = 0, winnersStakeForSecond = 0, winnersStakeForThird = 0;
    u.each(placeBets, function(bet){
      totalStake = totalStake + parseInt(bet.stake);
       if(result.first == bet.selections[0]){
          winnersStakeForFirst = winnersStakeForFirst + parseInt(bet.stake);
        }else if(result.second == bet.selections[0]){
          winnersStakeForSecond = winnersStakeForSecond + parseInt(bet.stake);
        }else if(result.third == bet.selections[0]){
          winnersStakeForThird = winnersStakeForThird + parseInt(bet.stake);          
        }
    });
    var SplittedStake = totalStake/3;
    var devidendFirstPlace = helpers.calulateDividend(SplittedStake, winnersStakeForFirst, "P");
    var devidendSecondPlace = helpers.calulateDividend(SplittedStake, winnersStakeForSecond, "P");
    var devidendThirdPlace = helpers.calulateDividend(SplittedStake, winnersStakeForThird, "P");
    return cb(null,  {'place-first': devidendFirstPlace,
                      'place-second': devidendSecondPlace,
                      'place-third': devidendThirdPlace});
}
