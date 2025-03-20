// Home.tsx
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../Redux/store';
import { fetchPosts } from '../Redux/postSlice';
import CircularProgress from '@mui/joy/CircularProgress';
import { Alert, Table } from '@mui/joy';

function Home() {
  // Get the token from Redux store, which is persisted using Redux Persist
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loading) return <CircularProgress color="primary" />;
  if (error) return <Alert color="danger">{error}</Alert>;
  if (users.length === 0) return <Alert>No users available.</Alert>;

  return (
    <Layout tittle={'UserManagement'}>
      <h1>Hello, welcome to Home!</h1>
      {token ? (
        <div>
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
        </div>
      ) : (
      <h3>Please Login to See the User's</h3>
      )}
    </Layout>
  );
}

export default Home;
