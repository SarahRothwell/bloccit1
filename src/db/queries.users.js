// #1
const User = require("./models").User;
const Post = require("./models").Post;
const Comment = require("./models").Comment;
const Favorite = require("./models").Favorite;
const bcrypt = require("bcryptjs");

module.exports = {
// #2
  createUser(newUser, callback){

// #3
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(newUser.password, salt);

// #4
    return User.create({
      email: newUser.email,
      password: hashedPassword
    })
    .then((user) => {
      callback(null, user);
    })
    .catch((err) => {
      callback(err);
    })
  },

  getUser(id, callback){

      let result = {};
      User.findById(id)
      .then((user) => {

        if(!user) {
          callback(404);
        } else {

          result["user"] = user;

          Post.scope({method: ["lastFiveFor", id]}).findAll()
          .then((posts) => {
            result["posts"] = posts;

            Comment.scope({method: ["lastFiveFor", id]}).findAll()
            .then((comments) => {
              result["comments"] = comments;

            Favorite.scope({method: ["FavoritesForPost", id]}).findAll()
            .then((favorites) => {
              result["favorites"] = favorites;
              callback(null, result);
              })
            })
            .catch((err) => {
              callback(err);
            })
        })
      }
    })
  }
}
