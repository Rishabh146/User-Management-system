import React, { useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { RootState } from '../Redux/store';
import { fetchUsers } from '../Redux/usersSlice';
import { selectUsers, selectLoading, selectError } from '../Redux/usersSlice';
import CircularProgress from '@mui/joy/CircularProgress';
import { Alert, Box, Table, Typography } from '@mui/joy';
import Chip from '@mui/joy/Chip';
import { selectUser } from '../Redux/authSlice';
import { socket } from '../services/Socket';
import {
  updateUserStatus,
  setInitialOnlineUsers,
} from '../Redux/userStatusSlice';
import { useAppDispatch, useAppSelector } from '../Redux/Hooks';
import theme from '../services/Theme';
import { text } from 'stream/consumers';

function Home() {
  const user = useAppSelector(selectUser);
  const users = useAppSelector(selectUsers);
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);
  const userStatuses = useAppSelector(
    (state: RootState) => state.userStatus.statuses
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user?.token) {
      dispatch(fetchUsers());
    }
  }, [dispatch, user?.token]);

  useEffect(() => {
    if (!user?.id) return;

    const emitStatus = () => {
      socket.emit('userStatus', { userId: user.id, status: 'online' });
    };

    if (socket.connected) {
      emitStatus();
    } else {
      socket.connect();
      socket.once('connect', emitStatus);
    }

    socket.on('statusUpdate', (data: { userId: string; status: string }) => {
      dispatch(updateUserStatus({ userId: data.userId, status: data.status }));
    });

    socket.on('initialOnlineUsers', (onlineUserIds: string[]) => {
      dispatch(setInitialOnlineUsers(onlineUserIds));
    });

    return () => {
      socket.off('statusUpdate');
      socket.off('connect');
      socket.off('initialOnlineUsers');
    };
  }, [dispatch, user?.id]);

  return (
    <Layout tittle={'Home'}>
      <Typography level="h2" sx={{ textAlign: 'center', my: 2 }}>
        Welcome {user?.name}, check out who are online 
      </Typography>

      {user ? (
        <div>
          {loading ? (
            <CircularProgress sx={{ color: theme.vars.palette.primary }} />
          ) : error ? (
            <Alert sx={{ color: theme.vars.palette.danger }}>{error}</Alert>
          ) : users.length === 0 ? (
            <Alert>No users available.</Alert>
          ) : (
            <Box
              sx={{
                maxHeight: '78vh',
                overflowY: 'auto',
                mt: 2,
                border: '1px solid #ccc',
                borderRadius: 'md',
                p: 1,
                backgroundColor: 'background.body',
              }}
            >
              <Table aria-label="User Status Table" stickyHeader>
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
                          color={
                            userStatuses[row._id] === 'online'
                              ? 'success'
                              : 'neutral'
                          }
                          variant={
                            userStatuses[row._id] === 'online'
                              ? 'solid'
                              : 'outlined'
                          }
                          size="md"
                        >
                          {userStatuses[row._id] === 'online'
                            ? 'Online'
                            : 'Offline'}
                        </Chip>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Box>
          )}
        </div>
      ) : (
        <h3>Please Login to See the Users</h3>
      )}
    </Layout>
  );
}

export default Home;
