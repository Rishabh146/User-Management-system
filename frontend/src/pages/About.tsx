import React from 'react'
import Layout from '../components/Layout/Layout'
import { Typography, Card, CardContent, Box, Avatar, Divider, Sheet, Button, IconButton } from '@mui/joy'
import { useState } from 'react';
import {AxiosError} from 'axios'
import theme from '../services/Theme';

import {
  Input,
  Snackbar,
  Alert,
} from '@mui/joy'; 
import { selectUser} from '../Redux/authSlice';
import {updateUserProfile } from '../Redux/usersSlice';
import { useAppDispatch, useAppSelector } from '../Redux/Hooks';
function About() {
  const dispatch = useAppDispatch();
  const user=useAppSelector(selectUser)
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    age: user?.age,
    gender: user?.gender || '',
  });
  const [message, setMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    dispatch(updateUserProfile({ profileData: formData })).unwrap()
      .then((resultAction) => {
        if (updateUserProfile.fulfilled.match(resultAction)) {
          setMessage("Profile updated successfully");
        } else {
          setMessage(resultAction.payload || "Update failed");
        }
  
        setSnackbarOpen(true);
      })
      .catch((error: AxiosError) => {
        setMessage("Update failed");
        setSnackbarOpen(true);
      });
  };
  
  

  if (!user) {
    return <Typography>No user is logged in.</Typography>;
  }
  return (
    <Layout tittle={'Profile'}>
     <Box sx={{ minHeight: '84vh'}}>
     <Typography level="h2" sx={{ textAlign: 'center', my: 2 }}>
              Welcome {user?.name}, check out who are online 
            </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6}}>
        <Card variant="outlined" sx={{ width: 400, borderRadius: 'md', boxShadow: 'lg' }}>
          <CardContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
              <Avatar size="lg" />
              <Typography level="h3" mt={1}>
                {user.name}
              </Typography>
              <Button variant="solid" sx={{ mt: 1 }} onClick={() => setEditMode(!editMode)}>
                {editMode ? 'Cancel' : 'Edit Profile'}
              </Button>
            </Box>

            <Divider />

            <Sheet sx={{ mt: 2, px: 1 }}>
              {editMode ? (
                <>
                  <Input
                    fullWidth
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    sx={{ mt: 1 }}
                  />
                  <Input
                    fullWidth
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    sx={{ mt: 1 }}
                  />
                  <Input
                    fullWidth
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Age"
                    sx={{ mt: 1 }}
                  />
                  <Input
                    fullWidth
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    placeholder="Gender"
                    sx={{ mt: 1 }}
                  />
                  <Button
                    variant="solid"
                    sx={{ mt: 2, color: theme.vars.palette.primary }}
                    onClick={handleUpdate}
                  >
                    Save Changes
                  </Button>
                </>
              ) : (
                <>
                  <Typography level="body-md" sx={{ color: theme.vars.palette.primary, mt:1}}>
                    <strong>Name:</strong>{' '}
                    <Typography sx={{ color: theme.vars.palette.primary}} level="body-md" display="inline">
                      {user?.name}
                    </Typography>
                  </Typography>
                  <Typography level="body-md" sx={{ color: theme.vars.palette.primary, mt:1}}>
                    <strong>Email:</strong>{' '}
                    <Typography sx={{ color: theme.vars.palette.primary}} level="body-md" display="inline">
                      {user?.email}
                    </Typography>
                  </Typography>
                  <Typography level="body-md" sx={{ color: theme.vars.palette.primary, mt:1}}>
                    <strong>Age:</strong>{' '}
                    <Typography sx={{ color: theme.vars.palette.primary}} level="body-md" display="inline">
                      {user?.age}
                    </Typography>
                  </Typography>
                  <Typography level="body-md" sx={{ color: theme.vars.palette.primary, mt:1}}>
                    <strong>Gender:</strong>{' '}
                    <Typography sx={{ color: theme.vars.palette.primary}} level="body-md" display="inline">
                      {user?.gender}
                    </Typography>
                  </Typography>
                </>
              )}
            </Sheet>
          </CardContent>
        </Card>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          sx={{ color: theme.vars.palette.primary, mt:1}}
          variant="soft"
          endDecorator={
            <IconButton size="sm" variant="plain" sx={{ color: theme.vars.palette.primary}} onClick={() => setSnackbarOpen(false)}/>

          }
        >
          {message}
        </Alert>
      </Snackbar>

     </Box>
    </Layout>
  );
}

export default About;
