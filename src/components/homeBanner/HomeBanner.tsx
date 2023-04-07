import {Typography} from '@mui/material';
import Carousel from './Carousel';
import Image from 'next/image';
import BannerContainer from '@/styles/styledComponents/BannerContainer';

const HomeBanner = () => {
  return (
    <BannerContainer>
      <Image alt="banner" src="/images/home_banner.jpg" style={{backgroundSize: 'cover', zIndex: -1}} fill sizes=" 100vw" />
      <Typography variant="h1">Crypto Scrounger</Typography>
      <Typography variant="body2" sx={{textAlign: 'center'}}>
        Get all the info regarding your favorite crypto currency
      </Typography>
      <Carousel />
    </BannerContainer>
  );
};

export default HomeBanner;
