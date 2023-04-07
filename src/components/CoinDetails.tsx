import {Box, Typography} from '@mui/material';
import Image from 'next/image';
import React from 'react';

type Props = {
  id?: string;
  imageUrl?: {large: string; small: string; thumb: string} | string;
  name?: string;
};

const CoinDetails = ({name, imageUrl}: Props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderWidth: '0px 2px 0px 0px',
        width: 300,
        borderStyle: 'solid',
      }}>
      {name && imageUrl && typeof imageUrl !== 'string' ? <Image alt={name} src={imageUrl.large} height={80} width={80} /> : null}

      <Typography>Coin details</Typography>
    </Box>
  );
};

export default CoinDetails;
