import {Typography} from '@mui/material';
import Carousel from './Carousel';

import BannerContainer from '@/styles/styledComponents/BannerContainer';

const HomeBanner = () => {
  return (
    <BannerContainer>
      <Typography variant="h1">
        Crypto Scrounger
      </Typography>
      <Typography variant="body2" sx={{textAlign: 'center', px: 2}}>
        Get all the info regarding your favorite crypto currency
      </Typography>
      <Carousel />
    </BannerContainer>
  );
};

export default HomeBanner;
