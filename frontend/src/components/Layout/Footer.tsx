import React from 'react';
import { Box, Typography, Link, Divider } from '@mui/joy';
import { NavLink } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: 4,
        px: 4,
        py: 3,
        backgroundColor: '#f9f9f9',
        boxShadow: '0px -1px 5px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Top Section: Logo + Navigation */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
        {/* Logo / Title */}
        <Typography sx={{ mb: { xs: 2, sm: 0 }, color: '#333' }}>
          User Management System
        </Typography>

        {/* Navigation Links */}
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Link
            component={NavLink}
            to="/"
            underline="none"
            sx={{ color: '#000' }}
          >
            Home
          </Link>
          <Link
            component={NavLink}
            to="/about"
            underline="none"
            sx={{ color: '#000' }}
          >
            About
          </Link>
          <Link
            component={NavLink}
            to="/contact"
            underline="none"
            sx={{ color: '#000' }}
          >
            Contact
          </Link>
        </Box>
      </Box>

      {/* Bottom Section: Copyright */}
      <Typography  sx={{ color: '#555', textAlign: 'center' }}>
        © {new Date().getFullYear()} User Management System. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
