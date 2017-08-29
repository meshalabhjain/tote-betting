'use strict'
var jsonfile = require('jsonfile');
var fs = require('fs');
var path = require('path');

module.exports = exports = function config(){
    return jsonfile.readFileSync(path.join('./config', 'config.json'));
}();
