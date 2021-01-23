class Room {
  constructor(roomId) {
    this.id = roomId;
    this.clients = new Set();

    this.rounds = [];
  }

  getClients() {
    return Array.from(this.clients);
  }

  addClient(client) {
    this.clients.add(client);
  }

  removeClient(socketId) {
    const clients = [...this.clients].filter(
      (client) => client.socketId != socketId
    );
    this.clients = new Set(clients);
  }
}

module.exports.Room = Room;
