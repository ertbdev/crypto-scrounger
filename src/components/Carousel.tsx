import {CurrencySymbol} from '@/constants/currency';
import {getNumberWithCommas} from '@/functions/getNumberWithCommas';
import {useDispatch, useSelector} from '@/hooks/redux';
import {fetchTrendinCoins} from '@/redux/coinsSlice';
import CarouselItemContainer from '@/styles/theme/styledComponents/CarouselItemContainer';
import {Coin} from '@/types/Coin';
import {Grid, Typography} from '@mui/material';
import Image from 'next/image';
import React, {useEffect} from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const Carousel = () => {
  const trendinCoins = useSelector(state => state.coinsSlice.trendinCoins);
  const currency = useSelector(state => state.coinsSlice.currency);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTrendingCoins = async () => {
      console.log('fetching', currency);
      await dispatch(fetchTrendinCoins(currency));
    };
    fetchTrendingCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const CoinItem = ({data}: {data?: Coin}) => {
    if (!data) {
      return null;
    }

    const profit = data.price_change_percentage_24h >= 0;

    return (
      <CarouselItemContainer href={`/coins/${data.id}`}>
        <Image src={data.image} alt={data.name} height={80} width={80} />

        <Grid display="flex" direction="row" alignItems="center" sx={{mt: 2}}>
          <Typography variant="body1">{data.symbol} &nbsp;</Typography>
          <Typography color={profit ? 'success.main': 'error.main'}>
            {profit && '+'}
            {data.price_change_percentage_24h.toFixed(2)}%
          </Typography>
        </Grid>
        <Typography variant="subtitle1">
          {CurrencySymbol[currency]}{' '}
          {getNumberWithCommas(data.current_price)}
        </Typography>
      </CarouselItemContainer>
    );
  };

  return (
    <Grid sx={{maxWidth: '100vw'}}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={{0: {items: 2}, 600: {items: 3}, 800:{items:4}, 1000:{items:5}}}
        autoPlay
        items={trendinCoins.map((item, index) => (
          <CoinItem key={`${item.id}-${index}`} data={item} />
        ))}
      />
    </Grid>
  );
};

export default Carousel;
