const { PlayerEventManager } = require("./events");

class Player {
  constructor(io, socket, roomId, username, isAdmin) {
    this.io = io;
    this.events = new PlayerEventManager(io, socket);
    this.socket = socket;
    this.roomId = roomId;
    this.username = username;
    this.isAdmin = isAdmin || false;
    this.points = 0;
    this.active = false;
    this.ready = false;
    this.events.getPlayerDetails(this);
  }

  getPlayerDetails() {
    this.events.getPlayerDetails({
      username: this.username,
      isAdmin: this.isAdmin,
      points: this.points,
    });
  }
}

exports.Player = Player;
