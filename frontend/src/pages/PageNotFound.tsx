import { Button, Typography } from '@mui/joy';
import Layout from '../components/Layout/Layout';
import Box from '@mui/joy/Box';

import { Link as RouterLink } from 'react-router-dom';
import {
  pageNotFound404,
  pageNotFoundButton,
  pageNotFoundInnerBox,
  pageNotFoundtext,
} from './PagesStyle';

function PageNotFound() {
  return (
    <Layout tittle="Page-Not-Found">
      <Box sx={pageNotFoundInnerBox}>
        <Typography level="h1" sx={pageNotFound404}>
          404
        </Typography>
        <Typography level="h2" sx={pageNotFoundtext}>
          Oops! Page Not Found
        </Typography>
        <Button
          component={RouterLink}
          to="/"
          variant="solid"
          color="danger"
          sx={pageNotFoundButton}
        >
          Go to Homepage
        </Button>
      </Box>
    </Layout>
  );
}

export default PageNotFound;
