const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/advertisements/";
const sequelize = require("../../src/db/models/index").sequelize;
const Advertisement = require("../../src/db/models").Advertisement;

describe ("routes : advertisements", () => {

  beforeEach((done) => {
    this.advertisement;
    sequelize.sync({force: true}).then((res) => {
      Advertisement.create({
        title: "ad title",
        description: "ad description"
      })
      .then((advertisement) => {
        this.advertisement = advertisement;
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });
  });

  describe("GET /advertisements", () => {

      it("should return a status code 200 and all advertisements", (done) => {
        request.get(base, (err, res, body) => {
          expect(res.statusCode).toBe(200);
          expect(err).toBeNull();
          expect(body).toContain("Advertisements");
          done();
        });
      });
    });

  describe("GET /advertisements/new", () => {

    it("should render a new advertisement form", (done) => {
      request.get(`${base}new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Advertisement title");
        done();
        });
      });
    });

  describe("POST /advertisements/create", () => {
    const options = {
      url: `${base}create`,
      form: {
        title: "Ad#1",
        description: "Description of Ad#1"
      }
    };

    it("should create a new advertisement and redirect", (done) => {

//#1
    request.post(options,

//#2
        (err, res, body) => {
          Advertisement.findOne({where: {title: "Ad#1"}})
          .then((advertisement) => {
            expect(res.statusCode).toBe(303);
            expect(advertisement.title).toBe("Ad#1");
            expect(advertisement.description).toBe("Description of Ad#1");
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
        }
      );
    });
  });

  describe("GET /advertisements/:id", () => {

    it("should render a view with the selected advertisement", (done) => {
      request.get(`${base}${this.advertisement.id}`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("View an advertisement");
        done();
      });
    });

  });

  describe("POST /advertisements/:id/destroy", () => {

  it("should delete the ad with the associated ID", (done) => {

    Advertisement.all()
    .then((advertisement) => {

      const adCountBeforeDelete = advertisements.length;

      expect(adCountBeforeDelete).toBe(1);

      request.post(`${base}${this.advertisement.id}/destroy`, (err, res, body) => {
        Advertisement.all()
        .then((advertisement) => {
          expect(err).toBeNull();
          expect(advertisements.length).toBe(adCountBeforeDelete - 1);
          done();
        })

      });
    });

  });

});

  });
