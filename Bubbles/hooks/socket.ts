import { io } from 'socket.io-client';

const socket = io('http://sydneyhome.ddns.net:38433/',{
    // Optional configuration here, e.g.
    // auth: { token: 'your_token' },
    // transports: ['websocket'],
});


export default socket;