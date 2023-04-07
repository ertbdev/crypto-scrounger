import {styled} from '@mui/material/styles';
import Link from 'next/link';

const CarouselItemContainer = styled(Link)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  cursor: 'pointer',
  color: '#FFF',
  marginTop: 30,
  textDecoration: 'none',
});

export default CarouselItemContainer;
