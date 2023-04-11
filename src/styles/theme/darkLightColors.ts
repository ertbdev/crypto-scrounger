import {PaletteMode} from '@mui/material';
import {PaletteOptions} from '@mui/material/styles';

export const darkLightColors = (mode?: PaletteMode) => {
  const palette: PaletteOptions = {
    mode: mode,
    primary: {
      main: mode === 'dark' ? '#0C9EE8' : '#0065FF',
    },
    secondary: {
      main: '#8000FF',
      light: 'rgba(154,15,140,.54)',
    },
    background: {
      default: mode === 'dark' ? '#14161A' : '#FFF',
      paper: mode === 'dark' ? '#000' : '#FFF',
    },
  };
  return palette;
};
