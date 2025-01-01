import { RequestStatus } from '@utils-types';
import feedSlice, { TFeedState } from './feed-slice';
import { feedActions } from '@slices';

describe('тесты синхронных экшенов feed-slice', () => {
  const initialState: TFeedState = {
    orders: [],
    total: 0,
    totalToday: 0,
    requestStatus: RequestStatus.Idle
  };

  const pendingState: TFeedState = {
    orders: [],
    total: 0,
    totalToday: 0,
    requestStatus: RequestStatus.Loading
  };

  const rejectedState: TFeedState = {
    orders: [],
    total: 0,
    totalToday: 0,
    requestStatus: RequestStatus.Failed
  };

  const ordersResponse = [
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

  const feedsResponse = {
    success: true,
    orders: ordersResponse,
    total: 1,
    totalToday: 1
  };

  const fulfilledState: TFeedState = {
    orders: ordersResponse,
    total: 1,
    totalToday: 1,
    requestStatus: RequestStatus.Success
  };

  test('getFeed.pending', () => {
    const newState = feedSlice.reducer(
      initialState,
      feedActions.getFeed.pending('')
    );
    expect(newState).toEqual(pendingState);
  });

  test('getFeed.fulfilled', () => {
    const newState = feedSlice.reducer(
      initialState,
      feedActions.getFeed.fulfilled(feedsResponse, '')
    );
    expect(newState).toEqual(fulfilledState);
  });

  test('getFeed.rejected', () => {
    const error = new Error('Error');
    const newState = feedSlice.reducer(
      initialState,
      feedActions.getFeed.rejected(error, '')
    );
    expect(newState).toEqual(rejectedState);
  });
});
