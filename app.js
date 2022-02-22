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

const loginRouter = require("./router/loginRouter");
const adminRouter = require("./router/adminRouter");
const userRouter = require("./router/userRouter");

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
app.use(express.urlencoded({ extended: true }));
app.use(cors());

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
