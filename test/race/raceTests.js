var expect = require("chai").expect;
var Race = require('../../lib/race');


var req = {
    body: {
      name: "Another Amazing Race",
      date: "2017-08-08",
      location: "melbourne"
    }
}

var reqNoParams = {
  body: {}
}

describe("Running tests for Race", function() {
    it("should create the race when req have params", function(done) {
       Race.create(req, function(err, response){
            expect(response).to.be.ok;
            expect(response.name).to.equal("Another Amazing Race");
            done();
        })
    });

    it("should create the race with default values", function(done) {
       Race.create(reqNoParams, function(err, response){
            expect(response).to.be.ok;
            expect(response.name).to.equal("Amazing Race");
            done();
        })
    });

    it("should craete the race if race not present or else create a new race", function(done) {
       Race.findOrCreate(reqNoParams, function(err, response){
            expect(response).to.be.ok;
            expect(response.name).to.equal("Amazing Race");
            //This time function is called with request parmeters
            Race.findOrCreate(req, function(err, responseSecondRace){
              expect(response).to.be.ok;
              expect(responseSecondRace.name).to.equal("Amazing Race");
              expect(response.raceId).to.equal(responseSecondRace.raceId);
              done();
            })  
        })
    });
});