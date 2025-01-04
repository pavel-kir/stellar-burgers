import { RequestStatus } from '@utils-types';
import userSlice from './user-slice';
import { userActions } from '@slices';

describe('тесты синхронных экшенов user-slice', () => {
  const user = {
    email: 'a@a.ru',
    name: 'Вася'
  };

  const authResponse = {
    success: true,
    refreshToken: 'abc',
    accessToken: 'abc',
    user: user
  };

  const userData = {
    email: 'a@a.ru',
    password: '123'
  };

  const registerData = {
    email: 'a@a.ru',
    name: 'Вася',
    password: '123'
  };

  const logoutResponse = {
    success: true
  };

  const userResponse = {
    success: true,
    user: user
  };

  const initialState_1 = {
    checkUser: true,
    user: null,
    requestStatus: RequestStatus.Idle
  };

  const initialState_2 = {
    checkUser: true,
    user: user,
    requestStatus: RequestStatus.Success
  };

  const initialState_3 = {
    checkUser: false,
    user: null,
    requestStatus: RequestStatus.Idle
  };

  const initialState_4 = {
    checkUser: true,
    user: null,
    requestStatus: RequestStatus.Success
  };

  const pendingState_1 = {
    checkUser: true,
    user: null,
    requestStatus: RequestStatus.Loading
  };

  const pendingState_2 = {
    checkUser: true,
    user: user,
    requestStatus: RequestStatus.Loading
  };

  const pendingState_3 = {
    checkUser: false,
    user: null,
    requestStatus: RequestStatus.Loading
  };

  const fulfilledState_1 = {
    checkUser: true,
    user: user,
    requestStatus: RequestStatus.Success
  };

  const fulfilledState_2 = {
    checkUser: true,
    user: null,
    requestStatus: RequestStatus.Success
  };

  const rejectedState_1 = {
    checkUser: true,
    user: null,
    requestStatus: RequestStatus.Failed
  };

  const rejectedState_2 = {
    checkUser: true,
    user: user,
    requestStatus: RequestStatus.Failed
  };

  test('setUser', () => {
    const newState = userSlice.reducer(
      initialState_4,
      userActions.setUser(user)
    );
    expect(newState).toEqual(fulfilledState_1);
  });

  test('setCheckUser', () => {
    const newState = userSlice.reducer(
      initialState_3,
      userActions.setCheckUser()
    );
    expect(newState).toEqual(initialState_1);
  });

  test('loginUser.pending', () => {
    const newState = userSlice.reducer(
      initialState_1,
      userActions.loginUser.pending('', userData)
    );
    expect(newState).toEqual(pendingState_1);
  });

  test('loginUser.fulfilled', () => {
    const newState = userSlice.reducer(
      initialState_1,
      userActions.loginUser.fulfilled(authResponse, '', userData)
    );
    expect(newState).toEqual(fulfilledState_1);
  });

  test('loginUser.rejected', () => {
    const error = new Error('Error');
    const newState = userSlice.reducer(
      initialState_1,
      userActions.loginUser.rejected(error, '', userData)
    );
    expect(newState).toEqual(rejectedState_1);
  });

  test('registerUser.pending', () => {
    const newState = userSlice.reducer(
      initialState_1,
      userActions.registerUser.pending('', registerData)
    );
    expect(newState).toEqual(pendingState_1);
  });

  test('registerUser.fulfilled', () => {
    const newState = userSlice.reducer(
      initialState_1,
      userActions.registerUser.fulfilled(authResponse, '', registerData)
    );
    expect(newState).toEqual(fulfilledState_1);
  });

  test('registerUser.rejected', () => {
    const error = new Error('Error');
    const newState = userSlice.reducer(
      initialState_1,
      userActions.registerUser.rejected(error, '', registerData)
    );
    expect(newState).toEqual(rejectedState_1);
  });

  test('logoutUser.pending', () => {
    const newState = userSlice.reducer(
      initialState_2,
      userActions.logoutUser.pending('')
    );
    expect(newState).toEqual(pendingState_2);
  });

  test('logoutUser.fulfilled', () => {
    const newState = userSlice.reducer(
      initialState_2,
      userActions.logoutUser.fulfilled(logoutResponse, '')
    );
    expect(newState).toEqual(fulfilledState_2);
  });

  test('logoutUser.rejected', () => {
    const error = new Error('Error');
    const newState = userSlice.reducer(
      initialState_2,
      userActions.logoutUser.rejected(error, '')
    );
    expect(newState).toEqual(rejectedState_2);
  });

  test('getUser.pending', () => {
    const newState = userSlice.reducer(
      initialState_3,
      userActions.getUser.pending('')
    );
    expect(newState).toEqual(pendingState_3);
  });

  test('getUser.fulfilled', () => {
    const newState = userSlice.reducer(
      initialState_3,
      userActions.getUser.fulfilled(userResponse, '')
    );
    expect(newState).toEqual(fulfilledState_1);
  });

  test('getUser.rejected', () => {
    const error = new Error('Error');
    const newState = userSlice.reducer(
      initialState_3,
      userActions.getUser.rejected(error, '')
    );
    expect(newState).toEqual(rejectedState_1);
  });

  test('updateUser.pending', () => {
    const newState = userSlice.reducer(
      initialState_1,
      userActions.updateUser.pending('', registerData)
    );
    expect(newState).toEqual(pendingState_1);
  });

  test('updateUser.fulfilled', () => {
    const newState = userSlice.reducer(
      initialState_1,
      userActions.updateUser.fulfilled(userResponse, '', registerData)
    );
    expect(newState).toEqual(fulfilledState_1);
  });

  test('updateUser.rejected', () => {
    const error = new Error('Error');
    const newState = userSlice.reducer(
      initialState_1,
      userActions.updateUser.rejected(error, '', registerData)
    );
    expect(newState).toEqual(rejectedState_1);
  });
});
