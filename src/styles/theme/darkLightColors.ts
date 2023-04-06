import {PaletteMode} from '@mui/material';
import {PaletteOptions, createTheme} from '@mui/material/styles';

// define custom colors: https://material-ui.com/customization/palette/
declare module '@mui/material/styles/createPalette' {
  interface Palette {
    custom?: Palette['primary'];
  }
  interface PaletteOptions {
    custom?: PaletteOptions['primary'];
  }
}

export const darkLightColors = (mode?: PaletteMode) => {
  const palette: PaletteOptions = {
    mode: mode,
    primary: {
      main: '#0065FF',
    },
    secondary: {
      main: '#8000FF',
      light: 'rgba(154,15,140,.54)',
    },
    background: {
      default: mode === 'dark' ? '#666' : '#FFF',
      paper: mode === 'dark' ? '#000' : '#FFF',
    },
    // custom: {
    //   light: '#ffa726',
    //   main: '#f57c00',
    //   dark: '#ef6c00',
    //   contrastText: 'rgba(0, 0, 0, 0.87)',
    // },
  };
  return palette;
};
