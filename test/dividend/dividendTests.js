var expect = require("chai").expect;
var processDividend = require('../../lib/dividend');

var result = {
  first: "1",
  second: "2",
  third: "3"
}

describe("Running tests for processing dividend", function() {
    it("should provide the output array", function(done) {
       processDividend(result, function(err, response){
            expect(response).to.be.ok;
            expect(response).to.be.an('array');
            expect(response).to.have.lengthOf(5);
            done();
        })
    });
});