"use strict";
module.exports = (sequelize, DataTypes) => {
  var Post = sequelize.define("Post", {

    title: {
      type: DataTypes.STRING,
      allowNull: false
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    body: {
      type: DataTypes.STRING,
      allowNull: false
    },

    topicId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Post.associate = function(models) {

    Post.belongsTo(models.Topic, {
      foreignKey: "topicId",
      onDelete: "CASCADE"
    });

    Post.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });

    Post.hasMany(models.Comment, {
      foreignKey: "postId",
      as: "comments"
    });

    Post.hasMany(models.Vote, {
      foreignKey: "postId",
      as: "votes"
    });
  };

//keep count of all votes that a post has
Post.prototype.getPoints = function(){
  if(!this.votes || this.votes.length === 0) return 0
  return this.votes
    .map((v) => { return v.value })
    .reduce((prev, next) => { return prev + next });
};

Post.prototype.hasUpvoteFor = function(userId, callback){

  //if(!this.votes || this.votes.length === 0) return false;
  return this.votes
    .filter((v) => {return v.userId == userId && v.value == 1})
    .then((v) => {
      if (votes.length != 0){
        callback(true);
      } else {
        callback(false);
      }
    })


/*
  return this.votes.filter((v) => {
    if(v.userId == userId && v.value ==1) {
      return true;
    };
  });

/*
    let findVote = this.votes.filter((vote) => {return vote.value == 1 && vote.userId == userId});
    if (!findVote.length){
      return callback (false);
    } else {
      return callback (true);
    };
*/
};

  Post.prototype.hasDownvoteFor = function(){

  };

  return Post;
};
