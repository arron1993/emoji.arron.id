const { PlayerEventManager } = require("./events");

class Player {
  constructor(io, socket, roomId, username, isAdmin) {
    this.io = io;
    this.events = new PlayerEventManager(io, socket, roomId);
    this.socket = socket;
    this.roomId = roomId;
    this.username = username;
    this.isAdmin = isAdmin || false;
    this.points = 0;
    this.active = false;
    this.ready = false;
    this.events.getPlayerDetails(this._get());
  }

  _get() {
    return {
      id: this.socket.id,
      username: this.username,
      isAdmin: this.isAdmin,
      points: this.points,
      active: this.active,
      ready: this.ready,
    };
  }
  update(data) {
    for (const [key, value] of Object.entries(data)) {
      this[key] = value;
    }
    this.events.updatePlayer(this._get());
  }

  getPlayerDetails() {
    this.events.getPlayerDetails(this._get());
  }
}

exports.Player = Player;
