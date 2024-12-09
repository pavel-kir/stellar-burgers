import { createAsyncThunk } from '@reduxjs/toolkit';
import { ORDER_SLICE_NAME } from '../slices/sliceNames';
import { getOrderByNumberApi, TOrderResponse } from '@api';

export const getOrderbyNumber = createAsyncThunk<TOrderResponse, number>(
  `${ORDER_SLICE_NAME}/getOrderbyNumber`,
  async (feedNumber) => await getOrderByNumberApi(feedNumber)
);
