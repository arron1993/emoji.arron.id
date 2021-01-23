class Client {
  constructor(socketId, username, roomId) {
    this.socketId = socketId;
    this.roomId = roomId;
    this.username = username;
    this.isAdmin = true;
    this.points = 0;
    this.active = false;
    this.ready = false;
  }
}

exports.Client = Client;
