const Comment = require("./models").Comment;
const Post = require("./models").Post;
const User = require("./models").User;
const Vote = require("./models").Vote;

module.exports = {
  createVote(req, val, callback){

//look for Vote object with the userId and postId
    return Vote.findOne({
      where: {
        postId: req.params.postId,
        userId: req.user.id
      }
    })
    .then((vote) => {

//If a vote is found, update vote value
      if(vote){
        vote.value = val;
        vote.save()
        .then((vote) => {
          callback(null, vote);
        })
        .catch((err) => {
          callback(err);
        });
      } else {

//If a vote is not found, create new vote
        Vote.create({
          value: val,
          postId: req.params.postId,
          userId: req.user.id
        }).then((vote) => {
          callback(null, vote);
        })
        .catch((err) => {
          callback(err);
        });
      }
    });
  }
}
