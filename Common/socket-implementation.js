const {Server} = require("socket.io");
const jwt = require("jsonwebtoken");


//=> Global Variable For Online User's Ids
const onlineUserId = [];

module.exports = function socketImplementation(server) {
    const io = new Server(server, {
        cors: {
            origin: process.env.FRONTEND_URL,
            credentials: true
        }
    });

    //=> calling the socket events
    io.on("connection", (socket) => {
        // login event
        socket.on('login', (token) => {
            if (token && token.length > 0) {
                const decodePayload = jwt.verify(token, process.env.JWT_SECRET);
                onlineUserId.push(decodePayload._id);
                io.emit("online", onlineUserId);
            }
        });

        // logout event
        socket.on('logout', (token) => {
            if (token && token.length > 0) {
                const decodePayload = jwt.verify(token, process.env.JWT_SECRET);
                const index = onlineUserId.indexOf(decodePayload._id);
                if (index > -1) {
                    onlineUserId.splice(index, 1); // 2nd parameter means remove one item only
                }
                io.emit("online", onlineUserId);
            }
        });
    });
}