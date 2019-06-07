const commentQueries = require("../db/queries.comments.js");
const Authorizer = require("../policies/comment.js");

module.exports = {
  create(req, res, next){

    const authorized = new Authorizer(req.user).create();
    //console.log("authorized to create comment in comment controller...............")
  //  console.log(authorized);
    if(authorized) {

      let newComment = {
        body: req.body.body,
        userId: req.user.id,
        postId: req.params.postId
      };

      commentQueries.createComment(newComment, (err, comment) => {

        if(err){
          req.flash("error", err);
        }
        res.redirect(req.headers.referer);
      });
    } else {
      req.flash("notice", "You must be signed in to do that.")
      res.redirect("/users/sign_in");
    }
  },

  destroy(req, res, next){

    commentQueries.deleteComment(req, (err, comment) => {
    //  console.log("comment query deleteComment activated")
      if(err){
        //console.log("req.headers.referer if err...........");
      //  console.log(req.headers.referer);
        res.redirect(err, req.headers.referer);
      } else {
      //  console.log("req.headers.referer without err...........");
      //  console.log(req.headers.referer);
        res.redirect(req.headers.referer);
      }
    });
  }
}
