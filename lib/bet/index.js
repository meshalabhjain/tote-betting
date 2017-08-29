'use strict'
var uniqid = require('uniqid');
var validate = require('./validator.js');
var Promise = require('bluebird');
var utils = require('../utils');
var config = require('../../config');


/**
* Bet class
* @constructor
* @param {product}  - Specifies type of bet
* @param {selections} - Provides selection on which horse will win 
* @param {stake} - Amount put as a bet in th race
* @param {raceId} - Id of the current race 
*/
function Bet(product, selections, stake, raceId) {
  this.betId = uniqid();
  this.product = product;
  this.selections = selections;
  this.stake = stake;
  this.raceId = raceId;
}


/**
* This function gets the bet string , parses it, calls the 
* validator to validate those and on sucesss saves them on file storage.
* @param {betString}  - input string for bet data
* @param {raceId} - Id of the current race
* @param {cb} - callback function
*/
Bet.create = function(betString, raceId, cb){
  Promise.promisify(utils.parseBet)(betString)
    .then(function(parsedBet){
         return Promise.promisify(validate)(parsedBet.product, parsedBet.selection, parsedBet.stake)
          .then(function(){
            var selections = parsedBet.selection.split(',');
              return save(parsedBet.product, selections, parsedBet.stake, raceId, cb);
          })
    }).catch(function(err){
       cb(err);
    });

}

/**
* This function takes a list of arguments for bet data,
* and save them on file storage using utility function.
* @param {product}  - Specifies type of bet
* @param {selections} - Provides selection on which horse will win 
* @param {stake} - Amount put as a bet in th race
* @param {raceId} - Id of the current race
* @param {cb} - callback function
*/
function save(product, selections, stake, raceId, cb){
  var bet = new Bet (product, selections, stake, raceId);
  Promise.promisify(utils.create)('./db/', 'bets.json', bet)
    .then(function(){
      cb(null, bet);
    }).catch(function(err){
      cb(err);
    })
}

module.exports = Bet;

