const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, resp) => {
  const { id } = req.params;

  const comments = commentsByPostId[id] || [];

  resp.status(201).send(comments);
});

app.post('/posts/:id/comments/', async (req, resp) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;
  const { id } = req.params;

  const comments = commentsByPostId[id] || [];

  comments.push({ id: commentId, content });

  commentsByPostId[id] = comments;

  await axios.post('http://localhost:4005/events', {
    type: 'CommentCreated',
    data: {
      id: commentId,
      content: content,
      postId: req.params.id,
    },
  });

  resp.status(201).send(comments);
});

app.post('/events', (req, res) => {
  console.log('Recieved event', req.body.type);

  res.send({});
});

app.listen(4001, () => {
  console.log('Listening on 4001');
});
