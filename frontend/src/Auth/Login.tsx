// Login.tsx
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';
import Input from '@mui/joy/Input';
import FormControl from '@mui/joy/FormControl';
import Layout from '../components/Layout/Layout';
import Link from '@mui/joy/Link';
import { Typography } from '@mui/joy';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../Redux/authSlice';
import { toast } from 'react-hot-toast'
import { inputstyle, loginBox } from './AuthStyle';
import { loginUser } from '../services/AuthServices';
function Login() {
  const [formData, setFormData] = useState<{ email: string; password: string }>({
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await loginUser(formData.email, formData.password);
      switch (res.status) {
        case 200:
            { 
            dispatch(setUser(res.data.user));
            toast.success("User Login Successfully");
            navigate('/');
            break; }
    
        case 400:
            toast.error(res.data.error || "Invalid email or password.");
            break;
    
        case 401:
            toast.error(res.data.error || "Incorrect login credentials.");
            break;
    
        case 404:
            toast.error(res.data.error || "User not registered.");
            break;
    
        case 500:
            toast.error("Internal server error. Please try again later.");
            break;
    
        default:
            toast.error("An unexpected error occurred.");
            break;
    }
    
  } catch (error: any) {
    toast.error(error.response?.data?.error || 'Login failed');
}

  };

  return (
    <Layout tittle={'Login'}>
      <div>
        <Typography sx={{ textAlign: 'center', m: 2 }}></Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={loginBox}
          >
            <Typography level='h1' sx={{ textAlign: 'center', pt: 3 }}>
              Login Here
            </Typography>
            <FormControl>
              <Input
                name='email'
                type='email'
                placeholder="Email"
                sx={inputstyle}
                value={formData.email}
                onChange={handleChange}
                required
              />
            </FormControl>
            <FormControl>
              <Input
                name='password'
                type='password'
                placeholder="Password"
                sx={inputstyle}
                value={formData.password}
                onChange={handleChange}
                required
              />
            </FormControl>

            <Box>
            <Button size="lg" type="submit" sx={{ textAlign: 'center', px: 20, m: 2 }}>
              Login
            </Button>
            </Box>
            <Typography sx={{ textAlign: 'center', m: 1, p: 1 }}>
              Don't Have an Account?
              <Link component={NavLink} to="/register" underline="none" sx={{ color: '#0000FF', p: 1 }}>
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
