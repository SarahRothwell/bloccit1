const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/";

describe("routes : static", () => {

//#1
  describe("GET /", () => {

//#2
    it("should return status code 200", (done) => {

//#3
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(body).toContain("Welcome to Bloccit");

//#4
        done();
      });
    });

  });

  //macro test

  describe("GET /marco", () => {
    it("should return a status code 200 with a body response of polo", (done) => {
      request.get(`${base}marco`,(err, res, body) => {
        console.log(res);
        expect(res.statusCode).toBe(200);
        expect(body).toContain("polo");
        done();
      });
    });
  });
});
