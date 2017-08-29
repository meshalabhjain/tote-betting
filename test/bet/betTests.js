var expect = require("chai").expect;
var Bet = require('../../lib/bet');
var uniqid = require('uniqid');

describe("Running tests for bet", function() {
    it("should get created and saved in file system", function(done) {
       Bet.create("W","2","10",uniqid(), function(err, response){
            expect(response).to.be.ok;
            done();
        })
    });

    it("should create Exacta bet with array of size 2", function(done) {
       Bet.create("E","2,3","10",uniqid(), function(err, response){
            expect(response).to.be.ok;
            expect(response.selections).to.be.ok;
            expect(response.selections).to.be.an('array');
            expect(response.selections).to.have.lengthOf(2);
            done();
        })
    });


});