import Item from '@/styles/styledComponents/Item';
import {Box, Grid, Toolbar, Typography, useTheme} from '@mui/material';
import React from 'react';

const Footer = () => {
  const {shadows} = useTheme();

  return (
    <Box sx={{minWidth: 320, boxShadow: shadows[10]}}>
      <Toolbar>
        <Grid container spacing={1} direction="row" justifyContent="space-around" alignItems="center" sx={{pt: {xs: 1, md: 0}}}>
          <Grid item xs={12} sm={6} md={6}>
            <Item>
              <Typography variant="subtitle2">2023 &copy; All Rights Reserved</Typography>
            </Item>
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <Item>
              <Typography variant="subtitle2">Build by Ricardo Toledo</Typography>
            </Item>
          </Grid>
        </Grid>
      </Toolbar>
    </Box>
  );
};

export default Footer;
