var expect = require("chai").expect;
var dividendHelpers = require('../../lib/dividend/helpers');

var result = {
  first: "1",
  second: "2",
  third: "3"
};


var winBetDividend = {'win': 3.23} ;
var placeBetDividend = {'place-first': 2.34,
                      'place-second': 1.23,
                      'place-third': 4.98};
var exactaBetDividend = {'exacta': 3.45};


describe("Running tests for dividend helper", function() {
    it("should calculate dividend", function() {
       dividendHelpers.calulateDividend(100,25,"W",function(err, response){
            console.log('response');
            expect(response).to.be.ok;
        })
    });

    it("should expect output array", function() {
       dividendHelpers.formatOutput(winBetDividend, placeBetDividend, exactaBetDividend, result, function(err, response){
            expect(response).to.be.ok;
            expect(response).to.be.an('array');
            expect(response).to.have.lengthOf(5);
        })
    });
});