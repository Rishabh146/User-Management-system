import React from 'react';
import Layout from '../components/Layout/Layout';
import {
  Typography,
  Card,
  CardContent,
  Box,
  Avatar,
  Divider,
  Button,
} from '@mui/joy';
import { useState } from 'react';
import theme from '../services/Theme';

import { Input } from '@mui/joy';
import { selectUser } from '../Redux/authSlice';
import { updateUserProfile } from '../Redux/usersSlice';
import { useAppDispatch, useAppSelector } from '../Redux/Hooks';
import { UpdateProfileType, User } from '../models/types';
import toast from 'react-hot-toast';

function About() {
  const dispatch = useAppDispatch();
  const user: User | undefined = useAppSelector(selectUser);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [formData, setFormData] = useState<UpdateProfileType>({
    name: user?.name || '',
    email: user?.email || '',
    age: user?.age,
    gender: user?.gender || '',
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (): Promise<void> => {
    dispatch(updateUserProfile({ profileData: formData })).then(
      (resultAction) => {
        if (resultAction.meta.requestStatus === 'fulfilled') {
          toast.success('Profile updated successfully');
          setEditMode(false);
        } else {
          toast.error('update failed');
        }
      }
    );
  };

  const renderProfileField = (
    label: string,
    value: string | number | undefined
  ) => (
    <Typography
      key={label}
      level="body-md"
      sx={{ color: theme.vars.palette.primary, mt: 1 }}
    >
      <strong>{label}:</strong>{' '}
      <Typography
        level="body-md"
        display="inline"
        sx={{ color: theme.vars.palette.primary }}
      >
        {value || '-'}
      </Typography>
    </Typography>
  );

  if (!user) {
    return <Typography>No user is logged in.</Typography>;
  }

  return (
    <Layout tittle={'Profile'}>
      <Box sx={{ minHeight: '84vh' }}>
        <Typography level="h2" sx={{ textAlign: 'center', my: 2 }}>
          Welcome {user?.name}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
          <Card
            variant="outlined"
            sx={{ width: 400, borderRadius: 'md', boxShadow: 'lg' }}
          >
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  mb: 2,
                }}
              >
                <Avatar size="lg" />
                <Typography level="h3" mt={1}>
                  {user.name}
                </Typography>
                <Button
                  variant="solid"
                  sx={{ mt: 1 }}
                  onClick={() => setEditMode(!editMode)}
                >
                  {editMode ? 'Cancel' : 'Edit Profile'}
                </Button>
              </Box>

              <Divider />
              {editMode ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleUpdate();
                  }}
                >
                  <Input
                    fullWidth
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    sx={{ mt: 1 }}
                    required
                  />
                  <Input
                    fullWidth
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    sx={{ mt: 1 }}
                    disabled
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
                    type="submit"
                  >
                    Save Changes
                  </Button>
                </form>
              ) : (
                <>
                  {renderProfileField('Name', user?.name)}
                  {renderProfileField('Email', user?.email)}
                  {renderProfileField('Age', user?.age)}
                  {renderProfileField('Gender', user?.gender)}
                </>
              )}
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Layout>
  );
}

export default About;
