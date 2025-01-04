import { orderActions } from '@slices';
import orderSlice from './order-slice';

describe('тесты синхронных экшенов order-slice', () => {
  const order = [
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

  const orderResponse = {
    success: true,
    orders: order
  };
  test('getOrderByNumber.pending', () => {
    const newState = orderSlice.reducer(
      {
        order: null,
        isOrderLoading: false
      },
      orderActions.getOrderbyNumber.pending('', 123)
    );
    expect(newState).toEqual({
      order: null,
      isOrderLoading: true
    });
  });

  test('getOrderByNumber.fulfilled', () => {
    const newState = orderSlice.reducer(
      {
        order: null,
        isOrderLoading: true
      },
      orderActions.getOrderbyNumber.fulfilled(orderResponse, '', 123)
    );
    expect(newState).toEqual({
      order: order[0],
      isOrderLoading: false
    });
  });

  test('getOrderByNumber.rejected', () => {
    const error = new Error('Error');
    const newState = orderSlice.reducer(
      {
        order: null,
        isOrderLoading: false
      },
      orderActions.getOrderbyNumber.rejected(error, '', 123)
    );
    expect(newState).toEqual({
      order: null,
      isOrderLoading: true
    });
  });
});
