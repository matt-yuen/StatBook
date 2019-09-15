const axios = require("axios");
const AZURE_SENTIMENT_URL =
  "https://statbookcognitiveservicesresource.cognitiveservices.azure.com/text/analytics/v2.1/sentiment";
const AZURE_KEY_PHRASES_URL =
  "https://statbookcognitiveservicesresource.cognitiveservices.azure.com/text/analytics/v2.1/keyPhrases";

class RecommendationEngine {
  constructor() {
    this.postsMap = new Map();
  }

  processPosts(posts) {
    return new Promise((resolve, reject) => {
      posts.forEach(post => {
        this.postsMap.set(post.id, post);

        this.getKeyPhrases(post).then(() => {
          console.log(this.postsMap);
        });
        if (post.comments) {
          let comments = [];
          post.comments.forEach(comment => {
            comments.push({
              id: comment.id,
              text: comment.message,
            });
          });
          this.getCommentsAvgSentimentScore(comments)
            .then(res => {
              post.avgSentimentScore = res;
              this.postsMap.set(post.id, post);
            })
            .then(() => {
              let processedPosts = [];
              this.postsMap.forEach((value, key, map) => {
                processedPosts.push(value);
              });
              resolve(processedPosts);
            });
        }
      });
    });
  }

  getKeyPhrases(post) {
    return new Promise((resolve, reject) => {
      axios({
        method: "post",
        url: AZURE_KEY_PHRASES_URL,
        data: {
          documents: [
            {
              language: "en",
              id: post.id,
              text: post.message,
            },
          ],
        },

        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Ocp-Apim-Subscription-Key": "2cbb02bcd6e44d9aa10bc62442206bd2",
        },
      })
        .then(res => {
          post.keyPhrases = res.data.documents[0].keyPhrases;
          this.postsMap.set(post.id, post);
          resolve();
        })
        .catch(err => {
          console.error(err);
        });
    });
  }

  getCommentsAvgSentimentScore(comments) {
    return new Promise((resolve, reject) => {
      axios({
        method: "post",
        url: AZURE_SENTIMENT_URL,
        data: {
          documents: comments,
        },

        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Ocp-Apim-Subscription-Key": "2cbb02bcd6e44d9aa10bc62442206bd2",
        },
      })
        .then(res => {
          let sum = 0;
          res.data.documents.forEach(sentiment => {
            console.log(sentiment.score);
            sum += sentiment.score;
          });
          const avgSentimentScore = sum / res.data.documents.length;
          resolve(avgSentimentScore);
        })
        .catch(err => {
          console.error(err);
        });
    });
  }
}

module.exports = RecommendationEngine;