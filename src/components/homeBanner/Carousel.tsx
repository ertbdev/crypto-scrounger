import {CurrencySymbol} from '@/constants/currency';
import {getNumberWithCommas} from '@/functions/getNumberWithCommas';
import {useDispatch, useSelector} from '@/hooks/redux';
import {fetchTrendingCoins} from '@/redux/coinsSlice';
import CarouselItemContainer from '@/styles/styledComponents/CarouselItemContainer';
import {CoinDigest} from '@/types/Coin';
import {Grid, Typography} from '@mui/material';
import Image from 'next/image';
import React, {useEffect} from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const Carousel = () => {
  const trendingCoins = useSelector(state => state.coinsSlice.trendingCoins);
  const currency = useSelector(state => state.coinsSlice.currency);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchTrendingCoins(currency));
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const CoinItem = ({data}: {data?: CoinDigest}) => {
    if (!data) {
      return null;
    }

    const profit = data.price_change_percentage_24h >= 0;

    return (
      <CarouselItemContainer href={`/coin/${data.id}`}>
        <Image src={data.image} alt={data.name} height={80} width={80} />
        <Grid display="flex" alignItems="center" sx={{mt: 2}}>
          <Typography variant="body1">{data.symbol} &nbsp;</Typography>
          <Typography color={profit ? 'success.main' : 'error.main'}>
            {profit && '+'}
            {data.price_change_percentage_24h.toFixed(2)}%
          </Typography>
        </Grid>
        <Typography variant="subtitle1">
          {CurrencySymbol[currency]} {getNumberWithCommas(data.current_price)}
        </Typography>
      </CarouselItemContainer>
    );
  };

  return (
    <Grid sx={{width: '100vw'}}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={{0: {items: 2}, 600: {items: 3}, 800: {items: 4}, 1000: {items: 5}}}
        autoPlay
        items={trendingCoins.map((item, index) => (
          <CoinItem key={`${item.id}-${index}`} data={item} />
        ))}
      />
    </Grid>
  );
};

export default Carousel;
