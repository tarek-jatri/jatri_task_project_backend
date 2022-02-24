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
} = require("./middlewares/common/errorHandler");

const loginRouter = require("./router/LoginRouter");
const adminRouter = require("./router/AdminRouter");
const userRouter = require("./router/UserRouter");

//=> setting
const app = express();
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
app.use(express.urlencoded({extended: true}));
app.use(cors({
    credentials: true,
    origin: "http://localhost:8081",
}));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8081");
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

//=> Error Handling
// 404 Not found handler
app.use(notFoundHandler);
// common default error handler
app.use(errorHandler);

//=> Server Start
app.listen(process.env.PORT, () => {
    console.log(`JAS app listening to port ${process.env.PORT}`);
});
