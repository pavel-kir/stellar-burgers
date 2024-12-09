import { createAsyncThunk } from '@reduxjs/toolkit';
import { NEW_BURGER_SLICE_NAME } from '../slices/sliceNames';
import { orderBurgerApi } from '@api';
import { TNewOrderResponse } from '@api';

export const postOrder = createAsyncThunk<TNewOrderResponse, string[]>(
  `${NEW_BURGER_SLICE_NAME}/postOrder`,
  async (data) => await orderBurgerApi(data)
);
