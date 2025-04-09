import { Sheet, styled } from '@mui/joy';
export const inputstyle = {
  m: 2,
  p: 1,
  borderLeft: 'none',
  borderRight: 'none',
  borderTop: 'none',
};

export const loginBox = {
  maxHeight: 500,
  maxWidth: 400,
  mt: 30,
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)',
  borderRadius: 4,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
};

export const registerBox = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};
export const RegisterGrid = {
  flexGrow: 1,
  maxWidth: 1100,
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
  borderRadius: 3,
  p: 3,
  bgcolor: 'background.surface',
};

export const Item = styled(Sheet)(({ theme }) => ({
  backgroundColor: theme.palette.background.surface,
  ...theme.typography['body-sm'],
  padding: theme.spacing(1),
  textAlign: 'center',
  borderRadius: theme.radius.sm,
  color: theme.vars.palette.text.secondary,
  ...(theme.applyStyles &&
    theme.applyStyles('dark', {
      backgroundColor: theme.palette.background.level1,
    })),
}));
