import {Container, Grid, Typography} from '@mui/material';
import {useRouter} from 'next/router';

const CoinPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  return (
    <Container maxWidth="lg" sx={{flexGrow: 1, pt: '10rem', px: {xs: 4, md: 15}, minWidth: 320, height: 5000}}>
      <Grid container spacing={2}>
        <Typography variant="subtitle1">Coin {id}</Typography>
      </Grid>
    </Container>
  );
};

export default CoinPage;
