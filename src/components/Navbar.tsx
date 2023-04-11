import {AppBar, Box, FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, Toolbar, Typography} from '@mui/material';
import {Brightness4, Brightness7} from '@mui/icons-material';
import {useThemeContext} from '@/providers/ThemeProvider';
import {Currency} from '@/constants/currency';
import {useRouter} from 'next/router';
import {useDispatch, useSelector} from '@/hooks/redux';
import {changeCurrency} from '@/redux/coinsSlice';

const Navbar = () => {
  const {theme, changeTheme} = useThemeContext();
  const currency = useSelector(state => state.coinsSlice.currency);

  const dispatch = useDispatch();

  const router = useRouter();

  const handleChange = (event: SelectChangeEvent) => {
    dispatch(changeCurrency(event.target.value as Currency));
  };

  const handleGoToHome = () => {
    router.push('/');
  };

  return (
    <Box sx={{display: 'flex', minWidth: 320}}>
      <AppBar
        component="nav"
        position="fixed"
        sx={{minWidth: 320, px: {xs: 0, sm: 6, md: 15}, zIndex: theme => theme.zIndex.drawer + 1, backdropFilter: 'blur(10px)'}}
        color="transparent">
        <Toolbar sx={{justifyContent: 'space-between', height: '4.8rem'}}>
          <Box
            display="flex"
            onClick={handleGoToHome}
            sx={{
              '&:hover': {
                cursor: 'pointer',
              },
            }}>
            <Typography variant="h3">Crypto</Typography>
            <Typography variant="h3" color="primary.main">
              Scrounger
            </Typography>
          </Box>
          <Box display="flex" alignItems={'center'}>
            <FormControl sx={{m: 2, minWidth: {xl: 80, sm: 120}}} size="small">
              <InputLabel id="currency-input">Currency</InputLabel>
              <Select labelId="currency-input" id="currency-selector" value={currency} onChange={handleChange} label="Currency">
                <MenuItem value={Currency.USD}>{Currency.USD}</MenuItem>
                <MenuItem value={Currency.PLN}>{Currency.PLN}</MenuItem>
              </Select>
            </FormControl>

            <IconButton sx={{ml: 1}} onClick={changeTheme} color="inherit">
              {theme === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
