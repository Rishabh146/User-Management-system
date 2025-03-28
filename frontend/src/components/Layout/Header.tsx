import { Box, Typography, Link } from '@mui/joy';
import { NavLink} from 'react-router-dom';
import { FaRegUserCircle } from "react-icons/fa";
import {  useSelector } from 'react-redux';
import LogoutButton from '../../pages/LogOut';
import { selectToken } from '../../Redux/authSlice';


function Header() {
   const token = useSelector(selectToken);
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
            <Typography level="h4">
                <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
                    <FaRegUserCircle style={{ marginRight: '3px' }} />
                    MyApp
                </Box>
            </Typography>
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
                    <LogoutButton/>
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