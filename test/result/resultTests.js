var expect = require("chai").expect;
var Result = require('../../lib/result');
var uniqid = require('uniqid');

describe("Running tests for result", function() {
    it("should save the result and  provide the output", function(done) {
       Result.create("3","6","4",uniqid(), function(err, response){
            expect(response).to.be.ok;
            done();
        })
    });
});