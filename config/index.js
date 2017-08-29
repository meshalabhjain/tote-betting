'use strict'
var jsonfile = require('jsonfile');
var fs = require('fs');
var path = require('path');

/**
* This functions reads the config JSON and return 
* it as JSON object 
*/
module.exports = exports = function config(){
  return jsonfile.readFileSync(path.join('./config', 'config.json'));
}();
