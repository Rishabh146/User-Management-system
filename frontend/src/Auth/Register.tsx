import Button from '@mui/joy/Button';
import Grid from '@mui/joy/Grid';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import { Skeleton } from '@mui/joy';
import Box from '@mui/joy/Box';
import Input from '@mui/joy/Input';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Link from '@mui/joy/Link';
import { Typography } from '@mui/joy';
import Layout from '../components/Layout/Layout';
import { FormEvent, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
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
    m: 2,
    p: 1,
    borderLeft: 'none',
    borderRight: 'none',
    borderTop: 'none',
};

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("");
    const [age, setAge] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                'http://localhost:8080/api/v1/auth/register',
                { name, email, password, gender, age }
            );

            if (res.data.success) {
                toast.success("User Registered Successfully");
                navigate("/login");
            } else {
                toast.error(res.data.message || "Registration failed");
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong");
            console.error(error);
        }
    };

    return (
        <Layout tittle={'Register'}>
            <div>
                {/* ✅ Changed Form to form */}
                <form onSubmit={handleSubmit}>
                    <Box
                        sx={{
                            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)',
                            maxWidth: 1070,
                            ml: 45,
                            mt: 10,
                            borderRadius: 3,
                        }}
                    >
                        <Grid container>
                            <Grid>
                                <Box
                                    sx={{
                                        maxHeight: 500,
                                        maxWidth: 440,
                                        my: 4,
                                        gap: 2,
                                        py: 2,
                                        pl: 4,
                                    }}
                                >
                                    <Typography sx={{ textAlign: 'center' }}>
                                        <h1>Sign Up Here</h1>
                                    </Typography>
                                    <FormControl>
                                        <Input
                                            placeholder="Name"
                                            sx={sty}
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <Input
                                            placeholder="Email"
                                            sx={sty}
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <Input
                                            placeholder="Password"
                                            sx={sty}
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <Input
                                            placeholder="Gender"
                                            sx={sty}
                                            value={gender}
                                            onChange={(e) => setGender(e.target.value)}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <Input
                                            placeholder="Age"
                                            sx={sty}
                                            type="number"
                                            value={age}
                                            onChange={(e) => setAge(e.target.value)}
                                        />
                                    </FormControl>

                                    <Button
                                        size="md"
                                        sx={{ textAlign: 'center', px: 18, m: 2 }}
                                        type="submit" // ✅ Add type="submit" to button
                                    >
                                        Sign UP
                                    </Button>
                                    <Typography sx={{ textAlign: 'center', m: 1, p: 1 }}>
                                        <p>
                                            Already Have an Account?
                                            <Link
                                                component={NavLink}
                                                to="/login"
                                                underline="none"
                                                sx={{ color: '#0000FF', p: 1 }}
                                            >
                                                Login
                                            </Link>
                                        </p>
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid>
                                <img
                                    src="https://img.freepik.com/free-vector/demand-insurance-service-digital-insurer-mobile-app-innovative-business-model-female-customer-ordering-insurance-policy-online_335657-2536.jpg?t=st=1741780757~exp=1741784357~hmac=f8872057debcad5c2fa8442ce747d616b7bf324935fd785df2058b4ee5ca7228&w=660"
                                    alt="Placeholder"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </form>
            </div>
        </Layout>
    );
}

export default Register;
