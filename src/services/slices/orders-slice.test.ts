import { ordersActions } from '@slices';
import ordersSlice from './orders-slice';
import { RequestStatus } from '@utils-types';

describe('тесты синхронных экшенов orders-slice', () => {
  const initialState = {
    orders: [],
    requestStatus: RequestStatus.Idle
  };

  const pendingState = {
    orders: [],
    requestStatus: RequestStatus.Loading
  };

  const orders = [
    {
      _id: '1',
      status: 'done',
      name: 'Бургер',
      createdAt: '2024-12-29',
      updatedAt: '2024-12-30',
      number: 1,
      ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa093c']
    }
  ];

  const fulfilledState = {
    orders: orders,
    requestStatus: RequestStatus.Success
  };

  const rejectedState = {
    orders: [],
    requestStatus: RequestStatus.Failed
  };

  test('getOrders.pending', () => {
    const newState = ordersSlice.reducer(
      initialState,
      ordersActions.getOrders.pending('')
    );
    expect(newState).toEqual(pendingState);
  });

  test('getOrders.fulfilled', () => {
    const newState = ordersSlice.reducer(
      initialState,
      ordersActions.getOrders.fulfilled(orders, '')
    );
    expect(newState).toEqual(fulfilledState);
  });

  test('getOrders.rejected', () => {
    const error = new Error('Error');
    const newState = ordersSlice.reducer(
      initialState,
      ordersActions.getOrders.rejected(error, '')
    );
    expect(newState).toEqual(rejectedState);
  });
});
