const app = require("express")();
const http = require("http").Server(app);
const { Room } = require("./room");
const { v4: uuidv4 } = require("uuid");

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

  socket.on("createRoom", (data) => {
    console.log("createRoom");
    const roomId = uuidv4();
    io.emit("createdRoom", { roomId: roomId });
  });

  socket.on("joinRoom", (data) => {
    console.log("User joined room", socket.id, data.roomId);
    socket.join(data.roomId);
    const room = rooms[data.roomId] || new Room(data.roomId);

    if (rooms[data.roomId] === undefined) {
      rooms[data.roomId] = room;
    }

    room.addClient(data.username);

    console.log(room.getClients());

    io.to(data.roomId).emit("joinedRoom", {
      roomId: data.roomId,
      message: `User ${data.username} joined room`,
    });

    io.to(data.roomId).emit("onGetUserList", { users: room.getClients() });
  });

  socket.on("getUserList", (data) => {
    const room = rooms[data.roomId] || new Room(data.roomId);
    usernames = room.getClients();
    io.to(data.roomId).emit("onGetUserList", { users: usernames });
  });

  socket.on("disconnecting", () => {
    console.log("A user disconnected", socket.rooms); // the Set contains at least the socket ID
  });
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});
