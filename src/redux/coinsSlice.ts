import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState} from './store';
import axios from 'axios';
import {TrendingCoins} from '@/pages/api/coinGecko';
import {Currency} from '@/constants/currency';
import {Coin} from '@/types/Coin';

type CoinSliceProps = {
  currency: Currency;
  trendinCoins: Coin[];
};

const initialState: CoinSliceProps = {
  currency: Currency.USD,
  trendinCoins: [],
};

export const fetchTrendinCoins = createAsyncThunk<Coin[], string, {state: RootState}>('usersSlice/fetchUsers', async (_, thunkAPI) => {
  try {
    const currency = thunkAPI.getState().coinsSlice.currency;
    const {data} = await axios.get(TrendingCoins(currency));
    return data;
  } catch (err) {
    console.log(err);
    return thunkAPI.rejectWithValue(err);
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
    builder.addCase(fetchTrendinCoins.fulfilled, (state, action: PayloadAction<Coin[]>) => {
      state.trendinCoins = action.payload;
    });
  },
});

export const {resetCoinsSlice, changeCurrency} = coinsSlice.actions;

export default coinsSlice.reducer;
