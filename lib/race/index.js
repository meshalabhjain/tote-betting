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

/**
* This method get the last race stored in the file storage
* If that race is not maked completed it returns the same race 
* else it creates and new race.
* @param {req}  - Request Object 
* @param {cb} - callback function
*/
Race.findOrCreate = function(req, cb){
  Promise.promisify(utils.find)('./db/', 'races.json')
    .then(function(data){
        //Picking last race as the current race
        var raceData = data[data.length-1];
        if(raceData && raceData.completed === false){
          return cb(null, raceData);
        }else{
          // If no race is open create the new race
          return Race.create(req, cb);
        }
    }).catch(function(err){
        // If there is a error in retriving the race data 
        // Create a new race
        return Race.create(req, cb);
    });
}

/**
* This method creates the new race and store it in file system.
* If no race data is specified it creates race using default data
* @param {req}  - Request Object 
* @param {cb} - callback function
*/
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

