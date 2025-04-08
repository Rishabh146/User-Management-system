import Layout from '../components/Layout/Layout';
import { FormEvent, useState } from 'react';
import { toast } from 'react-hot-toast';
import { NavLink } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/AuthServices';
import { inputstyle, Item, registerBox } from './AuthStyle';
import RegisterPageImage from '../assets/images';
import { AxiosError } from 'axios';
import theme from '../services/Theme';
import { FormDataType } from '../models/types';
import {
  Box,
  Button,
  Grid,
  Input,
  FormControl,
  Link,
  Typography
} from '@mui/joy';


const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&[\]{}^+_#])([A-Za-z\d@$!%*?&[\]{}^+_#]{8,})$/;

function Register() {
  const navigate = useNavigate();
  const [showPasswordHint, setShowPasswordHint] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormDataType>({
    name: '',
    email: '',
    password: '',
    gender: '',
    age: 0,
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    registerUser(formData)
      .then((res) => {
          toast.success('User registered successfully');
          navigate('/login');
      })
      .catch((error: AxiosError<{error:string}>) => {
        if (error.code === AxiosError.ERR_NETWORK) {
          toast.error('Network error. Please check your internet connection.');
        } else {
          toast.error(
            error?.response?.data?.error ?? 'Incorrect login credentials.'
          );
        }
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
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
    <Layout tittle={'Register'}>
      <div>
        <form onSubmit={handleSubmit}>
          <Grid
            container
            spacing={2}
            columns={16}
            sx={{ flexGrow: 1, maxWidth: 1200, maxHeight: 600 , m:20}}
          >
            <Grid xs={8}>
              <Item>
                <Box
                  sx={{registerBox}}
                >
                  <Typography level="h1" sx={{ textAlign: 'center', color:theme.vars.palette.primary }}>
                    Sign Up Here
                  </Typography>
                  <FormControl>
                    <Input
                      name="name"
                      type="text"
                      placeholder="Name"
                      sx={inputstyle}
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </FormControl>
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
                      placeholder="Password"
                      sx={inputstyle}
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    {showPasswordHint && (
                      <Typography
                        sx={{ color: theme.vars.palette.danger[600], display: 'inline', ml: 2, pl: 1 }}
                      >
                        Enter Strong Password
                      </Typography>
                    )}
                  </FormControl>
                  <FormControl>
                    <Input
                      name="gender"
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
                      name="age"
                      type="number"
                      value={formData.age}
                      onChange={handleChange}
                    />
                  </FormControl>

                  <Box>
                    <Button
                      size="md"
                      sx={{ textAlign: 'center', px: 25, m: 2, py:2 }}
                      type="submit"
                      disabled={!passwordRegex.test(formData.password)}
                    >
                      Sign UP
                    </Button>
                  </Box>
                  <Typography sx={{ textAlign: 'center', m: 1, p: 1 }}>
                    <Box component="span" sx={{ color: theme.vars.palette.primary}}>Already Have an Account?</Box>
                    <Link
                      component={NavLink}
                      to="/login"
                      underline="none"
                      sx={{ color: theme.vars.palette.primary[600], p: 1 }}
                    >
                      Login
                    </Link>
                  </Typography>
                </Box>
              </Item>
            </Grid>
            <Grid xs={8}>
              <Item>
                <RegisterPageImage />
              </Item>
            </Grid>
          </Grid>
        </form>
      </div>
    </Layout>
  );
}

export default Register;
