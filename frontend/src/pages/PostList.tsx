import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../Redux/postSlice';
import { RootState, AppDispatch } from '../Redux/store'; // Import AppDispatch
import Layout from '../components/Layout/Layout';
import Table from '@mui/joy/Table';


import { Card, CardContent, CardOverflow, Typography, Stack, CircularProgress, Alert } from '@mui/joy';

const PostList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loading) return <CircularProgress color="primary" />;
  if (error) return <Alert color="danger">{error}</Alert>;
  if (users.length === 0) return <Alert>No users available.</Alert>;

  return (
    <Layout tittle={'post'}>
        <Table aria-label="table sizes">
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Gender</th>
        <th>Age</th>
      </tr>
    </thead>
    <tbody>
      {users.map((row) => (
        <tr>
          <td>{row.name}</td>
          <td>{row.email}</td>
          <td>{row.gender}</td>
          <td>{row.age}</td>
        </tr>
      ))}
    </tbody>
  </Table>
    </Layout>
  );
};

export default PostList;
