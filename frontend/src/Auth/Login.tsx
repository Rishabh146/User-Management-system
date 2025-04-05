import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';
import Input from '@mui/joy/Input';
import FormControl from '@mui/joy/FormControl';
import Layout from '../components/Layout/Layout';
import Link from '@mui/joy/Link';
import { Typography } from '@mui/joy';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { setUser } from '../Redux/authSlice';
import { toast } from 'react-hot-toast';
import { inputstyle, loginBox } from './AuthStyle';
import { loginUser } from '../services/AuthServices';
import { AxiosError } from 'axios';
import { useAppDispatch } from '../Redux/Hooks';
import theme from '../services/Theme';
import { socket } from '../services/Socket';

function Login() {
  const [formData, setFormData] = useState<{ email: string; password: string }>({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginUser(formData.email, formData.password)
      .then((user) => {
        dispatch(setUser(user));
        // socket.emit('userStatus', { userId: user.id, status: 'online' });
        toast.success('User Login Successfully');
        navigate('/');
      })
      .catch((err: AxiosError<{ error: string }>) => {
        toast.error(err?.response?.data?.error ?? 'Incorrect login credentials.');
      });
  };

  return (
    <Layout tittle={'Login'}>
      <div>
        <Typography sx={{ textAlign: 'center', m: 2 }}></Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={loginBox}>
            <Typography level="h1" sx={{ textAlign: 'center', pt: 3 }}>
              Login Here
            </Typography>
            <FormControl>
              <Input
                name="email"
                type="email"
                placeholder="Email"
                sx={inputstyle}
                value={formData.email}
                onChange={handleChange}
                required
              />
            </FormControl>
            <FormControl>
              <Input
                name="password"
                type="password"
                placeholder="Password"
                sx={inputstyle}
                value={formData.password}
                onChange={handleChange}
                required
              />
            </FormControl>
            <Box>
              <Button
                size="lg"
                type="submit"
                sx={{ textAlign: 'center', px: 20, m: 2 }}
              >
                Login
              </Button>
            </Box>
            <Typography sx={{ textAlign: 'center', m: 1, p: 1 }}>
              <Box component="span">Don't Have an Account?</Box>
              <Link
                component={NavLink}
                to="/register"
                underline="none"
                sx={{ color: theme.vars.palette.primary, p: 1 }}
              >
                Register
              </Link>
            </Typography>
          </Box>
        </form>
      </div>
    </Layout>
  );
}

export default Login;
