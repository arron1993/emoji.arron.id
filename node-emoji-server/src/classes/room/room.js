const { Round } = require("../round/round");

const { emitNewRound, emitEndGame } = require("../../events");

class Room {
  constructor(roomId) {
    this.id = roomId;
    this.clients = new Set();

    this.totalRounds = 1;

    this.roundLength = 5;

    this.rounds = [];

    this.roundTimer;
  }

  getClients() {
    return Array.from(this.clients);
  }

  addClient(client) {
    this.clients.add(client);
  }

  removeClient(socketId) {
    const clients = [...this.clients].filter(
      (client) => client.socketId != socketId
    );
    this.clients = new Set(clients);
  }

  startNewRound(io) {
    const round = new Round();
    this.rounds.push(round);

    emitNewRound(io, this.id, round);
    this.startRoundTimer(io);
  }

  endGame(io) {
    emitEndGame(io, this.id, this.rounds);
  }

  startRoundTimer(io) {
    let counter = this.roundLength;
    this.roundTimer = setInterval(() => {
      io.sockets.emit("updateRoundTimer", { time: counter });
      counter--;
      if (counter === 0) {
        clearInterval(this.roundTimer);
        if (this.rounds.length <= this.totalRounds - 1) {
          this.startNewRound(io);
        } else {
          this.endGame(io);
        }
      }
    }, 1000);
  }
}

module.exports.Room = Room;
