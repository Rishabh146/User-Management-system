import { Sheet, styled } from '@mui/joy';
export const loginsheetStyle={
  width: '100%',
  maxWidth: 400,
  mx: 'auto',
  p: 4,
  borderRadius: 'lg',
  boxShadow: 'md',
  bgcolor: 'background.surface', 
}
export const registersheetStyle={
  width: '100%',
  maxWidth: 900,
  mx: 'auto',
  display: 'flex',
  flexDirection: { xs: 'column', md: 'row' },
  borderRadius: 'lg',
  boxShadow: 'md',
  bgcolor: 'background.surface',
  overflow: 'hidden',
}

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
