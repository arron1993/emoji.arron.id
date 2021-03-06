function emitOnJoinedRoom(io, data) {
  io.to(data.roomId).emit("onJoinedRoom", {
    roomId: data.roomId,
    message: `User ${data.username} joined room`,
  });
}

function emitUpdateUserList(io, room) {
  io.to(room.id).emit("updateUserList", { users: room.getPlayers() });
}

function emitStartGame(io, room) {
  io.to(room.id).emit("startGame", { round: room.rounds[0] });
}

function emitNewRound(io, roomId, round) {
  io.to(roomId).emit("onNewRound", {
    round: round,
  });
}

function emitEndGame(io, roomId, rounds) {
  io.to(roomId).emit("onEndGame", {
    rounds: rounds,
  });
}

exports.emitEndGame = emitEndGame;
exports.emitOnJoinedRoom = emitOnJoinedRoom;
exports.emitUpdateUserList = emitUpdateUserList;
exports.emitStartGame = emitStartGame;
exports.emitNewRound = emitNewRound;
