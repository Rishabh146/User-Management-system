
import {Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import PageNotFound from '../pages/PageNotFound';
import Register from '../Auth/Register';
import Login from '../Auth/Login';
import { ProtectLoginRegister, ProtectRoutes } from '../pages/ProtectRoute';

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<ProtectRoutes>
            <Home/>
          </ProtectRoutes>}
        />
        <Route
          path="/about"
          element={
              <ProtectRoutes>
                <About />
              </ProtectRoutes>
          }
        />
        <Route
          path="/login"
          element={
            <ProtectLoginRegister>
              <Login />
            </ProtectLoginRegister> 
          }
        />
        <Route
          path="/register"
          element={
            <ProtectLoginRegister>
              <Register />
            </ProtectLoginRegister>
          }
        />

        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;
