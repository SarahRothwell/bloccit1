const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Flair = require("../../src/db/models").Flair;

describe("Flair", () => {

  beforeEach((done) => {
//#1
    this.topic;
    this.flair;
    sequelize.sync({force: true}).then((res) => {

//#2
      Topic.create({
        title: "Expeditions to Alpha Centauri",
        description: "A compilation of reports from recent visits to the star system."
      })
      .then((topic) => {
        //console.log(topic);
        this.topic = topic;
//#3
        Flair.create({
          name: "Flair name",
          color: "Flair colour",
          topicId: this.topic.id
        })
        .then((flair) => {
          this.flair = flair;
          done();
        });
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

  });

//TDD to create a new Flair
describe("#create()", () => {

     it("should create a flair object with a name & color, and assigned topic", (done) => {
//#1

      Flair.create({
        name: "flair #2",
        color: "green",
        topicId: this.topic.id
      })
      .then((flair) => {
            expect(flair.name).toBe("flair #2");
            expect(flair.color).toBe("green");
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
      });
    });

describe("#setTopic()", () => {

    it("should associate a topic and a post together", (done) => {

        Topic.create({
          title: "Challenges of interstellar travel",
          description: "1. The Wi-Fi is terrible"
        })
        .then((newTopic) => {
           expect(this.flair.topicId).toBe(this.topic.id);

           this.flair.setTopic(newTopic)

            .then((flair) => {
              expect(flair.topicId).toBe(newTopic.id);
              done();
             });
        })
      });

    });

describe("#getTopic()", () => {

    it("should return the associated topic", (done) => {

      this.flair.getTopic()
      .then((associatedTopic) => {
        expect(associatedTopic.title).toBe("Expeditions to Alpha Centauri");
        done();
      });

    });

  });

//describeFlair End
});
