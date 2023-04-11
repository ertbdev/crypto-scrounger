import HomeBanner from '@/components/homeBanner/HomeBanner';
import {Container, LinearProgress} from '@mui/material';
import dynamic from 'next/dynamic';

const CoinsTable = dynamic(() => import('@/components/CoinsTable'), {
  loading: () => <LinearProgress sx={{width: '80%', mx: '10%', mt: 10}} />,
});

const Home = () => {
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{display: 'flex', minHeight:'98vh', flexDirection: 'column', pt: '4.8rem', minWidth: 320, alignItems: 'center'}}>
      <HomeBanner />
      <CoinsTable />
    </Container>
  );
};

export default Home;
