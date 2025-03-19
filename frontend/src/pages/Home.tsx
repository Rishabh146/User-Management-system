// Home.tsx
import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/store';

function Home() {
  // Get the token from Redux store, which is persisted using Redux Persist
  const token = useSelector((state: RootState) => state.auth.token);
  

  return (
    <Layout tittle={'UserManagement'}>
      <h1>Hello, welcome to Home!</h1>
      {token ? (
        <div>
          <h2>Token:</h2>
          {/* <p style={{ wordBreak: 'break-word', maxWidth: '600px', backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px' }}> */}
            {token}
          {/* </p> */}
        </div>
      ) : (
        <p>No token found. Please login.</p>
      )}
    </Layout>
  );
}

export default Home;
