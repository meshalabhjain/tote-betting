'use strict'

/**
* Validates the bet input fields
* validator to validate those and on sucesss saves them on file storage.
* @param {product}  - Specifies type of bet
* @param {selections} - Provides selection on which horse will win 
* @param {stake} - Amount put as a bet in th race
* @param {cb} - callback function
*/
function validate(product, selection, stake, cb){
    
    if(!product || !selection || !stake){
      return cb(new Error("Product, Selction and Stake are mandatory for betting"));
    }

    if(['W','P','E'].indexOf(product) <0){
      return cb(new Error("Product should be one of W, P, E"));
    }

    var selectionArray = selection.split(',');
    
    if(product === "E" && selectionArray.length !== 2){
      return cb(new Error("Selection for exacta values should be array of length 2"));
    }
    
    if(parseInt(selectionArray[0]) != selectionArray[0] ||  selectionArray[0] <=0){
      return cb(new Error("Selection is not valid, Selection should be positive integer"));
    }

    if(product === "E" && (parseInt(selectionArray[1]) != selectionArray[1] ||  selectionArray[1] <=0)){
      return cb(new Error("Selection is not valid, Selection should be positive integer"));
    }

    if(parseInt(stake) != stake|| stake<=0){
      return cb(new Error("Stake is not valid, Stake should be positive integer"));
    }

    cb();

}

module.exports = validate;