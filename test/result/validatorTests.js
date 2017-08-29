var expect = require("chai").expect;
var validate = require('../../lib/result/validator');

describe("Running tests for result validator", function() {
    it("should not throw any error when all values passed correctly", function(done) {
       validate("2","3","4", function(err, response){
            expect(err).to.be.not.ok;
            done();
        })
    });

    it("should throw error when any of argument is missing", function(done) {
       validate("","2","10", function(err, response){
            expect(err).to.have.property('message').to.equal('Result should contain all the three positions');
            done();
        })
    });

    it("should throw error when any of argument is not a positive interger", function(done) {
       validate("-1","2","10", function(err, response){
            expect(err).to.have.property('message').to.equal('Result positions should be positive intergers');
            done();
        })
    });


    it.skip("should throw error when any of argument is not a positive interger but floating point number", function(done) {
       validate("1","5","6.3", function(err, response){
            expect(err).to.have.property('message').to.equal('Result positions should be positive intergers');
            done();
        })
    });

    it("should throw error if arguments are not unique", function(done) {
       validate("1","10","10", function(err, response){
            expect(err).to.have.property('message').to.equal('All three positions are expected to be unique');
            done();
        })
    });
});