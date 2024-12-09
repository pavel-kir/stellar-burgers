import { createSlice } from '@reduxjs/toolkit';
import { ORDER_SLICE_NAME } from './sliceNames';
import { TOrder } from '@utils-types';
import { getOrderbyNumber } from '../thunk/order-thunk';

type TOrderState = {
  order: TOrder | null;
  isOrderLoading: Boolean;
};

const initialState: TOrderState = {
  order: null,
  isOrderLoading: true
};

const orderSlice = createSlice({
  name: ORDER_SLICE_NAME,
  initialState,
  reducers: {},
  selectors: {
    getOrder: (state) => state.order,
    getOrderRequest: (state) => state.isOrderLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderbyNumber.pending, (state) => {
        state.isOrderLoading = true;
      })
      .addCase(getOrderbyNumber.fulfilled, (state, action) => {
        state.isOrderLoading = false;
        state.order = action.payload.orders[0];
      })
      .addCase(getOrderbyNumber.rejected, (state) => {
        state.isOrderLoading = true;
      });
  }
});

export default orderSlice;
