const express = require("express");
const router = require("./routers");
const sequelize = require("./config/db");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use("/api", router);

const io = new Server(server, {
    cors: "*"
})

io.on("connection", (socket)=>{
    console.log(socket.id)
    console.log(`Socket connected: ${socket.id}`);

    socket.on("joinRoom", (numberRoom) => {
        if (!numberRoom){
            console.error("room missing")
            return
        }
        console.log(numberRoom,'NUMBER ROOM JOIN')
        socket.join(Number(numberRoom))
        console.log(`socket ID: ${socket.id} connected to room ${numberRoom}`)
    })

    socket.on("sendMessage", (data) => {
        if (!data.room || !data.text || !data.role) {
            console.error("data:", data);
            return
        }
        console.log(data.room,'NUMBER ROOM SEND MESSAGE')
        console.log(`To room ${data.room} send message ${data.role} text: ${data.text}`)
        const clients = io.sockets.adapter.rooms.get(data.room);
        console.log(clients)
        io.to(Number(data.room)).emit("receiveMessage",data)
    })
    socket.on("disconnect", () => {
        console.log(`Socket disconnected: ${socket.id}`);
    });
})

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });
        server.listen(4000, () => console.log('Server started on port 4000'));
    } catch (error) {
        console.error("Unable to start the server:", error.message);
    }
};

start();