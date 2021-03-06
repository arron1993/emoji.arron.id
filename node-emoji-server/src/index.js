const app = require("express")();
const http = require("http").Server(app);

const { v4: uuidv4 } = require("uuid");

const { Room } = require("./classes/room/room");
const { Player } = require("./classes/player/player");

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
  socket.player = null;

  socket.on("createRoom", (data) => {
    const roomId = uuidv4();
    const isAdmin = true;
    socket.player = new Player(io, socket, roomId, data.username, isAdmin);
    room = new Room(io, roomId);
    room.addPlayer(socket.player);
    rooms[roomId] = room;
  });

  socket.on("getPlayerDetails", () => {
    if (socket.player === null) {
      socket.emit("getPlayerDetails", { player: null });
    } else {
      socket.player.getPlayerDetails();
    }
  });

  socket.on("getPlayers", () => {
    room = rooms[socket.player.roomId];
    room.getPlayers(socket);
  });

  socket.on("updatePlayer", (data) => {
    socket.player.update(data);
  });

  socket.on("updateAnswer", (data) => {
    const roomId = socket.player.roomId;
    room = rooms[roomId];
    room._getCurrentRound().updateAnswer(data.answer);
  });

  socket.on("joinRoom", (data) => {
    room = rooms[data.roomId];
    let isAdmin = false;
    if (room === undefined) {
      room = new Room(io, data.roomId);
      rooms[room.id] = room;
      isAdmin = true;
    }
    socket.player = new Player(io, socket, data.roomId, data.username, isAdmin);
    room.addPlayer(socket.player);
  });

  socket.on("addGuess", (data) => {
    const roomId = socket.player.roomId;
    room = rooms[roomId];
    room._getCurrentRound().addGuess(data.guess);
  });

  socket.on("startGame", (data) => {
    const roomId = socket.player.roomId;
    room = rooms[roomId];
    room.startNewRound();
  });

  socket.on("disconnecting", () => {
    if (socket.player) {
      console.log(`User ${socket.player.username} disconnecting`);
      const room = rooms[socket.player.roomId];
      if (room) {
        room.removePlayer(socket.player);
        if (room._getPlayers().length === 0) {
          room._close();
          delete rooms[room.id];
        }
      }
    }
  });
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});
