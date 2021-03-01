class PlayerEventManager {
  constructor(io, socket) {
    this.io = io;
    this.socket = socket;
  }

  getPlayerDetails(player) {
    this.socket.emit("getPlayerDetails", {
      player: { username: player.username },
    });
  }
}

module.exports.PlayerEventManager = PlayerEventManager;
