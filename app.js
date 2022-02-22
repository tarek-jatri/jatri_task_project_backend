//=> External Imports
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");


//=> Internal Imports
const {
    notFoundHandler,
    errorHandler,
} = require("./middlewares/common/errorHandler");

const loginRouter = require("./router/loginRouter");
const adminRouter = require("./router/adminRouter");

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


//=> Routing Setup
app.use("/admin", adminRouter);
app.use("/login", loginRouter);

//=> Error Handling
// 404 Not found handler
app.use(notFoundHandler);
// common default error handler
app.use(errorHandler);

//=> Server Start
app.listen(process.env.PORT, () => {
    console.log(`JAS app listening to port ${process.env.PORT}`);
});
