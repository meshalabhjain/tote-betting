'use strict'

var fs = require('fs');
var path = require('path');
var Promise = require('bluebird');
var u = require('lodash');

exports.find = function(dirPath, fileName, query, cb){
  if(typeof query === 'function'){
    cb = query;
    query = null;
  }else{
    var key = Object.keys(query)[0];
  }

  Promise.promisify(fs.readFile)(path.join(dirPath, fileName),{encoding: 'utf-8'})
    .then(function(data){
        var parcedData = data? JSON.parse(data): [];
        if(query !== null){
           var filteredData = u.filter(parcedData, function(dataObject){
                          if(dataObject[key] === query[key]){
                              return dataObject;
                          }
                        });
           return cb(null, filteredData); 
        }
        return cb(null, parcedData);
   }).catch(function(err){
      console.log('Error::', err);
      cb(err);
   });
}

exports.update = function(dirPath, fileName, query, key, value, cb){
  Promise.promisify(fs.readFile)(path.join(dirPath, fileName),{encoding: 'utf-8'})
    .then(function(data){
        var parcedData = data? JSON.parse(data): [];
        parcedData = Array.isArray(parcedData)? parcedData: [parcedData];
        var Identifierkey= Object.keys(query)[0];
        var updatedData = u.map(parcedData, function(dataObject){
                            if(dataObject[Identifierkey] === query[Identifierkey]){
                              dataObject[key] = value;
                            }
                            return dataObject;
                          });
        return updatedData;
   }).then(function(updatedData){
      return Promise.promisify(fs.writeFile)(path.join(dirPath, fileName), JSON.stringify(updatedData))
        .then(function(){
          cb();
       })
   }).catch(function(err){
      cb(err);
   });   
}

exports.create = function(dirPath, fileName, object, cb){
  Promise.promisify(fs.readFile)(path.join(dirPath, fileName),{encoding: 'utf-8'})
    .then(function(data){
        var parcedData = data? JSON.parse(data): [];
        parcedData = Array.isArray(parcedData)? parcedData: [parcedData];
        parcedData.push(object);
        return parcedData;
   }).then(function(parcedData){
      return Promise.promisify(fs.writeFile)(path.join(dirPath, fileName), JSON.stringify(parcedData))
        .then(function(){
          cb();
       })
   }).catch(function(err){
      cb(err);
   });   
}

exports.parseBet = function(betString){
    var betArray = betString.split(':');
    return {"product": betArray[1],
            "selection": betArray[2],
             "stake": betArray[3]};
}

exports.parseResult = function(resultString){
    var resultArray = resultString.split(':');
    return {"first": resultArray[1],
            "second": resultArray[2],
             "third": resultArray[3]};
}