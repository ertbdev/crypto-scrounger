import {TypographyOptions} from '@mui/material/styles/createTypography';

// xs, extra-small: 0px
// sm, small: 600px
// md, medium: 900px
// lg, large: 1200px
// xl, extra-large: 1536px

export const typografy: TypographyOptions = {
  h1: {
    fontSize: '3rem',
    fontWeight: 'bold',
  },
  h3: {
    fontSize: '1.7rem',
    fontWeight: 'bold',
  },
  h6: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    '@media (min-width:600px)': {
      fontSize: '1.1rem',
    },
    '@media (min-width:700px)': {
      fontSize: '1.3rem',
    },
  },
  subtitle1: {
    fontSize: '1.3rem',
    fontWeight: '600',
  },
  body1: {
    fontSize: '1.2rem',
    fontWeight: 'normal',
  },
  body2: {
    fontSize: '1rem',
    fontWeight: 'lighter',
  },
};