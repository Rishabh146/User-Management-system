import { Box, Typography, Button, Link } from '@mui/joy';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaRegUserCircle } from "react-icons/fa";
import { useState } from 'react';

function Header() {
    // Set the initial auth state based on the presence of authToken in localStorage
    const [isAuth, setIsAuth] = useState<boolean>(!!localStorage.getItem("authToken"));

    const navigate = useNavigate();

    // Handle logout functionality
    const handleLogout = () => {
        // Remove the authToken from localStorage
        localStorage.removeItem("authToken");

        // Update the auth state
        setIsAuth(false);

        // Redirect the user to the login page
        navigate("/login");
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
                isAuth ? 
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
