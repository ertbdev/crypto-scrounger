import HomeBanner from '@/components/HomeBanner';
import {Container, Grid, Typography} from '@mui/material';

const Home = () => {
  return (
    <Container disableGutters maxWidth={false} sx={{pt: '4.5rem', minWidth: 320}}>
      <HomeBanner />
    </Container>
  );
};

export default Home;
