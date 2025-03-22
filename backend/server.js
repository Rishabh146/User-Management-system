import express from 'express';
import connectDb from './config/db.js';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoute.js';
import morgan from 'morgan';
import cors from 'cors';
import http from 'http';  
import { Server } from 'socket.io'; 

const app = express();
dotenv.config();
connectDb();
app.use(express.json());
app.use(morgan('dev'));
app.use(
  cors({
    allowedHeaders: ['Authorization', 'Content-Type'], 
  })
);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:4200', 
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

let users = {}; 
let userSockets = {};  


io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('userStatus', (data) => {

    console.log("the valueof the coming data is:",data)
    const{ userId, status}= data

    console.log(`User ${userId} is ${status}`);
    if (!userSockets[userId]) {
      userSockets[userId] = [];
    }
    userSockets[userId].push(socket.id);

    io.emit('statusUpdate', { userId, status });
  });

  socket.on('disconnect', () => {
    let userId = null;
    for (const [key, socketIds] of Object.entries(userSockets)) {
      if (socketIds.includes(socket.id)) {
        userId = key;
        break;
      }
    }

    if (userId) {
      console.log(`User ${userId} disconnected`);
      userSockets[userId] = userSockets[userId].filter(id => id !== socket.id);
      if (userSockets[userId].length === 0) {
        io.emit('statusUpdate', { userId, status: 'offline' });
        delete userSockets[userId];  
      }
    }
  });
});
console.log("the value of the users is:",users)

app.use('/api/v1/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('<h1>App is running</h1>'); 
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});


