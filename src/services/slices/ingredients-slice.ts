import { createSlice } from '@reduxjs/toolkit';
import { INGREDIENTS_SLICE_NAME } from './sliceNames';
import { TIngredient } from '@utils-types';
import { getIngredients } from '../thunk/ingredients-thunk';

export type TIngredientsState = {
  ingredients: TIngredient[];
  isIngredientsLoading: Boolean;
};

const initialState: TIngredientsState = {
  ingredients: [],
  isIngredientsLoading: true
};

const ingredientsSlice = createSlice({
  name: INGREDIENTS_SLICE_NAME,
  initialState,
  reducers: {},
  selectors: {
    getIngredients: (state) => state.ingredients,
    getIsIngredientsLoading: (state) => state.isIngredientsLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isIngredientsLoading = true;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isIngredientsLoading = false;
        state.ingredients = action.payload;
      })
      .addCase(getIngredients.rejected, (state) => {
        state.isIngredientsLoading = true;
      });
  }
});

export default ingredientsSlice;
