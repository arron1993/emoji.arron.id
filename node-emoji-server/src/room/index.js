class Room {
  constructor(roomId) {
    this.roomId = roomId;
    this.clients = new Set();
  }

  getClients() {
    console.log(this.clients);
    return Array.from(this.clients);
  }

  addClient(username) {
    this.clients.add(username);
  }
}

module.exports.Room = Room;
