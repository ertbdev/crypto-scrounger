import {AppBar, Box, Button, Grid, IconButton, Link, SwipeableDrawer, Typography} from '@mui/material';
import {Brightness4, Brightness7, Menu} from '@mui/icons-material';
import {useThemeContext} from '@/providers/ThemeProvider';
import {useState} from 'react';

const CustomLink = ({href, title}: {href?: string; title: string}) => {
  return (
    <Link href={href} underline="hover" color="inherit" sx={{mr: {xs: 2, sm: 1.1, md: 2}, mb: {xs: 4, sm: 0}}} variant="h6">
      {title}
    </Link>
  );
};

const Navbar = () => {
  const {theme, changeTheme} = useThemeContext();

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(prevState => !prevState);
  };

  return (
    <Box sx={{display: 'flex', minWidth: 320}}>
      <AppBar
        component="nav"
        position='fixed'
        sx={{px: {xs: 4, sm: 3, md: 15}, zIndex: theme => theme.zIndex.drawer + 1}}
        color="transparent">
        <Grid container direction="row" justifyContent="space-between" height="4.5rem">
          <Grid display="flex" direction="row" alignItems="center">
            <Typography variant="h3">Crypto</Typography>
            <Typography variant="h3" color="primary.main">
              Scrounger
            </Typography>
          </Grid>
          <Grid display="flex" direction="row" alignItems="center">
            <Grid sx={{display: {xs: 'none', sm: 'flex'}, direction: 'row'}} alignItems="center">
              <CustomLink href="/" title="Home" />
            </Grid>
            <IconButton sx={{ml: 1}} onClick={changeTheme} color="inherit">
              {theme === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
            <IconButton sx={{display: {sx: 'flex', sm: 'none'}, ml: 1}} color="inherit" onClick={handleDrawerToggle}>
              <Menu />
            </IconButton>
          </Grid>
        </Grid>
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
        open={mobileOpen}
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
