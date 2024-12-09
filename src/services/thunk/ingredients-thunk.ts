import { createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { INGREDIENTS_SLICE_NAME } from '../slices/sliceNames';
import { getIngredientsApi } from '@api';

export const getIngredients = createAsyncThunk<TIngredient[], void>(
  `${INGREDIENTS_SLICE_NAME}/getIngredients`,
  async () => await getIngredientsApi()
);
