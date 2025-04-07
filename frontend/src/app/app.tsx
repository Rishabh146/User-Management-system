import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import PageNotFound from '../pages/PageNotFound';
import Register from '../Auth/Register';
import Login from '../Auth/Login';
import { ProtectRoutes } from '../pages/ProtectRoute';
import { selectUser } from '../Redux/authSlice';
import { useAppSelector } from '../Redux/Hooks';
import { User } from '../models/types';

const App: React.FC = () => {
  const user: User | undefined = useAppSelector(selectUser);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectRoutes user={user}>
            <Home />
          </ProtectRoutes>
        }
      />
      <Route
        path="/about"
        element={
          <ProtectRoutes user={user}>
            <About />
          </ProtectRoutes>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
};

export default App;
