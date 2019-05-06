module.exports = {
  validatePosts(req, res, next) {

//#1
    if(req.method === "POST") {

//#2
      req.checkParams("topicId", "must be valid").notEmpty().isInt();
      req.checkBody("title", "must be at least 2 characters in length").isLength({min: 2});
      req.checkBody("body", "must be at least 10 characters in length").isLength({min: 10});
    }

//#3
    const errors = req.validationErrors();

    if (errors) {

//#4
      req.flash("error", errors);
      return res.redirect(303, req.headers.referer)
    } else {
      return next();
    }
  },

  validateTopics(req, res, next) {

    if(req.method === "POST") {
      //req.checkParams("id", "must be valid").notEmpty().isInt();
      req.checkBody("title", "must be at least 5 characters in length").isLength({min: 2});
      req.checkBody("description", "must be at least 10 characters in length").isLength({min: 10});
    }

    const errors = req.validationErrors();

    if (errors) {
      //console.log(errors);
      req.flash("error", errors);
      return res.redirect(303, req.headers.referer)
    } else {
      return next();
    }
  }

}
