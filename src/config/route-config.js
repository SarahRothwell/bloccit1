module.exports = {
  init(app){
    const staticRoutes = require("../routes/static");
    const topicRoutes = require("../routes/topics");
    const adRoutes = require("../routes/advertisements");
    const postRoutes = require("../routes/posts");
    const flairRoutes = require("../routes/flairs");
    const userRoutes = require("../routes/users");
    const commentRoutes = require("../routes/comments");
    const voteRoutes = require("../routes/votes");

    if(process.env.NODE_ENV === "test") {
      const mockAuth = require("../../spec/support/mock-auth.js");
      mockAuth.fakeIt(app);
    }

    app.use(staticRoutes);
    app.use(topicRoutes);
    app.use(adRoutes);
    app.use(postRoutes);
    app.use(flairRoutes);
    app.use(userRoutes);
    app.use(commentRoutes);
    app.use(voteRoutes);
  }
}
