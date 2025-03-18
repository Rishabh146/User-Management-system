import React, { useState,useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'


function Home() {
  interface User {
    name: string;
    email: string;
    gender: string;
    age: number;
  }
  const [users, setUsers] = useState<User[]>([]);


  // Fetch users from backend
  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/v1/auth/all-users');
      if (res.data.success) {
        setUsers(res.data.users);
        console.log("Users fetched:", res.data.users); // 👈 Print users in console
      } else {
        // toast.error('Failed to fetch users');
      }
    } catch (error) {
      // toast.error('Error fetching users');
      console.error('Fetch users error:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Layout tittle={'UserManagement'}>
      <div style={{ padding: '20px' }}>
        <h2>User List</h2>
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Name</th>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Email</th>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Gender</th>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Age</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>{user.name}</td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>{user.email}</td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>{user.gender}</td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>{user.age}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
}

export default Home