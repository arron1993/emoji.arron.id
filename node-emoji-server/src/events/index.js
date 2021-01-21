function emitOnJoinedRoom(io, data) {
  io.to(data.roomId).emit("onJoinedRoom", {
    roomId: data.roomId,
    message: `User ${data.username} joined room`,
  });
}

function emitOnGetUserList(io, room) {
  console.log("emitOnGetUserList");
  io.to(room.id).emit("onGetUserList", { users: room.getClients() });
}

exports.emitOnJoinedRoom = emitOnJoinedRoom;
exports.emitOnGetUserList = emitOnGetUserList;
