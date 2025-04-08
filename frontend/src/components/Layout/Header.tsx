import { Box, Typography, Link } from '@mui/joy';
import { NavLink} from 'react-router-dom';
import LogoutButton from '../../pages/LogOut';
import { selectUser } from '../../Redux/authSlice';
import { useAppSelector } from '../../Redux/Hooks';
import {User} from '../../models/types'


function Header() {
   const user: User|undefined = useAppSelector(selectUser);
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
                    
                    MyApp
                </Box>
            </Typography>
            {
                user?
                <Box sx={{ display: 'flex', gap: 5 }}>
                    <Link
                        component={NavLink}
                        to="/"
                        underline="none"
                        sx={{ color: 'text.primary' }}
                    >
                        Home
                    </Link>
                    <Link
                        component={NavLink}
                        to="/about"
                        underline="none"
                        sx={{ color: 'text.primary' }}
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
                        sx={{ color: 'text.primary'}}
                    >
                        Register
                    </Link>
                    <Link
                        component={NavLink}
                        to="/login"
                        underline="none"
                        sx={{ color: 'text.primary' }}
                    >
                        Login
                    </Link>
                </Box>
            }
        </Box>
    );
}

export default Header;