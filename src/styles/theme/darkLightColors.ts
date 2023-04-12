import {PaletteMode} from '@mui/material';
import {PaletteOptions} from '@mui/material/styles';

export const darkLightColors = (mode?: PaletteMode) => {
  const palette: PaletteOptions = {
    mode: mode,
    primary: {
      main: mode === 'dark' ? '#AA52FF' : '#8000FF',
      dark: '#6E00E6',
    },
    secondary: {
      main: mode === 'dark' ? '#3A173A ' : '#FFACFF8F',
    },
    background: {
      default: mode === 'dark' ? '#14161A' : '#FFF',
      paper: mode === 'dark' ? '#000' : '#FFF',
    },
  };
  return palette;
};
