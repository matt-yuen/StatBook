const express = require('express');
const axios = require('axios');
const RecommendationEngine = require('./RecommendationEngine');

const app = express();
app.use(express.json());


app.get('/', (req, res) => {
  res.send('StatBook back-end');
});

app.post('/posts', (req, res) => {
  let data;
  const recommendationEngine = new RecommendationEngine();
  recommendationEngine.processPosts(req.body).then((response) => {
    res.json(response);
  });
});

app.listen(8080, () => console.log('Server listening on port 8080!'));
