import { Button, Link, Typography } from '@mui/joy';
import Layout from '../components/Layout/Layout'
import Box from '@mui/joy/Box';

function PageNotFound() {
  return (
    <Layout tittle={'Page-Not-Found'}>
       <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
        backgroundColor: 'neutral.800',
        textAlign: 'center',
        color: 'neutral.100',
        padding: '20px', 
        borderRadius: '8px',
      }}
    >
      <Typography
        level="h1"
        sx={{
          fontSize: '8rem',
          fontWeight: 'bold',
          letterSpacing: '5px',
          animation: 'bounce 2s ease infinite', 
        }}
      >
        404
      </Typography>
      <Typography
        level="h2"
        sx={{
          fontSize: '2rem',
          fontWeight: '500',
          marginBottom: '30px',
          textShadow: '2px 2px 8px rgba(0, 0, 0, 0.3)',
        }}
      >
        Oops! Page Not Found
      </Typography>
      <Button
        component={Link}
        variant="solid"
        color="danger"
        sx={{
          padding: '15px 30px',
          fontSize: '1.2rem',
          fontWeight: '600',
          borderRadius: '8px',
          backgroundColor: 'danger.500',
          color: 'neutral.100',
          boxShadow: '0px 10px 15px rgba(255, 99, 71, 0.4)',
          '&:hover': {
            backgroundColor: 'danger.600',
            color: 'neutral.100',
          },
        }}
      >
        Go to Homepage
      </Button>
    </Box>
    </Layout>
  )
}

export default PageNotFound;
