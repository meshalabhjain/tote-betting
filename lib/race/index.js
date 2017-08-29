'use strict'

var uniqid = require('uniqid');
var path = require('path');
var Promise = require('bluebird');
var u = require('lodash');
var utils = require('../utils');


/**
* Race class
* @constructor
* @param {name} - Name of the race
* @param {date} - Date of the race 
* @param {location} - Location of the race
*/
function Race(name, date, location) {
  this.raceId = uniqid();
  this.name = name;
  this.date = date;
  this.location = location;
  this.completed = false;
}

Race.findOrCreate = function(req, cb){
  Promise.promisify(utils.find)('./db/', 'races.json')
    .then(function(data){
        //Picking last race as the current race
        var raceData = data[data.length-1];
        if(raceData && raceData.completed === false){
          return cb(null, raceData);
        }else{
          return Race.create(req, cb);
        }
    }).catch(function(err){
        console.log("Error in retriving the race data",err);
        return Race.create(req, cb);
    });
}

Race.create = function (req, cb){  
   req.body = req.body?req.body:{};
   var raceName = req.body.name? req.body.name: "Amazing Race";
   var raceDate = req.body.date? req.body.date: new Date();
   var raceLocation = req.body.location? req.body.location: "Sydney";
   var race = new Race (raceName, raceDate, raceLocation);
   Promise.promisify(utils.create)('./db/', 'races.json', race)
    .then(function(){
      cb(null, race);
    }).catch(function(err){
      cb(err);
    });
}

module.exports = Race;

