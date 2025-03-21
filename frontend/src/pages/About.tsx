import React from 'react'
import Layout from '../components/Layout/Layout'
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/store';
import { Typography, Card, CardContent, Box, Avatar, Divider, Sheet, Button } from '@mui/joy'

function About() {
  const { user, token } = useSelector((state: RootState) => state.auth);

  console.log("User value:", user, token)

  if (!token) {
    return <Typography>No user is logged in.</Typography>;
  }
  return (
    <Layout tittle={'Profile'}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
        <Card variant="outlined" sx={{ width: 400, borderRadius: 'md', boxShadow: 'lg' }}>
          <CardContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
              <Avatar size="lg">
              </Avatar>
              <Typography level="h3" mt={1}>
                User Profile
              </Typography>
              {/* <Button variant="solid" sx={{display:'flex'}}>Edit</Button> */}
            </Box>
            

            <Divider />

            <Sheet sx={{ mt: 2, px: 1 }}>
              <Typography level="body-md" color="neutral">
                <strong>Name:</strong> <Typography color="primary" level="body-md" display="inline">{user?.name}</Typography>
              </Typography>

              <Typography level="body-md" color="neutral" mt={1}>
                <strong>Email:</strong> <Typography color="primary" level="body-md" display="inline">{user?.email}</Typography>
              </Typography>

              <Typography level="body-md" color="neutral" mt={1}>
                <strong>Age:</strong> <Typography color="primary" level="body-md" display="inline">{user?.age}</Typography>
              </Typography>

              <Typography level="body-md" color="neutral" mt={1}>
                <strong>Gender:</strong> <Typography color="primary" level="body-md" display="inline">{user?.gender}</Typography>
              </Typography>
            </Sheet>
          </CardContent>
        </Card>
      </Box>
    </Layout>
  )
}

export default About