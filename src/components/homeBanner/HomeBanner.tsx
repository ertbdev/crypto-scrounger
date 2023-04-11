import {Typography} from '@mui/material';
import Carousel from './Carousel';
import Image from 'next/image';
import BannerContainer from '@/styles/styledComponents/BannerContainer';
import image from '../../assets/images/home_banner.jpg';

const HomeBanner = () => {
  return (
    <BannerContainer>
      <Image
        alt="banner"
        src={image}
        style={{zIndex: -1, opacity: 0.7, filter: 'blur(2px)'}}
        fill
        sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
        loading="lazy"
      />
      <Typography variant="h1" sx={{color: '#fff'}}>
        Crypto Scrounger
      </Typography>
      <Typography variant="body2" sx={{textAlign: 'center', px: 2, color: '#fff'}}>
        Get all the info regarding your favorite crypto currency
      </Typography>
      <Carousel />
    </BannerContainer>
  );
};

export default HomeBanner;
