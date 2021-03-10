class PlayerEventManager {
  constructor(io, socket, roomId) {
    this.io = io;
    this.socket = socket;
    this.roomId = roomId;
  }

  getPlayerDetails(player) {
    this.socket.emit("getPlayerDetails", {
      player: player,
    });
  }

  setActive() {
    this.socket.emit("setActive", {
      active: true,
    });
  }

  updatePlayer(player) {
    this.io.to(this.roomId).emit("updatePlayer", { player: player });
  }
}

module.exports.PlayerEventManager = PlayerEventManager;
