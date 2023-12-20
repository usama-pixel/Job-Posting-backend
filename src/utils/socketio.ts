
import { Server } from 'socket.io';

let io: Server;
export function getIO(app: any) {
    if(io) return io;
    // console.log('created');
    
    io = new Server(app, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });
    return io;
}