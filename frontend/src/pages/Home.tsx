import React, { useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { fetchUsers } from '../Redux/usersSlice';
import { selectUsers, selectLoading } from '../Redux/usersSlice';
import CircularProgress from '@mui/joy/CircularProgress';
import { Box, Table, Typography } from '@mui/joy';
import Chip from '@mui/joy/Chip';
import { selectUser } from '../Redux/authSlice';
import { socket } from '../services/Socket';
import {
  updateUserStatus,
  setInitialOnlineUsers,
  selectUserStatus,
} from '../Redux/userStatusSlice';
import { useAppDispatch, useAppSelector } from '../Redux/Hooks';
import theme from '../services/Theme';
import { statusUpdateType, User, UserInfoType } from '../models/types';
import toast from 'react-hot-toast';

function Home() {
  const user: User | undefined = useAppSelector(selectUser);
  const users: UserInfoType[] | undefined = useAppSelector(selectUsers);
  const loading: boolean = useAppSelector(selectLoading);
  const userStatuses: Record<string, string> = useAppSelector(selectUserStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) return;
    dispatch(fetchUsers()).then((resultAction) => {
      if (resultAction.meta.requestStatus !== 'fulfilled') {
        toast.error('Failed to load users.');
      }
    });
  }, [dispatch, user]);

  useEffect(() => {
    if (!user?.id) return;

    if (!socket.connected) {
      socket.connect();
      socket.once('connect', () => {
        socket.emit('userStatus', { userId: user.id, status: 'online' });
      });
    } else {
      socket.emit('userStatus', { userId: user.id, status: 'online' });
    }

    socket.on('statusUpdate', (data: statusUpdateType) => {
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
        Welcome {user?.name}, check out who's online
      </Typography>

      {user ? (
        <div>
          {loading ? (
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                mt: 2,
              }}
            >
              <CircularProgress
                size="md"
                sx={{ color: theme.vars.palette.primary }}
              />
            </Box>
          ) : users.length === 0 ? (
            <Typography>No users available.</Typography>
          ) : (
            <Box
              sx={{
                maxHeight: '77vh',
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
