import {Currency} from '@/constants/currency';
import {Box, Button, Grid, useMediaQuery, useTheme} from '@mui/material';
import React from 'react';
import {Line} from 'react-chartjs-2';
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartOptions} from 'chart.js';

type Props = {
  currency: Currency;
  data: [number, number][];
  days: number;
  setDays: (days: number) => void;
};

const CoinChart = ({currency, data, days = 1, setDays}: Props) => {
  const {palette, breakpoints} = useTheme();

  const smallScreen = useMediaQuery(breakpoints.down('sm'));

  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
    elements: {
      point: {
        radius: 1,
      },
    },
    color: palette.text.primary,
    scales: {
      y: {
        ticks: {color: palette.text.primary},
      },
      x: {
        ticks: {color: palette.text.primary},
      },
    },
  };

  const labels: string[] = [];
  const coinPrices: number[] = [];

  data.forEach(item => {
    const date = new Date(item[0]);
    const time = `${date.getHours()}:${date.getMinutes()}`;
    labels.push(days === 1 ? time : date.toLocaleDateString());
    coinPrices.push(item[1]);
  });

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignSelf: 'center',
        height: '100%',
        width: {xs: '98vw', md: '70vw'},
        px: 2,
        pt: {xs: 2, md: 0},
      }}>
      <Line
        options={options}
        data={{
          labels: labels,
          datasets: [
            {
              data: coinPrices,
              label: `Price (Past ${days} Days) in ${currency}`,
              borderColor: palette.primary.main,
              backgroundColor: palette.primary.light,
              hoverBorderColor: palette.success.main,
              hoverBackgroundColor: palette.success.light,
            },
          ],
        }}
      />
      <Grid maxWidth="md" sx={{display: 'flex', width: '100%', justifyContent: 'space-around', alignSelf: 'center', pt: 2}}>
        <Button variant={smallScreen ? 'text' : 'contained'} size={smallScreen ? 'small' : 'medium'} onClick={() => setDays(1)}>
          24 Hours
        </Button>
        <Button variant={smallScreen ? 'text' : 'contained'} size={smallScreen ? 'small' : 'medium'} onClick={() => setDays(30)}>
          30 Days
        </Button>
        <Button variant={smallScreen ? 'text' : 'contained'} size={smallScreen ? 'small' : 'medium'} onClick={() => setDays(90)}>
          3 Months
        </Button>
        <Button variant={smallScreen ? 'text' : 'contained'} size={smallScreen ? 'small' : 'medium'} onClick={() => setDays(365)}>
          1 Year
        </Button>
      </Grid>
    </Box>
  );
};

export default CoinChart;
