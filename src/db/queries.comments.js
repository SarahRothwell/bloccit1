const Comment = require("./models").Comment;
const Post = require("./models").Post;
const User = require("./models").User;

const Authorizer = require("../policies/comment");

module.exports = {

  createComment(newComment, callback){
    return Comment.create(newComment)
    .then((comment) => {
      callback(null, comment);
    })
    .catch((err) => {
      callback(err);
    });
  },

  deleteComment(req, callback){
    return Comment.findById(req.params.id)
    .then((comment) => {
      //console.log("comment..........")
    //  console.log(comment);
      const authorized = new Authorizer(req.user, comment).destroy();
    //  console.log("authorized to delete a comment..........")
    //  console.log(authorized);
      if(authorized){
        comment.destroy();
        console.log("If authorized destory comment output.................")
        console.log(comment);
        callback(null, comment);
      } else {
        req.flash("notice", "You are not authorized to do that.")
        callback(401)
      }
    })
  }

}
