import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Box } from '@mui/joy';
// import { Helmet } from "react-helmet";
import Helmet from 'react-helmet'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

type LayoutProps = {
  children: ReactNode;
  tittle:ReactNode;
};

function Layout({ children, tittle }: LayoutProps) {
  return (
    <>
    <ToastContainer />
      <Helmet>
        <meta charSet="utf-8" />
        <title>{tittle}</title>
      </Helmet>
      <Header />
      <Box component="main" sx={{ minHeight: '76vh' }}>
        {children}
      </Box>

      <Footer />
    </>
  );
}

export default Layout;
