import { Box, Typography, Button, Link } from '@mui/joy';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaRegUserCircle } from "react-icons/fa";
import { useState } from 'react';
// import { clearToken } from 'frontend/src/Redux/authSlice';
import {clearToken} from '../../Redux/authSlice'
import { useDispatch, UseDispatch, useSelector } from 'react-redux';
import { persistor, RootState } from '../../Redux/store';
import { UseSelector } from 'react-redux';


function Header() {
    const token = useSelector((state: RootState) => state.auth.token);
    const dispatch=useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear token from Redux
        dispatch(clearToken());
    
        // Clear persisted Redux store
        persistor.purge();
    
        // Navigate to login page
        navigate('/');
      };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                px: 4,
                py: 2,
                mt: 0,
                boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.3)'
            }}
        >
            {/* Logo */}
            <Typography level="h4">
                <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
                    <FaRegUserCircle style={{ marginRight: '3px' }} />
                    MyApp
                </Box>
            </Typography>

            {/* Navigation Links */}
            {
                token ? 
                <Box sx={{ display: 'flex', gap: 5 }}>
                    <Link
                        component={NavLink}
                        to="/"
                        underline="none"
                        sx={{ color: '#000000' }}
                    >
                        Home
                    </Link>
                    <Link
                        component={NavLink}
                        to="/about"
                        underline="none"
                        sx={{ color: '#000000' }}
                    >
                        About
                    </Link>
                    <Link
                        component={NavLink}
                        to="/contact"
                        underline="none"
                        sx={{ color: '#000000' }}
                    >
                        Contact
                    </Link>
                    <Button
                        onClick={handleLogout}
                        sx={{
                            color: 'white',
                            backgroundColor: '#FF6347',
                            '&:hover': {
                                backgroundColor: '#FF4500'
                            }
                        }}
                    >
                        Logout
                    </Button>
                </Box>
                : 
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Link
                        component={NavLink}
                        to="/register"
                        underline="none"
                        sx={{ color: '#000000' }}
                    >
                        Register
                    </Link>
                    <Link
                        component={NavLink}
                        to="/login"
                        underline="none"
                        sx={{ color: '#000000' }}
                    >
                        Login
                    </Link>
                </Box>
            }
        </Box>
    );
}

export default Header;