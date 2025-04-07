import theme from '../services/Theme';
export const pageNotFoundOuterBox = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  flexDirection: 'column',
  backgroundColor: theme.vars.palette.neutral[400],
  textAlign: 'center',
  color: theme.vars.palette.neutral[100],
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '2px 10px 20px rgba(0, 0, 0, 0.5)',
};

export const pageNotFoundInnerBox = {
  height: 450,
  width: 500,
  borderRadius: 3,
  color: theme.vars.palette.primary[100],
  boxShadow: '0px 10px 20px rgba(65, 54, 54, 0.8)',
  pt: 10,
  backgroundColor: theme.vars.palette.neutral[800],
};

export const pageNotFoundButton={
    backgroundColor: theme.vars.palette.danger[500],
    color: theme.vars.palette.neutral[100],
    boxShadow: '0px 10px 15px rgba(255, 99, 71, 0.5)',
    '&:hover': {
      backgroundColor: theme.vars.palette.danger[600],
      color: theme.vars.palette.neutral[100],
      boxShadow: '0px 12px 18px rgba(255, 99, 71, 0.6)',
    },
}

export const pageNotFound404={
    fontSize: '8rem',
    fontWeight: 'bold',
    letterSpacing: '5px',
    animation: 'bounce 2s ease infinite',
    color: theme.vars.palette.neutral[100],
    textShadow: '4px 4px 10px rgba(255, 255, 255, 0.3)',
}

export const pageNotFoundtext={
    fontSize: '2rem',
    fontWeight: '500',
    marginBottom: '30px',
    textShadow: '2px 2px 8px rgba(0, 0, 0, 0.5)',
    color: theme.vars.palette.neutral[100],
}