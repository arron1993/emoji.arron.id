const movies = require("../../data/movies");

class Round {
  constructor() {
    this.word = movies.movies[Math.floor(Math.random() * movies.movies.length)];
    this.answers = {};
  }
}

exports.Round = Round;
