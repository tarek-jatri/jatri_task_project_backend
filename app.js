//=> External Imports
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
//=> Internal Imports
const {
    notFoundHandler,
    errorHandler,
} = require("./middlewares/common/errorHandler");
const loginRouter = require("./router/LoginRouter");
const adminRouter = require("./router/AdminRouter");
const userRouter = require("./router/UserRouter");
const onlineUserId = [];
//=> setting
const app = express();
dotenv.config();
//=> Database Connection
mongoose
    .connect(process.env.MONGO_CONNECTION_STRING)
    .then(() => {
        console.log("JAS-v2 database connection successful");
    })
    .catch((err) => console.log(err));
//=> Request Parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));
//=> settings for connection and cookie sharing with frontend
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
}));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});
const http = require('http');
const server = http.createServer(app);
const {Server} = require("socket.io");
const {on} = require("events");
const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        credentials: true
    }
});
//=> Parse Cookies
app.use(cookieParser(process.env.COOKIE_SECRET));
//=> Routing Setup
app.use("/admin", adminRouter);
app.use("/login", loginRouter);
app.use("/user", userRouter);
//=> Error Handling
// 404 Not found handler
app.use(notFoundHandler);
// common default error handler
app.use(errorHandler);
//=>
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
io.on("connection", (socket) => {
    socket.on('login', (token) => {
        if (token && token.length > 0) {
            const decodePayload = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Login: ", decodePayload.name);
            onlineUserId.push(decodePayload._id);
            io.emit("online", onlineUserId);
        }
    });
    socket.on('logout', (token) => {
        if (token && token.length > 0) {
            const decodePayload = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Logout: ", decodePayload.name);
            const index = onlineUserId.indexOf(decodePayload._id);
            if (index > -1) {
                onlineUserId.splice(index, 1); // 2nd parameter means remove one item only
            }
            io.emit("online", onlineUserId);
        }
    });
});
//=> Server Start
server.listen(process.env.PORT, () => {
    console.log(`JAS app listening to port ${process.env.PORT}`);
});