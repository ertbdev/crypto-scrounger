import {Container, Grid, Typography} from '@mui/material';

export default function Home() {
  return (
    <Container maxWidth="lg" sx={{flexGrow: 1, pt: '10rem', px: {xs: 4, md: 15}, minWidth: 320, height:5000}}>
      <Grid container spacing={2}>
        <Typography variant="subtitle1">Crypto Scrounger</Typography>
      </Grid>
    </Container>
  );
}
