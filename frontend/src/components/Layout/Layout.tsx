import { ReactNode } from 'react';
import Header from './Header';
import { Box } from '@mui/joy';
import { Helmet } from "react-helmet";
import { Toaster } from 'react-hot-toast';
type LayoutProps = {
  children: ReactNode;
  tittle: ReactNode;
};

function Layout({ children, tittle }: LayoutProps) {
  return (
    <>
      <Toaster position="top-center" containerStyle={{
        top: 20,
        left: 20,
        bottom: 20,
        right: 20,
      }} />
      <Helmet>
        <meta charSet="utf-8" />
        <title>{tittle}</title>
      </Helmet>
      <Header />
      <Box component="main" sx={{ minHeight: '76vh' }}>
        {children}
      </Box>
    </>
  );
}

export default Layout;
