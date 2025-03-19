import { useState } from 'react'
import Button from '@mui/joy/Button';
import Layout from '../components/Layout/Layout';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Contact from '../pages/Contact';
import About from '../pages/About';
import PageNotFound from '../pages/PageNotFound';
import Register from '../Auth/Register';
import Login from '../Auth/Login';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/store';
// import { useNavigate } from 'react-router-dom';


const App: React.FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);

  console.log("Token:",token)

  // ProtectedRoute component logic directly in App.tsx
  const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    if (!token) {
      // If not authorized, redirect to the login page
      return <Navigate to="/login" />;
    }
    return <>{children}</>;
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* Protect Contact and About routes */}
        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          }
        />

        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />

        <Route path="/*" element={<PageNotFound />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
