import { Sheet, styled } from "@mui/joy";
export const inputstyle = {
    m: 2,
    p: 1,
    borderLeft: 'none',
    borderRight: 'none',
    borderTop: 'none',
}

export const loginBox = {
    maxHeight: 500,
    maxWidth: 400,
    mt:30,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)',
    borderRadius: 4,
    display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection:'column'
}

export const registerBox = {
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)',
    maxWidth: 1100,
    ml: 45,
    mt: 10,
    borderRadius: 3,
    maxHeight: 600,
    my: 4,
    gap: 2,
    py: 2,
    pl: 4,
    gridTemplateColumns: `repeat(2, 1fr)`
}
export const Item = styled(Sheet)(({ theme }) => ({
  backgroundColor: theme.palette.background.surface,
  ...theme.typography['body-sm'],
  padding: theme.spacing(1),
  textAlign: 'center',
  borderRadius: theme.radius.sm,
  color: theme.vars.palette.text.secondary,
  ...(theme.applyStyles && theme.applyStyles('dark', {
    backgroundColor: theme.palette.background.level1,
  })),
}));
