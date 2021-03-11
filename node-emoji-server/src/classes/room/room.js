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

    this.roundLength = 120;

    this.rounds = [];
    this.roundTimer;
    this.io.emit("createRoom", { roomId: roomId });
    this.activePlayerIndex = 0;
  }

  _getCurrentRound() {
    return this.rounds[this.rounds.length - 1];
  }

  _getPlayers() {
    return Array.from(this.players);
  }

  _close() {
    clearInterval(this.roundTimer);
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

  startNewRound() {
    const round = new Round(this.io, this.id);
    const players = this._getPlayers();
    this.rounds.push(round);
    this.startRoundTimer();

    players[this.activePlayerIndex].setActive();
    this.activePlayerIndex++ % players.length;
  }

  startRoundTimer() {
    let counter = this.roundLength;
    this.roundTimer = setInterval(() => {
      this.events.timerTick(counter);
      counter--;
      if (counter < 0) {
        clearInterval(this.roundTimer);
      }
    }, 1000);
  }
}

module.exports.Room = Room;
