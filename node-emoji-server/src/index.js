const app = require("express")();
const http = require("http").Server(app);

const { v4: uuidv4 } = require("uuid");

const { Room } = require("./classes/room/room");
const { Client } = require("./classes/client/client");

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
    console.log("createRoom");
    const roomId = uuidv4();
    rooms[roomId] = new Room(roomId);
    io.emit("createdRoom", { roomId: roomId });
  });

  socket.on("joinRoom", (data) => {
    console.log("User joined room", socket.id, data.roomId);

    socket.join(data.roomId);
    client = new Client(socket.id, data.username, data.roomId);
    socket.game.client = client;
    const room = rooms[data.roomId] || new Room(data.roomId);

    if (rooms[data.roomId] === undefined) {
      rooms[data.roomId] = room;
    }

    room.addClient(client);

    emitOnJoinedRoom(io, data);
    emitUpdateUserList(io, room);
  });

  socket.on("getUserList", (data) => {
    const room = rooms[data.roomId] || new Room(data.roomId);
    emitUpdateUserList(io, room);
  });

  socket.on("readyUp", () => {
    socket.game.client.ready = !socket.game.client.ready;
    const room = rooms[socket.game.client.roomId];
    emitUpdateUserList(io, room);

    let allReady = true;
    for (let client of room.getClients()) {
      if (!client.ready) {
        allReady = false;
        break;
      }
    }

    if (allReady) {
      room.startNewRound(io);
    }
  });

  socket.on("updateAnswer", (answer) => {
    const room = rooms[socket.game.client.roomId];
    room.rounds[room.rounds.length - 1].answers[socket.game.client.socketId] = {
      answer: answer,
      username: socket.game.client.username,
    };
  });

  socket.on("disconnecting", () => {
    console.log("A user disconnected", socket.rooms);
    for (const roomId of socket.rooms) {
      room = rooms[roomId];
      if (room) {
        room.removeClient(socket.id);
        emitUpdateUserList(io, room);
        console.log(room.getClients().length);
        if (room.getClients().length === 0) {
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
