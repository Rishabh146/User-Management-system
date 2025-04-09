import Layout from '../components/Layout/Layout';
import { FormEvent, useState } from 'react';
import { toast } from 'react-hot-toast';
import { NavLink, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/AuthServices';
import { AxiosError } from 'axios';
import theme from '../services/Theme';
import { FormDataType } from '../models/types';
import RegisterPageImage from '../assets/images';
import {
  Box,
  Button,
  Input,
  FormControl,
  Link,
  Typography,
  Sheet,
} from '@mui/joy';
import { registersheetStyle } from './AuthStyle';

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&[\]{}^+_#])([A-Za-z\d@$!%*?&[\]{}^+_#]{8,})$/;

function Register() {
  const navigate = useNavigate();
  const [showPasswordHint, setShowPasswordHint] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormDataType>({
    name: '',
    email: '',
    password: '',
    gender: '',
    age: 0,
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    registerUser(formData)
      .then((res) => {
        toast.success('User registered successfully');
        navigate('/login');
      })
      .catch((error: AxiosError<{ error: string }>) => {
        if (error.code === AxiosError.ERR_NETWORK) {
          toast.error('Network error. Please check your internet connection.');
        } else {
          toast.error(
            error?.response?.data?.error ?? 'Incorrect login credentials.'
          );
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    if (name === 'password') {
      setShowPasswordHint(!passwordRegex.test(value));
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Layout tittle="Register">
      <Box
        sx={{
          minHeight: '75vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          px: 2,
          py: 4,
        }}
      >
        <Sheet
          variant="outlined"
          sx={registersheetStyle}
        >
          <Box
            sx={{
              flex: 1,
              p: { xs: 3, sm: 4 },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Typography level="h4" textAlign="center" mb={2}>
              Sign Up
            </Typography>
            <form onSubmit={handleSubmit}>
              <FormControl sx={{ mb: 2 }}>
                <Input
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </FormControl>
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
                {showPasswordHint && (
                  <Typography
                    level="body-xs"
                    sx={{ color: theme.vars.palette.danger[600], mt: 1 }}
                  >
                    Password must be 8+ chars, with upper/lowercase, number &
                    symbol.
                  </Typography>
                )}
              </FormControl>
              <FormControl sx={{ mb: 2 }}>
                <Input
                  name="gender"
                  placeholder="Gender"
                  value={formData.gender}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl sx={{ mb: 3 }}>
                <Input
                  name="age"
                  type="number"
                  placeholder="Age"
                  value={formData.age}
                  onChange={handleChange}
                />
              </FormControl>
              <Button
                type="submit"
                fullWidth
                loading={isLoading}
                disabled={!passwordRegex.test(formData.password)}
              >
                Sign Up
              </Button>
            </form>
            <Typography level="body-sm" textAlign="center" mt={2}>
              Already have an account?
              <Link
                component={NavLink}
                to="/login"
                underline="none"
                sx={{ ml: 1, color: theme.vars.palette.primary[600] }}
              >
                Login
              </Link>
            </Typography>
          </Box>
          <Box
            sx={{
              flex: 1,
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'background.level1',
              p: 3,
            }}
          >
            <RegisterPageImage />
          </Box>
        </Sheet>
      </Box>
    </Layout>
  );
}

export default Register;
