import React, { useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../Redux/store';
import { fetchUsers } from '../Redux/usersSlice';
import { selectUsers, selectLoading, selectError } from '../Redux/usersSlice';
import CircularProgress from '@mui/joy/CircularProgress';
import { Alert, Table } from '@mui/joy';
import Chip from '@mui/joy/Chip';
import { selectUser } from '../Redux/authSlice';
import { socket } from '../services/Socket';
import { updateUserStatus, setInitialOnlineUsers} from '../Redux/userStatusSlice';

function Home() {
  const user = useSelector(selectUser);
  const users = useSelector(selectUsers);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const userStatuses = useSelector((state: RootState) => state.userStatus.statuses); 
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUsers()); 

    socket.on('connect', () => {
      if (user?.id) {
        socket.emit('userStatus', { userId: user.id, status: 'online' });
      }
    });

    socket.on('connect_error', (err) => {
      console.error('Socket.IO connection error:', err.message);
    });

    socket.on('statusUpdate', (data: { userId: string; status: string }) => {
      dispatch(updateUserStatus({ userId: data.userId, status: data.status })); 
    });

    socket.on('initialOnlineUsers', (onlineUserIds: string[]) => {
      dispatch(setInitialOnlineUsers(onlineUserIds)); 
    });

    return () => {
      if (user?.id) {
        socket.emit('userStatus', { userId: user.id, status: 'offline' });
      }
      socket.off('statusUpdate');
      socket.off('connect');
      socket.off('connect_error');
      socket.off('initialOnlineUsers');
    };
  }, [dispatch, user?.id]);

  return (
    <Layout tittle={'Home'}>
      <h1>Hello, welcome to Home!</h1>
      {user ? (
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
                      <Chip
                        color={userStatuses[row._id] === 'online' ? 'primary' : 'neutral'}
                        variant="solid"
                        size="md"
                      >
                        {userStatuses[row._id] === 'online' ? 'Online' : 'Offline'}
                      </Chip>
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
