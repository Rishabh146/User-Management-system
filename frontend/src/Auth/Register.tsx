import Button from '@mui/joy/Button';
import Grid from '@mui/joy/Grid';
import Box from '@mui/joy/Box';
import Input from '@mui/joy/Input';
import FormControl from '@mui/joy/FormControl';
import Link from '@mui/joy/Link';
import { Typography } from '@mui/joy';
import Layout from '../components/Layout/Layout';
import { FormEvent, useState } from 'react';
import { toast } from 'react-hot-toast'
import { NavLink } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/AuthServices';
import { inputstyle, registerBox } from './AuthStyle';
import RegisterPageImage from '../assets/images';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

function Register() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });
    const [showPasswordHint, setShowPasswordHint] = useState(false);
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        gender: '',
        age: 0
    });
    
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await registerUser(formData);
        
            if (res.status === 200 || res.status === 201) {
                toast.success("User registered successfully");
                navigate("/login");
            } else if (res.status === 400) {
                toast.error(res.data.error || "Bad request. Please check the fields.");
            } else if (res.status === 409) {
                toast.error(res.data.error || "User already exists. Please login.");
            } else {
                toast.error(res.data.error || "Something went wrong");
            }
        } catch (error: any) {
            if (error.response) {
                if (error.response.status === 400) {
                    toast.error(error.response.data.error || "Bad request. Please check the fields.");
                } else if (error.response.status === 409) {
                    toast.error(error.response.data.error || "User already exists. Please login.");
                } else if (error.response.status === 500) {
                    toast.error(error.response.data.error || "Error in registration");
                } else {
                    toast.error(error.response.data.error || "Something went wrong");
                }
            } else {
                toast.error("Network or server error");
            }
        }
        
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (name === "password") {
            setFormData(prev => ({
                ...prev,
                password: value
            }));
        }
    };

    return (
        <Layout tittle={'Register'}>
            <div>
                <form onSubmit={handleSubmit}>
                    <Box sx={registerBox}>
                        <Grid container>
                            <Grid sx={{ maxWidth: 400,}}>
                                <Box sx={{ maxHeight: 600, maxWidth: 490, my: 4, gap: 2, py: 2, pl: 4 }}>
                                    <Typography level='h1' sx={{ textAlign: 'center' }}>Sign Up Here</Typography>
                                    <FormControl>
                                        <Input
                                            name='name'
                                            type='text'
                                            placeholder="Name"
                                            sx={inputstyle}
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </FormControl>
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
                                            placeholder="Password"
                                            sx={inputstyle}
                                            name='password'
                                            type="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            onFocus={() => setShowPasswordHint(true)}
                                            onBlur={() => setShowPasswordHint(false)}
                                            required
                                        />
                                        {showPasswordHint && <Typography sx={{ color: 'red', display:'inline',ml: 2,pl: 1, }}>Enter Strong Password</Typography>}
                                        {errors.password && <Typography sx={{ color: 'red' }}>{errors.password}</Typography>}
                                    </FormControl>
                                    <FormControl>
                                        <Input
                                            name='gender'
                                            placeholder="Gender"
                                            sx={inputstyle}
                                            value={formData.gender}
                                            onChange={handleChange}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <Input
                                            placeholder="Age"
                                            sx={inputstyle}
                                            name='age'
                                            type="number"
                                            value={formData.age}
                                            onChange={handleChange}
                                        />
                                    </FormControl>

                                    <Button 
                                        size="sm" 
                                        sx={{ textAlign: 'center', px: 18, m: 2 }} 
                                        type="submit" 
                                        disabled={!passwordRegex.test(formData.password)}
                                    >
                                        Sign UP
                                    </Button>
                                    <Typography sx={{ textAlign: 'center', m: 1, p: 1 }}>
                                        <p>
                                            Already Have an Account?
                                            <Link component={NavLink} to="/login" underline="none" sx={{ color: '#0000FF', p: 1 }}>Login</Link>
                                        </p>
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid>
                                <RegisterPageImage/>
                            </Grid>
                        </Grid>
                    </Box>
                </form>
            </div>
        </Layout>
    );
}

export default Register;


