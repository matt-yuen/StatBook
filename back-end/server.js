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

  const suggestions = recommendationEngine.createSuggestions(req.body).then(res =>{
    console.log(res);
  });
  res.json(suggestions);
});

app.listen(8080, () => console.log('Server listening on port 8080!'));
