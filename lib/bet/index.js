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


Bet.create = function(product, selection, stake, raceId, cb){
  Promise.promisify(validate)(product, selection, stake)
    .then(function(){
      var selections = selection.split(',');
        return save(product, selections, stake, raceId, cb);
    }).catch(function(err){
       cb(err);
    });
}

function save(product, selections, stake, raceId, cb){
  var bet = new Bet (product, selections, stake, raceId);
  Promise.promisify(utils.create)('./db/', 'bets.json', bet)
    .then(function(){
      cb(null, bet);
    }).catch(function(err){
      cb(err);
    })
}

module.exports = exports = Bet;

