import {createContext, useContext, useEffect, useMemo, useState} from 'react';
import {ThemeProvider as MuiThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import {darkLightColors} from '@/styles/theme/darkLightColors';
import {PaletteMode} from '@mui/material';
import {typografy} from '@/styles/theme/typografy';

type Theme = 'dark' | 'light';

type ThemeContext = {
  theme: Theme;
  changeTheme: () => void;
};

const context = createContext<ThemeContext | null>(null);

export default function ThemeProvider({children}: {children: JSX.Element}) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState<PaletteMode>();

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

  useEffect(() => {
    if (!mode) {
      setMode(prefersDarkMode ? 'dark' : 'light');
    }
  }, [mode, prefersDarkMode]);

  return (
    <context.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline /> {children}
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
