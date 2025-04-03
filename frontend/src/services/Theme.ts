import { extendTheme } from '@mui/joy/styles';

const theme = extendTheme({
  cssVarPrefix: 'bs',
  colorSchemes: {
    light: {
      palette: {
        primary: {
          solidBg: '#0d6efd',
        },
        neutral: {
          100: '#f8f9fa',
          800: '#343a40',
        },
        danger: {
          500: '#dc3545',
          600: '#bb2d3b',
        },
      },
    },
    dark: {
      palette: {
        neutral: {
          100: '#f8f9fa',
          800: '#212529',
        },
        danger: {
          500: '#dc3545',
          600: '#bb2d3b',
        },
      },
    },
  },
})
export const colors = theme.colorSchemes.light.palette;
export default theme;
