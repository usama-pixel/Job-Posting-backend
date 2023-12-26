import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { AuthRoutes } from './routes/auth.js';
import { jobRoutes } from './routes/job.js';
import { BaseError } from './utils/ApiError.js';
import { getIO } from './utils/socketio.js';
import { userRouter } from './routes/users.js';
import { msgsRouter } from './routes/msgs.js';
const app = express();
const server = http.createServer(app);
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
const port = process.env.PORT || 8080;
console.log({ port });
app.use(AuthRoutes);
// app.use(getUser)
app.use(jobRoutes);
app.use(userRouter);
app.use(msgsRouter);
app.use((err, req, res, next) => {
    let httpCode = 500;
    if (err instanceof BaseError) {
        httpCode = err.httpCode;
    }
    else {
        console.log('not working');
    }
    res.status(httpCode);
    res.json({ msg: err.name, err });
});
let users = {};
const io = getIO(server);
try {
    io.on('connection', (socket) => {
        console.log('connected');
        socket.on('register', (userId) => {
            console.log('registered', userId);
            users[userId] = socket;
        });
        socket.on('send_msg', ({ msg, to, from }) => {
            console.log({ msg, to, from });
            // saveMsgService(msg, from, to)
            users[to].emit('recieve_msg', { msg, to, from });
            // socket.emit('recieve_msg', msg, id)
        });
        socket.on('test', data => {
            console.log({ users });
        });
    });
}
catch (error) {
    console.log(error);
}
// io.on('connection', (socket: Socket) => {
//     console.log('connextedd')
//     socket.on('register', (userId: string) => {
//         console.log('registered', userId)
//         users[userId] = socket
//         console.log({users})
//     })
//     socket.on('private_message', ({recipientId, message}: {recipientId: string, message: string}) => {
//         const recipientSocket = users[recipientId]
//         console.log({recipientSocket});
//         if(recipientSocket) {
//             recipientSocket.emit('recieve_message', message)
//         }
//         console.log({message})
//     })
//     socket.on('test', data => {
//         console.log({users});
//     })
// })
// io.on('conection', (socket: Socket) => {
//     console.log('connected')
//     socket.on('register', (userId: string) => {
//         console.log('registered');
//         users[userId] = socket;
//     })
//     socket.on('private_message', ({recipientId, message}) => {
//         console.log({message});
//         const recipientSocket = users[recipientId]
//         if(recipientSocket) {
//             recipientSocket.emit('recieve_message', message)
//         }
//     })
//     // socket.on('join_room', (room: string) => {
//     //     socket.join(room)
//     // })
//     // socket.on('send_message', ({ room, message }: {room: string, message: string}) => {
//     //     socket.to(room).emit('recieve_message', message)
//     // })
//     socket.on('disconnect', () => {
//         const user = Object.fromEntries(
//             Object.entries(users).filter(([id, s]) => s !== socket)
//         )
//         console.log('User disconnected')
//     })
// })
// const io = new IOServer(server, {
//     cors: {
//         origin: '*'
//     }
// })
// io.on('connection', (socket: Socket) => {
//     console.log(`client ${socket.id} connected`);
//     socket.on('send_message', ({to, msg}) => {
//         socket.broadcast.to(sokcetIds[to]).emit('recieve_message', 'naruto')
//     })
//     socket.on('join', (id, sid) => {
//         console.log({id, sid})
//         sokcetIds[id] = sid
//     })
//     socket.on('disconnect', () => {
//         console.log('client disconnected');
//     })
// })
server.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
//# sourceMappingURL=index.js.map