'use strict'
var u = require('lodash');

function validate(product, selection, stake, cb){
    
    if(!product || !selection || !stake){
      return cb(new Error("Product, Selction and Stake are mandatory for betting"));
    }

    if(['W','P','E'].indexOf(product) <0){
      return cb(new Error("Product should be one of W, P, E"));
    }

    var selectionArray = selection.split(',');
    if(selectionArray[0] <= 0){
      return cb(new Error("Selection is not valid, Selection should be positive integer"));
    }

    if(product === "E" && selectionArray[1] <= 0){
      return cb(new Error("Selection is not valid, Selection should be positive integer"));
    }

    if(stake <= 0 ){
      return cb(new Error("Stake is not valid, Stake should be positive integer"));
    }

    if(product === "E" && selectionArray.length !== 2){
      return cb(new Error("Selection for exacta values should be array of length 2"));
    }

    cb();

}

module.exports = validate;