const db = require("../db/connection.js");
const {
  selectCommentsPerArticleID,
  insertComment,
  deleteComment,
} = require("../models/comments.model.js");
const { selectArticleById } = require("../models/articles.model.js");

function getCommentsPerArticleID(req, res, next) {
  const { article_id } = req.params;
  return Promise.all([
    selectArticleById(article_id),
    selectCommentsPerArticleID(article_id),
  ])
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
}

function postComment(req, res, next) {
  const { article_id } = req.params;
  const { username, body } = req.body;
  return Promise.all([
    selectArticleById(article_id),
    insertComment(article_id, username, body),
  ])
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
}

function deleteCommentById(req, res, next) {
  const { comment_id } = req.params;
  return deleteComment(comment_id)
  .then(() => {
    res.status(204).send()
  }).catch((err) => {
    next(err)
  })
}

module.exports = { getCommentsPerArticleID, postComment, deleteCommentById };
