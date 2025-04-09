import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { loginUser } from '../services/AuthServices';
import { AxiosError } from 'axios';
import { useAppDispatch } from '../Redux/Hooks';
import { setUser } from '../Redux/authSlice';
import { LoginCredential } from '../models/types';
import {
  Box,
  Button,
  Input,
  FormControl,
  Link,
  Typography,
  CircularProgress,
  Sheet,
} from '@mui/joy';
import theme from '../services/Theme';
import Layout from '../components/Layout/Layout';
import { loginsheetStyle } from './AuthStyle';

function Login() {
  const [formData, setFormData] = useState<LoginCredential>({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setIsLoading(true);
    loginUser(formData.email, formData.password)
      .then((user) => {
        dispatch(setUser(user));
        toast.success('User Login Successfully');
        navigate('/');
      })
      .catch((err: AxiosError<{ error: string }>) => {
        if (err.code === AxiosError.ERR_NETWORK) {
          toast.error('Network error. Please check your internet connection.');
        } else {
          toast.error(
            err?.response?.data?.error ?? 'Incorrect login credentials.'
          );
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Layout tittle={'login'}>
      <Box
        sx={{
          minHeight: '80vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          px: 2,
        }}
      >
        <Sheet
          variant="outlined"
          sx={loginsheetStyle}
        >
          <Typography level="h4" textAlign="center" mb={2}>
            Login
          </Typography>

          <form onSubmit={handleSubmit}>
            <FormControl sx={{ mb: 2 }}>
              <Input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </FormControl>

            <FormControl sx={{ mb: 2 }}>
              <Input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </FormControl>

            <Button
              type="submit"
              fullWidth
              size="lg"
              sx={{ mb: 2 }}
              loading={isLoading}
              loadingIndicator={
                <CircularProgress size="sm" sx={{ color: 'white' }} />
              }
            >
              Login
            </Button>
          </form>

          <Typography level="body-sm" textAlign="center">
            Don&apos;t have an account?
            <Link
              component={NavLink}
              to="/register"
              underline="none"
              sx={{ ml: 1, color: theme.vars.palette.primary }}
            >
              Register
            </Link>
          </Typography>
        </Sheet>
      </Box>
    </Layout>
  );
}

export default Login;
