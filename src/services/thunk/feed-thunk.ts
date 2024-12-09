import { createAsyncThunk } from '@reduxjs/toolkit';
import { FEED_SLICE_NAME } from '../slices/sliceNames';
import { getFeedsApi, TFeedsResponse } from '@api';

export const getFeed = createAsyncThunk<TFeedsResponse, void>(
  `${FEED_SLICE_NAME}/getFeed`,
  async () => await getFeedsApi()
);
