
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../Redux/store';
import { fetchPosts } from '../Redux/postSlice';
import CircularProgress from '@mui/joy/CircularProgress';
import { Alert, Table } from '@mui/joy';
import io, { Socket } from 'socket.io-client';

const socket: Socket = io('http://localhost:8080', {
  transports: ['websocket'],
});

function Home() {
  const token = useSelector((state: RootState) => state.auth.token);
  const userId = useSelector((state: RootState) => state.auth.user?.id);  // Get user ID from auth state
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector((state: RootState) => state.posts);

  const [userStatus, setUserStatus] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    dispatch(fetchPosts());

    socket.on('connect', () => {
      console.log('Connected to server with ID:', socket.id);

      // Emit user status with userId
      console.log("The value of the userId is:", userId)
      if (userId) {
        socket.emit('userStatus', { userId: userId, status: 'online' });
     
      }
    });

    socket.on('connect_error', (err) => {
      console.error('Socket.IO connection error:', err.message);
    });

    socket.on('statusUpdate', (data: { userId: string; status: string }) => {
      setUserStatus((prevState) => ({
        ...prevState,
        [data.userId]: data.status,
      }));
    });
    

    return () => {
      if (userId) {
        socket.emit('userStatus', { userId: userId, status: 'offline' });
      }
      socket.off('statusUpdate');
      socket.off('connect');
      socket.off('connect_error');
    };
  }, [dispatch, userId]);

  if (loading) return <CircularProgress color="primary" />;
  if (error) return <Alert color="danger">{error}</Alert>;
  if (users.length === 0) return <Alert>No users available.</Alert>;
  
  console.log("userStatus is:",userStatus)
  console.log("the value of the users is:",users)

  users.map((row, index) => {
    const statusValue = userStatus[row._id];
    console.log(`Status for user ID ${row._id}:`, statusValue);
  
  });
  

  return (
    <Layout tittle={'Home'}>
      <h1>Hello, welcome to Home!</h1>
      {token ? (
        <div>
          <Table aria-label="User Status Table">
            <thead>
              <tr>
                <th>Serial No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((row, index) => (
                <tr key={row.id}>
                  <td>{index + 1}</td>
                  <td>{row.name}</td>
                  <td>{row.email}</td>
                  <td>{userStatus[row._id] === 'online' ? 'Online' : 'Offline'}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <h3>Please Login to See the Users</h3>
      )}
    </Layout>
  );
}

export default Home;
