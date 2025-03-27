
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch} from '../Redux/store';
import { fetchUsers} from '../Redux/usersSlice';
import { selectUsers, selectLoading, selectError } from '../Redux/usersSlice';
import CircularProgress from '@mui/joy/CircularProgress';
import { Alert, Box, Table } from '@mui/joy';
import io, { Socket } from 'socket.io-client';
import Chip from '@mui/joy/Chip';
import {selectToken, selectUserId } from '../Redux/authSlice';


const socket: Socket = io('http://localhost:8080', {
  transports: ['websocket'],
});

function Home() {
  const token = useSelector(selectToken);
  const userId = useSelector(selectUserId);
  const users = useSelector(selectUsers);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError)
  const dispatch = useDispatch<AppDispatch>();
  const [userStatus, setUserStatus] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    dispatch(fetchUsers());

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
  
  return (
    <Layout tittle={'Home'}>
      <h1>Hello, welcome to Home!</h1>
      {token ? (
        <div>
          {loading ? (
            <CircularProgress color="primary" />
          ) : error ? (
            <Alert color="danger">{error}</Alert>
          ) : users.length === 0 ? (
            <Alert>No users available.</Alert>
          ) : (
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
                  <tr key={row._id}>
                    <td>{index + 1}</td>
                    <td>{row.name}</td>
                    <td>{row.email}</td>
                    <td>
                      {<Chip
                        color={userStatus[row._id] === 'online' ? 'primary' : 'neutral'}
                        variant="solid"
                        size="md"
                      >
                        {userStatus[row._id] === 'online' ? 'Online' : 'Offline'}
                      </Chip>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      ) : (
        <h3>Please Login to See the Users</h3>
      )}
    </Layout>
  );
}

export default Home;
