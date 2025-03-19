// Home.tsx
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';

function Home() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    setToken(storedToken);
  }, []);

  return (
    <Layout tittle={'UserManagement'}>
      <h1>Hello, welcome to Home!</h1>
      {token ? (
        <div>
          <h2>Token:</h2>
          <p style={{ wordBreak: 'break-word', maxWidth: '600px', backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px' }}>
            {token}
          </p>
        </div>
      ) : (
        <p>No token found. Please login.</p>
      )}
    </Layout>
  );
}

export default Home;
