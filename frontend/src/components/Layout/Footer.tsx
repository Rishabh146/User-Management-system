import { Box, Typography } from '@mui/joy';
import React from 'react'

function Footer() {
    return (
        <Box
          component="footer"
          sx={{
            mt: 'auto',
            py: 2,
            px: 4,
            backgroundColor: 'neutral.plainHoverBg',
            borderTop: '1px solid',
            borderColor: 'divider',
            textAlign: 'center',
          }}
        >
          <Typography level="body-lg" color="neutral" sx={{pt:3,pb:3}}>
            © {new Date().getFullYear()} MyApp. All rights reserved.
          </Typography>
        </Box>
      );
}

export default Footer