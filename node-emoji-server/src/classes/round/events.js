class RoundEventManager {
  constructor(io, roomId) {
    this.io = io;
    this.roomId = roomId;
  }

  emit(name, data) {
    console.log(`EMIT to ${this.roomId}: ${name}`, data);
    this.io.to(this.roomId).emit(name, data);
  }

  newRound(round) {
    this.emit("newRound", {
      round: round._get(),
    });
  }
}

module.exports.RoundEventManager = RoundEventManager;
