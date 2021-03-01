class RoomEventManager {
  constructor(io, roomId) {
    console.log(roomId);
    this.io = io;
    this.roomId = roomId;
  }

  emit(name, data) {
    console.log(`EMIT to ${this.roomId}: ${name}`, data);
    this.io.to(this.roomId).emit(name, data);
  }

  playerJoinedRoom(player) {
    console.log(`${player.username} joined room ${this.roomId}`);
    this.emit("playerJoinedRoom", {
      player: {
        id: player.socket.id,
        username: player.username,
      },
    });
  }

  playerLeftRoom(player) {
    console.log(`${player.username} left room ${this.roomId}`);
    this.emit("playerLeftRoom", {
      player: {
        id: player.socket.id,
        username: player.username,
      },
    });
  }

  getPlayers(socket, players) {
    players = players.map((player) => {
      return {
        id: player.socket.id,
        username: player.username,
      };
    });
    console.log(players);
    socket.emit("getPlayers", { players: players });
  }
}

module.exports.RoomEventManager = RoomEventManager;
