var express = require('express');
var router = express.Router();
var Bet = require('../lib/bet');
var race = require('../lib/race');
var result = require('../lib/result')
var utils = require('../lib/utils')


router.post('/races/:raceId/bets', function(req, res){
  var betString = req.body.bet? req.body.bet.trim() : req.body.bet;
  var parsedBet = utils.parseBet(betString);
  Bet.create(parsedBet.product, parsedBet.selection, parsedBet.stake, req.params.raceId, function(err, bet){
    if(err){
      res.render('bets', {error: err, raceId: bet.raceId});
    }
    res.render('bets', {raceId: bet.raceId});
  })
});

router.get('/races/:raceId/bets', function(req, res) {
  res.render('bets', {raceId: req.params.raceId});
});

router.get('/races/:raceId/results', function(req, res){
  res.render('results', {raceId: req.params.raceId});
});

router.post('/races/:raceId/results', function(req, res){
  var resultString = req.body.result? req.body.result.trim() : req.body.result;
  var parsedResult = utils.parseResult(resultString);
  result.create(parsedResult.first, parsedResult.second, parsedResult.third, req.params.raceId, function(err, output){
    if(err){
       res.render('results', {raceId: req.params.raceId,output: output , error: err})
    }
    res.render('results', {raceId: req.params.raceId,output: output})
  })
});

router.get('/', function(req, res) {
  race.findOrCreate(req, function(err, raceResponse){
    res.redirect('/races/'+raceResponse.raceId+'/bets');
  });    
});

module.exports = router;
