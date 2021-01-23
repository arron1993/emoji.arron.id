class Client {
  constructor(socketId, username) {
    this.socketId = socketId;
    this.username = username;
    this.isAdmin = true;
  }
}

exports.Client = Client;
