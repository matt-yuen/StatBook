const axios = require("axios");

const AZURE_SENTIMENT_URL =
  "https://statbookcognitiveservicesresource.cognitiveservices.azure.com/text/analytics/v2.1/sentiment";
const AZURE_KEY_PHRASES_URL =
  "https://statbookcognitiveservicesresource.cognitiveservices.azure.com/text/analytics/v2.1/keyPhrases";

class RecommendationEngine {
  constructor() {
    this.postsMap = new Map();
    this.suggestionsResponse = null;
  }

  processPosts(posts) {
      let promises = [];
      for (const post of posts) {
        promises.push(new Promise((res, rej) => {
          this.postsMap.set(post.id, post);
          if (!post.message) post.message = "";
          if (!post.comments) post.comments = { data: []};
          
          let comments = [];
          if(post.comments.data.length > 0){      
          post.comments.data.forEach(comment => {
            comments.push({
              id: comment.id,
              text: comment.message,
            });
          });
        }
          this.getCommentsAvgSentimentScore(comments)
            .then(response => {
              post.avgSentimentScore = response;
              this.postsMap.set(post.id, post);
            })
            .then(() => {
              this.getKeyPhrases(post).then(() => {
                res();
              });
            });
        })
        );
      }
      
      promises.push(new Promise((resolve, reject) => {
        let processedPosts = [];
        this.postsMap.forEach((value, key, map) => {
          processedPosts.push(value);
        });
        resolve(processedPosts);
      }));

      return Promise.all(promises);
  }

  sortPostsBySentimentScore(posts) {
    return Array.from(posts.sort(
      (post1, post2) => {
        return post2.avgSentimentScore - post1.avgSentimentScore;
      },
    )).splice(0, 5);
  }

  createSuggestions(posts) {
    return new Promise((resolve, reject) => {
      this.processPosts(posts).then((response) => {
        let fixedPosts;
        let suggestionsResponse;
  
        for(const record of response){
          if(record != null && record != undefined) {
            fixedPosts = record;
          }
        }
        let sentiments = [];
        for(const post of fixedPosts) {
          let postSentiment = { id: post.id, sentimentScore: Math.floor(post.avgSentimentScore * 100)/100 };
          sentiments.push(postSentiment);
        }
        let topics = this.getTopics(fixedPosts);
        resolve({ sentiments: sentiments, suggestedTopics: topics });
      });
    });
    
  }

  getTopics(posts) {
    let sortedPosts = this.sortPostsBySentimentScore(posts);
    let topics = [];
    for(const post of sortedPosts) {
      topics.push(post.keyPhrases[0]);
    }
    return topics;
  }

  getKeyPhrases(post) {
    return new Promise((resolve, reject) => {
      if (post.message !== "") {
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
      } else {
        resolve();
      }
    });
  }

  getCommentsAvgSentimentScore(comments) {
    return new Promise((resolve, reject) => {
      if (comments.length > 0) {
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
              sum += sentiment.score;
            });
            const avgSentimentScore = sum / res.data.documents.length;
            resolve(avgSentimentScore);
          })
          .catch(err => {
            console.error(err);
          });
      } else {
        resolve(0);
      }
    });
  }
}

module.exports = RecommendationEngine;
