

import Button from '@mui/joy/Button';
import { Button as JoyButton } from '@mui/joy';
import Grid from '@mui/joy/Grid';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import { Skeleton } from '@mui/joy';
import Box from '@mui/joy/Box';
import Input from '@mui/joy/Input';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Layout from '../components/Layout/Layout';
import Link from '@mui/joy/Link';
import { Typography } from '@mui/joy';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const theme = extendTheme({
    components: {
        JoySkeleton: {
            defaultProps: {
                animation: 'wave',
            },
        },
    },
});
const sty = {
    m: 3,
    p: 1,
    borderLeft: 'none',
    borderRight: 'none',
    borderTop: 'none',

}
function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate=useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        try {
          const res = await axios.post('http://localhost:8080/api/v1/auth/login', {
            email,
            password,
          });
    
          if (res.data.success) {
            console.log("user has been login succesfully");
            navigate('/'); 
          } else {
            // toast.error(res.data.message || 'Login failed');
          }
        } catch (error: any) {
        //   toast.error(error.response?.data?.message || 'Something went wrong');
          console.error('Login error:', error);
        }
      };

    return (
        <Layout tittle={'Login'}>
            <div>

                <Typography sx={{ textAlign: 'center', m: 2 }}>
                </Typography>


                <form onSubmit={handleSubmit}>
                    <Box
                        sx={{
                            maxHeight: 500,
                            maxWidth: 400,
                            ml: 80,
                            mt: 10,
                            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)',
                            borderRadius: 4
                        }}
                    >
                        <Typography sx={{ textAlign: 'center', pt: 3 }}>
                            <h1>Login Here</h1>
                        </Typography>
                        <FormControl>
                            <Input placeholder="Email" sx={sty}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>
                        <FormControl>
                            <Input placeholder="Password" sx={sty}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormControl>

                        <Button size="lg" type='submit' sx={{ textAlign: 'center', px: 20, m: 2 }}>Login</Button>
                        <Typography sx={{ textAlign: 'center', m: 1, p: 1 }}>
                            <p>Don't Have Account?
                                <Link
                                    component={NavLink}
                                    to="/register"
                                    underline="none"
                                    sx={{ color: '#0000FF', p:1}}
                                >
                                    Register
                                </Link>
                            </p>
                        </Typography>

                    </Box>
                </form>


            </div>
        </Layout>
    );
}

export default Login