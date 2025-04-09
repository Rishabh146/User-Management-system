import React from 'react';
import { useNavigate } from 'react-router-dom';
import { persistor } from '../Redux/store';
import { toast } from 'react-hot-toast';
import Button from '@mui/joy/Button';
import { selectUser } from '../Redux/authSlice';
import { socket } from '../services/Socket';
import { useAppSelector } from '../Redux/Hooks';
import theme from '../services/Theme';
import { User } from '../models/types';

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();
  const user: User | undefined = useAppSelector(selectUser);
  const userId = user?.id;

  const handleLogout = () => {
    if (userId) {
      socket.emit('logout', userId);
    }

    persistor
      .purge()
      .then(() => {
        navigate('/login', { replace: true });
        toast.success('User Logout Successfully');
      })
      .catch(() => {
        console.log('Some error occurred');
      });
  };

  return (
    <Button
      onClick={handleLogout}
      sx={{ color: theme.vars.palette.danger }}
      variant="solid"
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
