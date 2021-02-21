class PlayerEventManager {
  constructor(io, socket) {
    this.io = io;
    this.socket = socket;
  }

  getPlayerDetails(player) {
    this.socket.emit("getPlayerDetails", { player: player });
  }
}

module.exports.PlayerEventManager = PlayerEventManager;
