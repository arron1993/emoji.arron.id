const { Round } = require("../round/round");

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
    this.rounds.push(new Round());
    this.startRoundTimer(io);
  }

  startRoundTimer(io) {
    let counter = 60;
    this.roundTimer = setInterval(function () {
      io.sockets.emit("updateRoundTimer", { time: counter });
      counter--;
      if (counter === 0) {
        clearInterval(this.roundTimer);
      }
    }, 1000);
  }
}

module.exports.Room = Room;
