'use strict'

var fs = require('fs');
var path = require('path');
var Promise = require('bluebird');
var u = require('lodash');

/**
* This function takes the list of arguments, and using those 
* find the file and gets the out.if query parameter is 
* not passed it returns the complete set 
* @param {dirPath} - dir of the file
* @param {fileName} - name of the file
* @param {query} - query for find in the format {key: value}
* @param {cb} - callback 
*/
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
      cb(err);
   });
}

/**
* This function takes the list of arguments, and using those 
* find the file and gets the out.if query parameter is 
* not passed it returns the complete set 
* @param {dirPath} - dir of the file
* @param {fileName} - name of the file
* @param {query} - query for identify the record, It is in format {key: value}
* @param {key} - key whose value to be updated
* @param {value} - value to be updated
* @param {cb} - callback 
*/
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

/**
* This function takes the list of arguments, and with adds 
* the record in the file storage. For this it read file, 
* parse it in JSON and adds a record to it before writing the file again.
* @param {dirPath} - dir of the file
* @param {fileName} - name of the file
* @param {object} - record to be updated
* @param {cb} - callback 
*/
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