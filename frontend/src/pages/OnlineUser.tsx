// // src/components/OnlineUsers.tsx
// import { useEffect, useState } from 'react';
// import { io } from 'socket.io-client';

// const socket = io('http://localhost:8080'); // Backend URL

const OnlineUsers = () => {
//   const [users, setUsers] = useState<string[]>([]);

//   useEffect(() => {
//     const username = prompt("Enter your username") || "Anonymous";
//     socket.emit('join', username);

//     socket.on('updateUserList', (onlineUsers: string[]) => {
//       setUsers(onlineUsers);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

  return (
    <div>
      {/* <h2>Online Users:</h2>
      <ul>
        {users.map((user, idx) => (
          <li key={idx}>{user}</li>
        ))}
      </ul> */}
      <h1>hi divyanshu</h1>
    </div>
  );
};

export default OnlineUsers;
