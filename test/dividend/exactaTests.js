var expect = require("chai").expect;
var calculateExactaDividend = require('../../lib/dividend/exacta');

var result = {
  first: "2",
  second: "3",
  third: "7"
}

var betsArray  = [
  {"betId":"62ax7b8j6w34ulr","product":"E","selections":["2","3"],"stake":"10","raceId":"62ax7b8j6w32h59"},
  {"betId":"62ax7b8j6w34z67","product":"E","selections":["4","7"],"stake":"10","raceId":"62ax7b8j6w32h59"},
  {"betId":"62ax7b8j6w3556s","product":"E","selections":["5","2"],"stake":"10","raceId":"62ax7b8j6w32h59"}
]

describe("Running tests for calculating exacta bets dividend", function() {
    it("should return a exacta dividend", function() {
       calculateExactaDividend(betsArray,result,function(err, response){
            expect(response).to.be.ok;
            expect(response).to.have.property('exacta');
        })
    });
});