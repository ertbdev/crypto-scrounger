import {configureStore} from '@reduxjs/toolkit';
import coinsSlice from './coinsSlice';

export const store = configureStore({
  reducer: {
    coinsSlice: coinsSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [],
        warnAfter: 128,
      },
      immutableCheck: {warnAfter: 128},
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
