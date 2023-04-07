import CoinsTable from '@/components/CoinsTable';
import HomeBanner from '@/components/homeBanner/HomeBanner';
import {Container, Typography} from '@mui/material';

const Home = () => {
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{display: 'flex', flexDirection: 'column', pt: '4.5rem', minWidth: 320, alignItems: 'center'}}>
      <HomeBanner />
      <Typography variant="h3" sx={{my: 5, px:2, textAlign:'center'}}>
        Today&apos;s Cryptocurrency Prices by Market Cap
      </Typography>
      <CoinsTable />
    </Container>
  );
};

export default Home;
