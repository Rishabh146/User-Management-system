
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../Redux/store';
import { fetchPosts } from '../Redux/postSlice';
import CircularProgress from '@mui/joy/CircularProgress';
import { Alert, Box, Table } from '@mui/joy';
import io, { Socket } from 'socket.io-client';
import Chip from '@mui/joy/Chip';

const socket: Socket = io('http://localhost:8080', {
  transports: ['websocket'],
});

function Home() {
  const token = useSelector((state: RootState) => state.auth.token);
  const userId = useSelector((state: RootState) => state.auth.user?.id); 
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector((state: RootState) => state.posts);

  const [userStatus, setUserStatus] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    dispatch(fetchPosts());

    socket.on('connect', () => {
      if (userId) {
        socket.emit('userStatus', { userId: userId, status: 'online' });

      }
    }
    );

    socket.on('connect_error', (err) => {
      console.error('Socket.IO connection error:', err.message);
    });

    socket.on('statusUpdate', (data: { userId: string; status: string }) => {
      setUserStatus((prevState) => ({
        ...prevState,
        [data.userId]: data.status,
      }));
    });

    socket.on('initialOnlineUsers', (onlineUserIds: string[]) => {
      const updatedStatus: { [key: string]: string } = {};
      onlineUserIds.forEach(userId => {
        updatedStatus[userId] = 'online';
      });
      setUserStatus((prevState) => ({
        ...prevState,
        ...updatedStatus,
      }));
    });
    return () => {
      if (userId) {
        socket.emit('userStatus', { userId: userId, status: 'offline' });
      }
      socket.off('statusUpdate');
      socket.off('connect');
      socket.off('connect_error');
      socket.off('initialOnlineUsers');

    };
  }, [dispatch, userId]);

  if (loading) return <CircularProgress color="primary" />;
  if (error) return <Alert color="danger">{error}</Alert>;
  if (users.length === 0) return <Alert>No users available.</Alert>;

  users.map((row, index) => {
    const statusValue = userStatus[row._id];

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
                  <td>


                    {userStatus[row._id] === 'online' ? <Chip color='primary' variant="solid" size='md'>Online</Chip> : <Chip color='neutral' variant="solid" size='md'>Offline</Chip>}

                  </td>


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
