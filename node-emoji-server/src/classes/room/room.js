const { Round } = require("../round/round");
const { RoomEventManager } = require("./events");

const {
  emitNewRound,
  emitEndGame,
  emitOnJoinedRoom,
  emitUpdateUserList,
} = require("../../events");

class Room {
  constructor(io, roomId) {
    this.events = new RoomEventManager(io, roomId);
    this.io = io;
    this.id = roomId;
    this.players = new Set();

    this.totalRounds = 5;

    this.roundLength = 20;

    this.rounds = [];
    this.roundTimer;
    this.io.emit("createRoom", { roomId: roomId });
  }

  _getPlayers() {
    return Array.from(this.players);
  }

  addPlayer(player) {
    player.socket.join(this.id);
    this.players.add(player);
    this.events.playerJoinedRoom(player);
  }

  removePlayer(playerToRemove) {
    const players = [...this.players].filter(
      (player) => player.socketId != playerToRemove.socketId
    );
    playerToRemove.socket.leave(this.roomId);
    this.players = new Set(players);
    this.events.playerLeftRoom(playerToRemove);
  }

  getPlayers(socket) {
    this.events.getPlayers(socket, this._getPlayers());
  }

  startNewRound(io) {
    const round = new Round(this.io, this.id);
    this.rounds.push(round);
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
