import {Currency, CurrencySymbol} from '@/constants/currency';
import {getNumberWithCommas} from '@/functions/getNumberWithCommas';
import {Box, Grid, Typography} from '@mui/material';
import HTMLReactParser from 'html-react-parser';
import Image from 'next/image';
import React from 'react';

import type {SxProps, Theme} from '@mui/material';

type Props = {
  imageUrl: string;
  name: string;
  description: string;
  rank: number;
  currentPrice: number;
  markerCap: number;
  currency: Currency;
};

const CoinDetails = ({name, imageUrl, description, rank, currentPrice, markerCap, currency}: Props) => {
  return (
    <Box sx={styles.container}>
      <Image alt={name} src={imageUrl} height={150} width={150} />
      <Typography variant="h3" sx={{mt: 1}}>
        {name}
      </Typography>
      <Typography variant="body2" sx={{mt: 1, textAlign: 'justify'}}>
        {HTMLReactParser(description)}
      </Typography>
      <Grid display="flex" alignItems="center" sx={{mt: 2}}>
        <Typography variant="body1">Rank: &nbsp;</Typography>
        <Typography variant="body2">{rank}</Typography>
      </Grid>
      <Grid display="flex" alignItems="center" sx={{mt: 2}}>
        <Typography variant="body1">Current Price: &nbsp;</Typography>
        <Typography variant="body2">
          {CurrencySymbol[currency]} {getNumberWithCommas(currentPrice)}
        </Typography>
      </Grid>
      <Grid display="flex" alignItems="center" sx={{mt: 2}}>
        <Typography variant="body1">Market Cap: &nbsp;</Typography>
        <Typography variant="body2">
          {CurrencySymbol[currency]} {getNumberWithCommas(markerCap, true)}
        </Typography>
      </Grid>
    </Box>
  );
};

const styles: {[key: string]: SxProps<Theme>} = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: {xs: '0px 0px 1px 0px', md: '0px 2px 0px 0px'},
    width: {xs: '90vw', md: '30vw'},
    height: '100%',
    borderStyle: 'solid',
    px: {xs: 2, sm: 4},
    pb: {xs: 2, md: 0},
    alignSelf: {xs: 'center', md: 'start'},
  },
};

export default CoinDetails;
