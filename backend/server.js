import express from 'express';
import connectDb from './config/db.js';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoute.js';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';

dotenv.config();
const app = express();

connectDb();
app.use(express.json());
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

const userSockets = {};
const onlineUsers = new Set();

io.on('connection', (socket) => {
  socket.on('userStatus', (data) => {
    const { userId, status } = data;

    if (status === 'online') {
      if (!userSockets[userId]) {
        userSockets[userId] = [];
      }
      userSockets[userId].push(socket.id);
      onlineUsers.add(userId);
      io.emit('statusUpdate', { userId, status });

      const otherOnlineUsers = Array.from(onlineUsers);
      socket.emit('initialOnlineUsers', otherOnlineUsers);
    }
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
      userSockets[userId] = userSockets[userId].filter(
        (id) => id !== socket.id
      );
      if (userSockets[userId].length === 0) {
        delete userSockets[userId];
        onlineUsers.delete(userId);
        io.emit('statusUpdate', { userId, status: 'offline' });
      }
    }
  });

  socket.on('logout', (userId) => {
    if (userId) {
      delete userSockets[userId];
      onlineUsers.delete(userId);
      io.emit('statusUpdate', { userId, status: 'offline' });
    }

    socket.disconnect();
  });
});

app.use('/api/auth', authRoutes);
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
