class Room {
  constructor(roomId) {
    this.id = roomId;
    this.clients = new Set();
  }

  getClients() {
    return Array.from(this.clients);
  }

  addClient(username) {
    this.clients.add(username);
  }
}

module.exports.Room = Room;
