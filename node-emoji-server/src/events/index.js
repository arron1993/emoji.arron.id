function emitOnJoinedRoom(io, data) {
  io.to(data.roomId).emit("onJoinedRoom", {
    roomId: data.roomId,
    message: `User ${data.username} joined room`,
  });
}

function emitUpdateUserList(io, room) {
  io.to(room.id).emit("updateUserList", { users: room.getClients() });
}

function emitStartGame(io, room) {
  io.to(room.id).emit("startGame");
}

exports.emitOnJoinedRoom = emitOnJoinedRoom;
exports.emitUpdateUserList = emitUpdateUserList;
exports.emitStartGame = emitStartGame;