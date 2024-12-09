import {
  getUserApi,
  loginUserApi,
  logoutApi,
  TAuthResponse,
  TLoginData,
  TServerResponse,
  TUserResponse,
  TRegisterData,
  registerUserApi,
  updateUserApi
} from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { USER_SLICE_NAME } from '../slices/sliceNames';

export const loginUser = createAsyncThunk<TAuthResponse, TLoginData>(
  `${USER_SLICE_NAME}/loginUser`,
  async (data) => await loginUserApi(data)
);

export const logoutUser = createAsyncThunk<TServerResponse<{}>, void>(
  `${USER_SLICE_NAME}/logoutUser`,
  async () => await logoutApi()
);

export const getUser = createAsyncThunk<TUserResponse, void>(
  `${USER_SLICE_NAME}/getUser`,
  async () => await getUserApi()
);

export const updateUser = createAsyncThunk<
  TUserResponse,
  Partial<TRegisterData>
>(`${USER_SLICE_NAME}/updateUser`, async (user) => await updateUserApi(user));

export const registerUser = createAsyncThunk<TAuthResponse, TRegisterData>(
  `${USER_SLICE_NAME}/registerUser`,
  async (data) => await registerUserApi(data)
);
