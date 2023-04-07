import {TypographyOptions} from '@mui/material/styles/createTypography';

// xs, extra-small: 0px
// sm, small: 600px
// md, medium: 900px
// lg, large: 1200px
// xl, extra-large: 1536px

export const typografy: TypographyOptions = {
  h1: {
    fontWeight: 'bold',
    '@media (min-width:0px)': {
      fontSize: '2rem',
    },
    '@media (min-width:320px)': {
      fontSize: '2.2rem',
    },
    '@media (min-width:420px)': {
      fontSize: '2.8rem',
    },
    '@media (min-width:600px)': {
      fontSize: '3rem',
    },
  },
  h3: {
    fontWeight: 'bold',
    '@media (min-width:0px)': {
      fontSize: '1rem',
    },
    '@media (min-width:320px)': {
      fontSize: '1.2rem',
    },
    '@media (min-width:500px)': {
      fontSize: '1.7rem',
    },
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
