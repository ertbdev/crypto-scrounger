import {
  AppBar,
  Box,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  Link,
  MenuItem,
  Select,
  SelectChangeEvent,
  SwipeableDrawer,
  Toolbar,
  Typography,
} from '@mui/material';
import {Brightness4, Brightness7, Menu} from '@mui/icons-material';
import {useThemeContext} from '@/providers/ThemeProvider';
import {useState} from 'react';
import {Currency} from '@/constants/currency';
import {useRouter} from 'next/router';
import {useDispatch, useSelector} from '@/hooks/redux';
import {changeCurrency} from '@/redux/coinsSlice';

const CustomLink = ({href, title}: {href?: string; title: string}) => {
  return (
    <Link href={href} underline="hover" color="inherit" sx={{mr: {xs: 2, sm: 1.1, md: 2}, mb: {xs: 4, sm: 0}}} variant="h6">
      {title}
    </Link>
  );
};

const Navbar = () => {
  const {theme, changeTheme} = useThemeContext();
  const [showDrawer, setShowDrawer] = useState(false);
  const currency = useSelector(state => state.coinsSlice.currency);

  const dispatch = useDispatch();

  const router = useRouter();

  const handleDrawerToggle = () => {
    setShowDrawer(prevState => !prevState);
  };

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
        sx={{px: {xs: 4, sm: 6, md: 15}, zIndex: theme => theme.zIndex.drawer + 1}}
        color="transparent">
        <Toolbar sx={{justifyContent: 'space-between'}}>
          <Grid
            display="flex"
            alignItems="center"
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
          </Grid>
          <Grid display="flex" alignItems="center">
            <FormControl sx={{m: 2, minWidth: 120}} size="small">
              <InputLabel id="currency-input">Currency</InputLabel>
              <Select labelId="currency-input" id="currency-selector" value={currency} onChange={handleChange} label="Currency">
                <MenuItem value={Currency.USD}>{Currency.USD}</MenuItem>
                <MenuItem value={Currency.PLN}>{Currency.PLN}</MenuItem>
              </Select>
            </FormControl>

            <IconButton sx={{ml: 1}} onClick={changeTheme} color="inherit">
              {theme === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
            <IconButton sx={{display: {sx: 'flex', sm: 'none'}, ml: 1}} color="inherit" onClick={handleDrawerToggle}>
              <Menu />
            </IconButton>
          </Grid>
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        anchor="right"
        variant="temporary"
        hideBackdrop={true}
        sx={{
          display: {xs: 'flex', sm: 'none'},
          width: '100%',
          [`& .MuiDrawer-paper`]: {width: '100%', boxSizing: 'border-box', marginTop: '4.5rem'},
        }}
        open={showDrawer}
        onClose={handleDrawerToggle}
        onOpen={handleDrawerToggle}>
        <Box sx={{display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
          <CustomLink href="/" title="Home" />
        </Box>
      </SwipeableDrawer>
    </Box>
  );
};

export default Navbar;
