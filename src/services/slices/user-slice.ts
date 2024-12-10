import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatus, TUser } from '@utils-types';
import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser
} from '../thunk/user-thunk';
import { USER_SLICE_NAME } from './sliceNames';

type TUserState = {
  checkUser: boolean;
  user: TUser | null;
  requestStatus: RequestStatus;
};

const initialState: TUserState = {
  checkUser: false,
  user: null,
  requestStatus: RequestStatus.Idle
};

const userSlice = createSlice({
  name: USER_SLICE_NAME,
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    },
    setCheckUser: (state) => {
      state.checkUser = true;
    }
  },
  selectors: {
    getUser: (state) => state.user,
    getCheckUser: (state) => state.checkUser
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Success;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(registerUser.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Success;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(logoutUser.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.requestStatus = RequestStatus.Success;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(getUser.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
        state.checkUser = true;
      })
      .addCase(getUser.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Success;
        state.user = action.payload.user;
        state.checkUser = true;
      })
      .addCase(updateUser.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Success;
        state.user = action.payload.user;
      })
      .addCase(updateUser.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      });
  }
});

export default userSlice;
