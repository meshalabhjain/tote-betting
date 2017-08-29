var expect = require("chai").expect;
var utils = require('../../lib/utils');

var sampleObject = {
  PropertyIdentifier: "123",
  propertyOne: "One",
  propertyTwo: 2,
  propertyThree: true
};


describe("Running tests for utils functions", function() {
    it("should add the object in the json file", function(done) {
       utils.create('./test/utils/sampleData','test.json',sampleObject,function(err, response){
            expect(err).to.be.not.ok;
            done();
        })
    });

    it("should read all objects in the json file", function(done) {
       utils.find('./test/utils/sampleData','test.json',function(err, response){
            expect(err).to.be.not.ok;
            expect(response).to.be.ok;
            expect(response).to.be.an('array');
            expect(response[0].PropertyIdentifier).to.be.equal("123");
            done();
        })
    });

    it("should read objects in the json file based on the query", function(done) {
       utils.find('./test/utils/sampleData','test.json',{"PropertyIdentifier": "456"},function(err, response){
            expect(err).to.be.not.ok;
            expect(response).to.be.ok;
            expect(response).to.be.an('array');
            expect(response).to.have.lengthOf(0);
            done();
        })
    });

    it("should update objects in the json file based on the input parameters", function(done) {
       utils.update('./test/utils/sampleData','test.json',{"PropertyIdentifier": "123"},'propertyTwo', 3, function(err, response){
          expect(err).to.be.not.ok;
            utils.find('./test/utils/sampleData','test.json',{"PropertyIdentifier": "123"},function(err, response){
            expect(err).to.be.not.ok;
            expect(response).to.be.ok;
            expect(response).to.be.an('array');
            expect(response[0].propertyTwo).to.be.equal(3);
            utils.update('./test/utils/sampleData','test.json',{"PropertyIdentifier": "123"},'propertyTwo', 2, function(err, response){
            //reverting the values to original for next test run
            done();
            })  
          })
        })
    });




});