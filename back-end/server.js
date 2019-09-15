const express = require('express');
const axios = require('axios');
const RecommendationEngine = require('./RecommendationEngine');

const app = express();
const HTTP_PORT = process.env.PORT || 8080;
app.use(express.json());


app.get('/', (req, res) => {
  res.send('StatBook back-end');
});

app.post('/posts', (req, res) => {
  let data;
  const recommendationEngine = new RecommendationEngine();

  const suggestions = recommendationEngine.createSuggestions(req.body).then(resp =>{
    res.json(resp);
  });
});

app.listen(HTTP_PORT, () => console.log('Server listening on port 8080!'));
