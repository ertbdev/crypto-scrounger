import {styled} from '@mui/material/styles';

const BannerContainer = styled('div')(({theme}) => ({
  display: 'flex',
  position: 'relative',
  flexDirection: 'column',
  height: 400,
  width: '100%',
  minWidth: 320,
  justifyContent: 'center',
  alignItems: 'center',
  '@media (min-width:0px)': {
    background: `linear-gradient(0deg, ${theme.palette.background.default} 8%, ${theme.palette.secondary.main} 60%, ${theme.palette.background.default} 91%)`,
  },
}));

export default BannerContainer;
