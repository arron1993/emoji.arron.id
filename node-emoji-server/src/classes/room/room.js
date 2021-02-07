const { Round } = require("../round/round");

const {
  emitNewRound,
  emitEndGame,
  emitOnJoinedRoom,
  emitUpdateUserList,
} = require("../../events");

class Room {
  constructor(io, roomId) {
    this.io = io;
    this.id = roomId;
    this.players = new Set();

    this.totalRounds = 5;

    this.roundLength = 20;

    this.rounds = [];
    this.roundTimer;
    this.io.emit("createdRoom", { roomId: roomId });
  }

  getPlayers() {
    return Array.from(this.players);
  }

  addPlayer(player) {
    this.players.add(player);
    emitOnJoinedRoom(this.io, {
      roomId: this.roomId,
      username: player.username,
    });
    emitUpdateUserList(this.io, this);
  }

  removePlayer(socketId) {
    const players = [...this.players].filter(
      (player) => player.socketId != socketId
    );
    this.players = new Set(players);
    emitUpdateUserList(io, this);
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
