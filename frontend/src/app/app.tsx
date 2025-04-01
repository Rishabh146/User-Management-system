
import {Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import PageNotFound from '../pages/PageNotFound';
import Register from '../Auth/Register';
import Login from '../Auth/Login';
import {  ProtectRoutes } from '../pages/ProtectRoute';
import { useSelector } from 'react-redux';
import { selectUser } from '../Redux/authSlice';

const App: React.FC = () => {
    const user=useSelector(selectUser)
  return (
      <Routes>
        <Route
          path="/"
          element={<ProtectRoutes user={user}>
            <Home/>
          </ProtectRoutes>}
        />
        <Route
          path="/about"
          element={
              <ProtectRoutes user={user}>
                <About />
              </ProtectRoutes>
          }
        />
        <Route
          path="/login"
          element={
             
              <Login />
           
          }
        />
        <Route
          path="/register"
          element={
             
              <Register />
         
          }
        />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
  );
};

export default App;
