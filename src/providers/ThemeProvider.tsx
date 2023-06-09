import {createContext, useContext, useEffect, useMemo, useState} from 'react';
import {ThemeProvider as MuiThemeProvider, createTheme} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {darkLightColors} from '@/styles/theme/darkLightColors';
import {CssBaseline, GlobalStyles, PaletteMode} from '@mui/material';
import {typografy} from '@/styles/theme/typografy';

type Theme = 'dark' | 'light';

type ThemeContext = {
  theme: Theme;
  changeTheme: () => void;
};

const context = createContext<ThemeContext | null>(null);

export default function ThemeProvider({children}: {children: JSX.Element}) {
  const [mode, setMode] = useState<PaletteMode>('dark');

  const changeTheme = () => {
    setMode(value => (value === 'dark' ? 'light' : 'dark'));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: darkLightColors(mode),
        typography: typografy,
      }),
    [mode],
  );

  const contextValue = useMemo<ThemeContext>(
    () => ({
      theme: mode || 'light',
      changeTheme,
    }),
    [mode],
  );

  return (
    <context.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles styles={{a: {color: theme.palette.primary.main}}} />
        {children}
      </MuiThemeProvider>
    </context.Provider>
  );
}

export const useThemeContext = () => {
  const themeContext = useContext(context);
  if (!themeContext) {
    throw new Error('themeContext error');
  }
  return themeContext;
};
