class RoomEventManager {
  constructor(io, roomId) {
    this.io = io;
    this.roomId = roomId;
  }

  emit(name, data) {
    this.io.to(this.roomId).emit(name, data);
  }

  playerJoinedRoom(player) {
    console.log(`${player.username} joined room ${this.roomId}`);
    this.emit("playerJoinedRoom", { player: { username: player.username } });
  }

  playerLeftRoom(player) {
    console.log(`${player.username} left room ${this.roomId}`);
    this.emit("playerLeftRoom", { player: { username: player.username } });
  }
}

module.exports.RoomEventManager = RoomEventManager;
