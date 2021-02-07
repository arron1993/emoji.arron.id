const app = require("express")();
const http = require("http").Server(app);

const { v4: uuidv4 } = require("uuid");

const { Room } = require("./classes/room/room");
const { Player } = require("./classes/player/player");

const { emitOnJoinedRoom, emitUpdateUserList } = require("./events");

const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const rooms = {};

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);
  socket.game = {};

  socket.on("createRoom", (data) => {
    const roomId = uuidv4();
    rooms[roomId] = new Room(io, roomId);
  });

  socket.on("joinRoom", (data) => {
    console.log("User joined room", socket.id, data.roomId);
    socket.join(data.roomId);

    player = new Player(socket.id, data.username, data.roomId);
    socket.game.player = player;
    const room = rooms[data.roomId] || new Room(io, data.roomId);

    if (rooms[data.roomId] === undefined) {
      rooms[data.roomId] = room;
    }

    room.addPlayer(player);
  });

  socket.on("getPlayerList", (data) => {
    const room = rooms[data.roomId] || new Room(io, data.roomId);
    emitUpdateUserList(io, room);
  });

  socket.on("readyUp", () => {
    socket.game.player.ready = !socket.game.player.ready;
    const room = rooms[socket.game.player.roomId];
    emitUpdateUserList(io, room);

    let allReady = true;
    for (let player of room.getPlayer()) {
      if (!player.ready) {
        allReady = false;
        break;
      }
    }

    if (allReady) {
      room.startNewRound(io);
    }
  });

  socket.on("updateAnswer", (answer) => {
    const room = rooms[socket.game.player.roomId];
    room.rounds[room.rounds.length - 1].answers[socket.game.player.socketId] = {
      answer: answer,
      username: socket.game.player.username,
    };
  });

  socket.on("disconnecting", () => {
    console.log("A user disconnected", socket.rooms);
    for (const roomId of socket.rooms) {
      room = rooms[roomId];
      if (room) {
        room.removePlayer(socket.id);
        if (room.getPlayers().length === 0) {
          console.log(roomId, "is empty, deleting...");
          delete rooms[roomId];
        }
      }
    }
    // if room is now empty, then delete it from rooms
  });
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});
