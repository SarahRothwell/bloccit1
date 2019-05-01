const adQueries = require("../db/queries.advertisements.js");

module.exports = {
  index(req, res, next){
     adQueries.getAllAds((err, advertisements) => {

       if(err){
         res.redirect(500, "static/index");
       } else {
         res.render("advertisements/index", {advertisements});
       }
     });
  },

  new(req, res, next){
    res.render("advertisements/new");
  },

  create(req, res, next){
     let newAd = {
       title: req.body.title,
       description: req.body.description
     };
     adQueries.addAd(newAd, (err, advertisement) => {
       if(err){
         res.redirect(500, "/advertisements/new");
       } else {
         res.redirect(303, `/advertisements/${advertisement.id}`);
       }
     });
   },

   show(req, res, next){

     adQueries.getAllAds(req.params.id, (err, advertisement) => {

       if(err || advertisement == null){
         res.redirect(404, "/");
       } else {
         res.render("advertisements/show", {advertisement});
       }
     });
   }

}
