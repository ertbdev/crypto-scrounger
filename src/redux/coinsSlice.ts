import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState} from './store';
import axios from 'axios';
import {CoinList, HistoricalChart, SingleCoin, TrendingCoins} from '@/pages/api/coinGecko';
import {Currency} from '@/constants/currency';
import {Coin, CoinDigest} from '@/types/Coin';

type CoinSliceProps = {
  currency: Currency;
  coins: CoinDigest[];
  trendingCoins: CoinDigest[];
  currentCoin?: Coin;
  coinHistoricalChartData: [number, number][];
};

const initialState: CoinSliceProps = {
  currency: Currency.USD,
  coins: [],
  trendingCoins: [],
  coinHistoricalChartData: [],
};

export const fetchTrendingCoins = createAsyncThunk<CoinDigest[], string, {state: RootState}>(
  'coinsSlice/fetchTrendingCoins',
  async (currency, thunkAPI) => {
    try {
      const {data} = await axios.get(TrendingCoins(currency));
      return data;
    } catch (err) {
      const error = err as {code: string};
      console.error(err);
      return thunkAPI.rejectWithValue(error.code);
    }
  },
);

export const fetchCoins = createAsyncThunk<CoinDigest[], string, {state: RootState}>(
  'coinsSlice/fetchCoins',
  async (currency, thunkAPI) => {
    try {
      const {data} = await axios.get(CoinList(currency));
      return data;
    } catch (err) {
      const error = err as {code: string};
      console.error(err);
      return thunkAPI.rejectWithValue(error.code);
    }
  },
);

export const fetchCoinHistoricalChartData = createAsyncThunk<
  [number, number][],
  {currency: string; id: string; days: number},
  {state: RootState}
>('fetchCoinHistoricalChartData/fetchCoins', async ({currency, days, id}, thunkAPI) => {
  try {
    const {data} = await axios.get(HistoricalChart(id, days, currency));
    return data.prices as [number, number][];
  } catch (err) {
    const error = err as {code: string};
    console.error(err);
    return thunkAPI.rejectWithValue(error.code);
  }
});

export const fetchCoinById = createAsyncThunk<Coin, string, {state: RootState}>('coinsSlice/fetchCoinById', async (coinId, thunkAPI) => {
  try {
    const {data} = await axios.get(SingleCoin(coinId));
    return data;
  } catch (err) {
    const error = err as {code: string};
    console.error(err);
    return thunkAPI.rejectWithValue(error.code);
  }
});

const coinsSlice = createSlice({
  name: 'usersSlice',
  initialState,
  reducers: {
    resetCoinsSlice() {
      return {...initialState};
    },
    changeCurrency(state, action: PayloadAction<Currency>) {
      state.currency = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTrendingCoins.fulfilled, (state, action: PayloadAction<CoinDigest[]>) => {
        state.trendingCoins = action.payload;
      })
      .addCase(fetchCoins.fulfilled, (state, action: PayloadAction<CoinDigest[]>) => {
        state.coins = action.payload;
      })
      .addCase(fetchCoinById.fulfilled, (state, action: PayloadAction<Coin>) => {
        state.currentCoin = action.payload;
      })
      .addCase(fetchCoinHistoricalChartData.fulfilled, (state, action: PayloadAction<[number, number][]>) => {
        state.coinHistoricalChartData = action.payload;
      });
  },
});

export const {resetCoinsSlice, changeCurrency} = coinsSlice.actions;

export default coinsSlice.reducer;
