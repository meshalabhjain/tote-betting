var expect = require("chai").expect;
var calculatePlaceDividend = require('../../lib/dividend/place');

var result = {
  first: "1",
  second: "4",
  third: "3"
}

var betsArray  = [
  {"betId":"62ax7b8j6w34ulr","product":"P","selections":["3"],"stake":"10","raceId":"62ax7b8j6w32h59"},
  {"betId":"62ax7b8j6w34z67","product":"P","selections":["4"],"stake":"10","raceId":"62ax7b8j6w32h59"},
  {"betId":"62ax7b8j6w3556s","product":"P","selections":["5"],"stake":"10","raceId":"62ax7b8j6w32h59"}
]

describe("Running tests for calculating place bets dividend", function() {
    it("should return a place dividend", function() {
       calculatePlaceDividend(betsArray,result,function(err, response){
            expect(response).to.be.ok;
            expect(response).to.have.property('place-first');
            expect(response).to.have.property('place-second');
            expect(response).to.have.property('place-third');
        })
    });
});