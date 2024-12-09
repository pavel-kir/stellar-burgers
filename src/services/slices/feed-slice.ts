import { createSlice } from '@reduxjs/toolkit';
import { FEED_SLICE_NAME } from './sliceNames';
import { RequestStatus, TOrder } from '@utils-types';
import { getFeed } from '../thunk/feed-thunk';

type TFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  requestStatus: RequestStatus;
};

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  requestStatus: RequestStatus.Idle
};

const feedSlice = createSlice({
  name: FEED_SLICE_NAME,
  initialState,
  reducers: {},
  selectors: {
    getFeed: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeed.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(getFeed.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Success;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(getFeed.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      });
  }
});

export default feedSlice;
