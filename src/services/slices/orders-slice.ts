import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TOrder } from '@utils-types';
import { ORDERS_SLICE_NAME } from './sliceNames';
import { getOrders } from '../thunk/orders-thunk';

type TOrdersState = {
  orders: TOrder[];
  requestStatus: RequestStatus;
};

const initialState: TOrdersState = {
  orders: [],
  requestStatus: RequestStatus.Idle
};

const ordersSlice = createSlice({
  name: ORDERS_SLICE_NAME,
  initialState,
  reducers: {},
  selectors: {
    getOrders: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Success;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      });
  }
});

export default ordersSlice;
