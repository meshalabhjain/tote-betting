var expect = require("chai").expect;
var validate = require('../../lib/bet/validator');
var uniqid = require('uniqid');

describe("Running tests for bet validator", function() {
    it("should not throw any error when all values passed correctly", function(done) {
       validate("W","2","10", function(err, response){
            expect(err).to.be.not.ok;
            done();
        })
    });

    it("should throw error when any of arguments are missing", function(done) {
       validate("","2","10", function(err, response){
            expect(err).to.have.property('message').to.equal('Product, Selction and Stake are mandatory for betting');
            done();
        })
    });

    it("should throw error when product does not belongs to W, P , E", function(done) {
       validate("T","2","10", function(err, response){
            expect(err).to.have.property('message').to.equal('Product should be one of W, P, E');
            done();
        })
    });


    it("should throw error when selection value is not the positive integer", function(done) {
       validate("E","0,3","10", function(err, response){
            expect(err).to.have.property('message').to.equal('Selection is not valid, Selection should be positive integer');
            done();
        })
    });

    it("should throw error when selection value is not the positive integer in differnt order", function(done) {
       validate("E","2,0","10", function(err, response){
            expect(err).to.have.property('message').to.equal('Selection is not valid, Selection should be positive integer');
            done();
        })
    });

    it("should throw error when stake value is not the positive integer but a float", function(done) {
       validate("E","2,9","-10", function(err, response){
            expect(err).to.have.property('message').to.equal('Stake is not valid, Stake should be positive integer');
            done();
        })
    });

    it("should throw error when stake value is not the positive integer but floating point", function(done) {
       validate("E","2,9","10.8", function(err, response){
            expect(err).to.have.property('message').to.equal('Stake is not valid, Stake should be positive integer');
            done();
        })
    });

    it("should throw error when product is 'E' but slections are not 2", function(done) {
       validate("E","2","10", function(err, response){
            expect(err).to.have.property('message').to.equal('Selection for exacta values should be array of length 2');
            done();
        })
    });

});