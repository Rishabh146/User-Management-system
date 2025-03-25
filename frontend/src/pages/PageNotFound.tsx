import React from 'react'
import Layout from '../components/Layout/Layout'
import Box from '@mui/joy/Box';


function PageNotFound() {
  return (
    <Layout tittle={'Page-Not-Found'}>
      <Box
        sx={{
          height: 400,
          width: 400,
          m: 4,
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          p: 2,
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <img src="https://webdeasy.de/wp-content/uploads/2020/06/404-pages.jpg" alt="" 
         style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
       
      </Box>
    </Layout>
  )
}

export default PageNotFound