const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const User = require("../../src/db/models").User;

describe("Topic", () => {

  beforeEach((done) => {
    this.topic;
    this.post;
    this.user;

    sequelize.sync({force: true}).then((res) => {

      User.create({
        email: "starman@tesla.com",
        password: "Trekkie4lyfe"
      })
      .then((user) => {
        this.user = user; //store the user

        Topic.create({
          title: "Expeditions to Alpha Centauri",
          description: "A compilation of reports from recent visits to the star system.",
          posts: [{
            title: "My first visit to Proxima Centauri b",
            body: "I saw some rocks.",
            userId: this.user.id
          }]
        }, {
          include: {
            model: Post,
            as: "posts"
          }
        })
        .then((topic) => {
          //console.log(topic);
          this.topic = topic; //store the topic
          this.post = topic.posts[0]; //store the post
          //console.log(this.post);
          done();
        })
      })
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

    it("should return the associated posts", (done) => {

      this.topic.getPosts()
      .then((associatedPosts) => {
        expect(associatedPosts[0].title).toBe("My first visit to Proxima Centauri b");
        done();
      });

    });

  });

});
