// node server.js

// ipconfig getifaddr en0

const express = require("express");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
    console.log("A browser connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("A browser disconnected:", socket.id);
    });

    socket.on("diceRolled", (number) => {
        console.log("Someone rolled:", number);
        io.emit("diceRolled", number);
    });
});

server.listen(3000, "0.0.0.0", () => {
    console.log("Server running on port 3000");
});