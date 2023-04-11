import CoinChart from '@/components/CoinChart';
import CoinDetails from '@/components/CoinDetails';
import {useDispatch, useSelector} from '@/hooks/redux';
import {fetchCoinById, fetchCoinHistoricalChartData} from '@/redux/coinsSlice';
import {Container, Grid, Toolbar} from '@mui/material';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';

const CoinPage = () => {
  const router = useRouter();
  const {id} = router.query;

  const [days, setDays] = useState(1);

  const data = useSelector(state => state.coinsSlice.currentCoin);
  const chartData = useSelector(state => state.coinsSlice.coinHistoricalChartData);
  const currency = useSelector(state => state.coinsSlice.currency);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCoinData = async () => {
      id && typeof id === 'string' && (await dispatch(fetchCoinById(id)));
    };
    fetchCoinData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, currency]);

  useEffect(() => {
    const fetchCoinData = async () => {
      id && typeof id === 'string' && (await dispatch(fetchCoinHistoricalChartData({id: id, currency: currency, days: days})));
    };
    fetchCoinData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, currency, days]);

  if (!data) {
    return null;
  }

  return (
    <Container disableGutters maxWidth={false} sx={{display: 'flex', flexDirection: 'column', pt: '4.8rem', minWidth: 320, minHeight: '100vh'}}>
      <Toolbar />
      <Grid sx={{display: 'flex', flexDirection: {xs: 'column', md: 'row'}, height: '100vh'}}>
        <CoinDetails
          name={data?.name}
          imageUrl={data.image.large}
          description={data.description.en.split('. ')[0]}
          rank={data.market_cap_rank}
          currentPrice={data.market_data.current_price[currency.toLowerCase()]}
          markerCap={data.market_data.market_cap[currency.toLowerCase()]}
          currency={currency}
        />
        <CoinChart currency={currency} data={chartData} days={days} setDays={setDays} />
      </Grid>
    </Container>
  );
};

export default CoinPage;
