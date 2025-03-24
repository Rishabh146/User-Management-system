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

let userSockets = {};  // userId => socketId[]
let onlineUsers = new Set();  // Track currently online users

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('userStatus', (data) => {
    const { userId, status } = data;
    console.log(`User ${userId} is ${status}`);

    if (status === 'online') {
      // Track socket
      if (!userSockets[userId]) {
        userSockets[userId] = [];
      }
      userSockets[userId].push(socket.id);
      onlineUsers.add(userId);  // Add to online users

      // 1. Notify all clients that THIS user is online
      io.emit('statusUpdate', { userId, status });

      // 2. Notify THIS user of all other online users
      const otherOnlineUsers = Array.from(onlineUsers).filter(id => id !== userId);
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
      console.log(`User ${userId} disconnected`);
      userSockets[userId] = userSockets[userId].filter(id => id !== socket.id);
      if (userSockets[userId].length === 0) {
        delete userSockets[userId];
        onlineUsers.delete(userId);  // Remove from online users

        // Notify all clients that user is offline
        io.emit('statusUpdate', { userId, status: 'offline' });
      }
    }
  });
});


// Utility: Create a unique room ID for two users (sorted to avoid duplicates)
const getRoomId = (id1, id2) => {
  const sorted = [id1, id2].sort();
  return `room_${sorted[0]}_${sorted[1]}`;
};

// API routes
app.use('/api/v1/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('<h1>App is running</h1>'); 
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});



