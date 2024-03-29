const express = require("express");
const app = express();
const { getArticleById, getAllArticles, patchArticle } = require("./controllers/articles.controllers.js");
const { getTopics } = require("./controllers/topics.controllers.js");
const { getAllEndpoints } = require("./controllers/all-endpoints.controllers.js");
const { getCommentsPerArticleID, postComment, deleteCommentById } = require('./controllers/comments.controllers.js')
const { getAllUsers } = require("./controllers/users.controllers.js")
const cors = require('cors')

app.use(cors());
app.use(express.json())

app.get(`/api/topics`, getTopics);

app.get(`/api`, getAllEndpoints);

app.get('/api/articles', getAllArticles);
app.get("/api/articles/:article_id", getArticleById);
app.patch('/api/articles/:article_id', patchArticle)

app.get('/api/articles/:article_id/comments', getCommentsPerArticleID);
app.post("/api/articles/:article_id/comments", postComment);
app.delete("/api/comments/:comment_id", deleteCommentById)

app.get("/api/users", getAllUsers)

app.use((err, req, res, next) => {
  if(err.code === '23502'){
    res.status(400).send({msg: "Bad request"})
  }
  next(err)
})

app.use((err, req, res, next) => {
    if(err.code === '22P02'){
        res.status(400).send({msg: "Bad request"})
    }
    next(err)
})

app.use((err, req, res, next) => {
  if (err.statusCode && err.msg) {
    res.status(err.statusCode).send(err);
  }
});

app.all('/api/*', (req, res) => {
  res.status(404).send({msg: "Not found"})
})

module.exports = app;
