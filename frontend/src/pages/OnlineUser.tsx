import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:8080'); // Your backend server URL

interface User {
  id: string;
  username: string;
}

const OnlineUsers = () => {
  const [username, setUsername] = useState('');
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]); // Track online users

  useEffect(() => {
    // Check if the username exists before emitting
    if (username) {
      socket.emit('user_connected', username); // Notify backend about the user's connection
    }

    // Listen for online users data from the server
    socket.on('online_users', (users: User[]) => {
      console.log('Received online users:', users); // Log the received data to check if it's correct
      setOnlineUsers(users); // Update state with the received users
    });

    // Cleanup the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, [username]);

  return (
    <div>
      <h3>Online Users:</h3>
      <ul>
        {onlineUsers.length > 0 ? (
          onlineUsers.map(user => (
            <li key={user.id}>{user.username}</li>
          ))
        ) : (
          <li>No users online</li>
        )}
      </ul>
    </div>
  );
};

export default OnlineUsers;




