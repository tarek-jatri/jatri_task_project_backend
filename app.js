//=> External Imports
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//=> Internal Imports
const {
    notFoundHandler,
    errorHandler,
} = require("./Middlewares/common/errorHandler");
const loginRouter = require("./Router/LoginRouter");
const adminRouter = require("./Router/AdminRouter");
const userRouter = require("./Router/UserRouter");
const socketImplementation = require("./Common/socket-implementation.js");


//=> setting
const app = express();
const http = require('http');
const server = http.createServer(app);
dotenv.config();

//=> Database Connection
mongoose
    .connect(process.env.MONGO_CONNECTION_STRING)
    .then(() => {
        console.log("JAS database connection successful");
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


//=> Parse Cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

//=> Routing Setup
app.use("/admin", adminRouter);
app.use("/login", loginRouter);
app.use("/user", userRouter);
app.get("/", (req, res) => {
    res.send("Hello World");
})
//=> Error Handling
// 404 Not found handler
app.use(notFoundHandler);

// Common default error handler
app.use(errorHandler);

//=> Implementing Socket
socketImplementation(server);

//=> Server Start
server.listen(process.env.PORT, () => {
    console.log(`JAS app listening to port ${process.env.PORT}`);
});