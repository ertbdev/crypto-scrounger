import HomeBannerContainer from '@/styles/theme/styledComponents/HomeBannerContainer';
import {Typography} from '@mui/material';
import Carousel from './Carousel';

const HomeBanner = () => {
  return (
    <HomeBannerContainer>
      <Typography variant="h1">Crypto Scrounger</Typography>
      <Typography variant="body2">Get all the info regarding your favorite crypto currency</Typography>
      <Carousel />
    </HomeBannerContainer>
  );
};

export default HomeBanner;
