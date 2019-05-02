const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;

describe("Topic", () => {

  beforeEach((done) => {
//#1
    this.topic;
    this.post;
    sequelize.sync({force: true}).then((res) => {

//#2
      Topic.create({
        title: "Expeditions to Alpha Centauri",
        description: "A compilation of reports from recent visits to the star system."
      })
      .then((topic) => {
        this.topic = topic;
//#3
        Post.create({
          title: "First Post",
          body: "Description of First Post",
          topicId: this.topic.id
        })
        .then((post) => {
          this.post = post;
          done();
        });
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

  });

//create Topic TDD

describe("#create()", () => {

    it("should create a topic object with a title and description", (done) => {

      Topic.create({
        title: "Pros of Cryosleep during the long journey",
        description: "1. Not having to answer the 'are we there yet?' question.",
        //topicId: this.topic.id
      })
      .then((topic) => {

        expect(topic.title).toBe("Pros of Cryosleep during the long journey");
        expect(topic.description).toBe("1. Not having to answer the 'are we there yet?' question.");
        done();

      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

  it("should not create a topic object without missing a title or description", (done) => {

    Topic.create({

      })
      .then((topic) => {
        done();

      })
      .catch((err) => {
        expect(err.message).toContain("Topic.title cannot be null");
        expect(err.message).toContain("Topic.description cannot be null");
        done();
      })
    });

  });

describe("#getPosts()", () => {

  it("should create and associate a post with the topic in scope", (done) => {
    Post.create({
      title: "Second Post",
      body: "Second Post Description",
      topicId: this.topic.id
    })
    .then((posts) => {
      this.topic.getPosts()
      .then((posts) => {
        expect(posts[0].title).toBe("First Post");
        expect(posts[1].title).toBe("Second Post");
        done();
      })
    })
    .catch((err) => {
      console.log(err);
      done();
    });

  });

});


});
