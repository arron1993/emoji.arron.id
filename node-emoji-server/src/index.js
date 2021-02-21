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
    socket.player = new Player(io, socket, roomId, data.username, true);
    room = new Room(io, roomId);
    room.addPlayer(socket.player);
    rooms[roomId] = room;
    console.log(`Created room ${roomId}`);
  });

  socket.on("getPlayerDetails", () => {
    console.log("getPlayerDetails");
    if (socket.player === null) {
      socket.emit("getPlayerDetails", { player: null });
    } else {
      socket.player.getPlayerDetails();
    }
  });

  socket.on("disconnecting", () => {});
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});
