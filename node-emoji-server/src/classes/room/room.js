const { Round } = require("../round/round");

const { emitNewRound } = require("../../events");

class Room {
  constructor(roomId) {
    this.id = roomId;
    this.clients = new Set();

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

  startRoundTimer(io) {
    let counter = 5;
    this.roundTimer = setInterval(() => {
      io.sockets.emit("updateRoundTimer", { time: counter });
      counter--;
      if (counter === 0) {
        clearInterval(this.roundTimer);
        if (this.rounds.length < 10) {
          this.startNewRound(io);
        }
      }
    }, 1000);
  }
}

module.exports.Room = Room;
