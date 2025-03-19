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
// import { useNavigate } from 'react-router-dom';


const isAuth = localStorage.getItem("authToken");

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  if (!isAuth) {
    // If not authorized, redirect to the login page
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={
            <ProtectedRoute>
              <Home/>
            </ProtectedRoute>
          }  />
        
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