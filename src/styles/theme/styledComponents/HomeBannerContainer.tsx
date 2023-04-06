import {styled} from '@mui/material/styles';

const HomeBannerContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  height: 400,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'red',
  backgroundImage: 'url(./images/home_banner.jpg)',
  backgroundSize: 'cover',
});

export default HomeBannerContainer;
