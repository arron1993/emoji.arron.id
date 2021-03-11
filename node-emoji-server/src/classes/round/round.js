const movies = require("../../data/movies");
const { RoundEventManager } = require("./events");

class Round {
  constructor(io, roomId) {
    this.word = movies.movies[Math.floor(Math.random() * movies.movies.length)];
    this.io = io;
    this.roomId = roomId;
    this.events = new RoundEventManager(io, roomId);
    this.events.newRound(this);
  }

  _get() {
    return {
      word: this.word,
    };
  }

  updateAnswer(answer) {
    this.events.updateAnswer(answer);
  }

  addGuess(guess) {
    this.events.addGuess(guess);
  }
}

exports.Round = Round;
