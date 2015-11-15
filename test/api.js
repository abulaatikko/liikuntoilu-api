var supertest = require('supertest');
var should = require('should');
var config = require('../app/backend/config.js');

var server = supertest.agent('http://' + config.host);

describe("Liikuntoilu unit tests", function(){

  it("should return front page", function(done) {
    server.get("/")
    .expect("Content-type", /html/)
    .end(function(err, res) {
      res.status.should.equal(200);
      res.text.should.match(/R\.I\.P\./);
      done();
    });
  });

  it("should return api documentation", function(done) {
    server.get("/api/")
    .expect("Content-type", /html/)
    .end(function(err, res) {
      res.status.should.equal(200);
      res.text.should.match(/API\ documentation \(v1\)/);
      done();
    });
  });

  it("should return participants json", function(done) {
    server.get("/api/v1/participants/")
    .expect("Content-type", /json/)
    .end(function(err, res) {
      res.status.should.equal(200);
      res.body[0].should.have.property("id");
      res.body[0].id.should.be.equal(0);
      res.body[0].should.have.property("name");
      res.body[0].name.should.be.equal("Abula");
      res.body[0].should.have.property("active");
      res.body[0].active.should.be.equal(true);
      done();
    });
  });

  it("should return events json", function(done) {
    server.get("/api/v1/events/")
    .expect("Content-type", /json/)
    .end(function(err, res) {
      res.status.should.equal(200);
      res.body[4].should.have.property("id");
      res.body[4].id.should.be.equal(4);
      res.body[4].should.have.property("name");
      res.body[4].name.should.be.equal("Hiihto");
      res.body[4].should.have.property("active");
      res.body[4].active.should.be.equal(true);
      res.body[4].should.have.property("default_speed");
      res.body[4].default_speed.should.be.equal(10000);
      done();
    });
  });

  it("should return exercices json", function(done) {
    server.get("/api/v1/exercices/")
    .expect("Content-type", /json/)
    .end(function(err, res) {
      res.status.should.equal(200);
      res.body[1234].should.have.property("id");
      res.body[1234].id.should.be.equal(1249);
      res.body[1234].should.have.property("created");
      res.body[1234].created.should.be.equal("2005-09-07T01:38:14.000Z");
      res.body[1234].should.have.property("started");
      res.body[1234].started.should.be.equal("2005-09-07T01:38:14.000Z");
      res.body[1234].should.have.property("participant_id");
      res.body[1234].participant_id.should.be.equal(7);
      res.body[1234].should.have.property("event_id");
      res.body[1234].event_id.should.be.equal(29);
      res.body[1234].should.have.property("pace");
      res.body[1234].pace.should.be.equal(0);
      res.body[1234].should.have.property("comment");
      res.body[1234].comment.should.be.equal("6,36 km. Ja haitarimusiikkia livenä 5h.");
      res.body[1234].should.have.property("distance");
      res.body[1234].distance.should.be.equal(0);
      res.body[1234].should.have.property("duration");
      res.body[1234].duration.should.be.equal(2700);
      done();
    });
  });

  it("should return participant json", function(done) {
    server.get("/api/v1/participants/0/")
    .expect("Content-type", /json/)
    .end(function(err, res) {
      res.status.should.equal(200);
      res.body.should.have.property("name");
      res.body.name.should.be.equal("Abula");
      done();
    });
  });

  it("should return participant's events json", function(done) {
    server.get("/api/v1/participants/0/events/")
    .expect("Content-type", /json/)
    .end(function(err, res) {
      res.status.should.equal(200);
      res.body[0].should.have.property("id");
      res.body[0].should.have.property("name");
      res.body[0].should.have.property("active");
      res.body[0].should.have.property("default_speed");
      done();
    });
  });

  it("should return participant's exercices json", function(done) {
    server.get("/api/v1/participants/0/exercices/")
    .expect("Content-type", /json/)
    .end(function(err, res) {
      res.status.should.equal(200);
      res.body[0].should.have.property("id");
      res.body[0].should.have.property("participant_id");
      res.body[0].participant_id.should.be.equal(0);
      res.body[0].should.have.property("event_id");
      done();
    });
  });

  it("should return participant's exercices in a specific event json", function(done) {
    server.get("/api/v1/participants/0/events/6/exercices/")
    .expect("Content-type", /json/)
    .end(function(err, res) {
      res.status.should.equal(200);
      res.body[0].should.have.property("id");
      res.body[0].should.have.property("participant_id");
      res.body[0].participant_id.should.be.equal(0);
      res.body[0].should.have.property("event_id");
      res.body[0].event_id.should.be.equal(6);
      done();
    });
  });

  it("should return event json", function(done) {
    server.get("/api/v1/events/6/")
    .expect("Content-type", /json/)
    .end(function(err, res) {
      res.status.should.equal(200);
      res.body.should.have.property("id");
      res.body.should.have.property("name");
      res.body.should.have.property("active");
      res.body.should.have.property("default_speed");
      done();
    });
  });

  it("should return event's participants json", function(done) {
    server.get("/api/v1/events/6/participants/")
    .expect("Content-type", /json/)
    .end(function(err, res) {
      res.status.should.equal(200);
      res.body[0].should.have.property("id");
      res.body[0].should.have.property("name");
      res.body[0].should.have.property("active");
      done();
    });
  });

  it("should return events's exercices json", function(done) {
    server.get("/api/v1/events/6/exercices/")
    .expect("Content-type", /json/)
    .end(function(err, res) {
      res.status.should.equal(200);
      res.body[0].should.have.property("id");
      res.body[0].should.have.property("event_id");
      res.body[0].event_id.should.be.equal(6);
      res.body[0].should.have.property("participant_id");
      done();
    });
  });

  it("should return exercice json", function(done) {
    server.get("/api/v1/exercices/1234/")
    .expect("Content-type", /json/)
    .end(function(err, res) {
      res.status.should.equal(200);
      res.body.should.have.property("id");
      res.body.id.should.be.equal(1234);
      res.body.should.have.property("participant_id");
      res.body.should.have.property("event_id");
      res.body.should.have.property("pace");
      done();
    });
  });

});
