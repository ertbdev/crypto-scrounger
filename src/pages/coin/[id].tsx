import CoinDetails from '@/components/CoinDetails';
import {useDispatch, useSelector} from '@/hooks/redux';
import {fetchCoinById} from '@/redux/coinsSlice';
import {Container, Grid, Typography} from '@mui/material';
import {useRouter} from 'next/router';
import {useEffect} from 'react';

const CoinPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const data = useSelector(state => state.coinsSlice.currentCoin);

  console.log(data);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCoinData = async () => {
      await dispatch(fetchCoinById(id));
    };
    fetchCoinData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container maxWidth={false} sx={{flexGrow: 1, pt: '10rem', minWidth: 320, height: 5000}}>
     <CoinDetails id={data?.id} name={data?.name} imageUrl={data?.image}/>
    </Container>
  );
};

export default CoinPage;
