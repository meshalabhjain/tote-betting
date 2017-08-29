var expect = require("chai").expect;
var calculateWinDividend = require('../../lib/dividend/win');

var result = {
  first: "1",
  second: "4",
  third: "3"
}

var betsArray  = [
  {"betId":"62ax7b8j6w34ulr","product":"W","selections":["3"],"stake":"10","raceId":"62ax7b8j6w32h59"},
  {"betId":"62ax7b8j6w34z67","product":"W","selections":["4"],"stake":"10","raceId":"62ax7b8j6w32h59"},
  {"betId":"62ax7b8j6w3556s","product":"W","selections":["5"],"stake":"10","raceId":"62ax7b8j6w32h59"}
]

describe("Running tests for calculating win bets dividend", function() {
    it("should return a win dividend", function() {
       calculateWinDividend(betsArray,result,function(err, response){
            expect(response).to.be.ok;
            expect(response).to.have.property('win');
        })
    });
});