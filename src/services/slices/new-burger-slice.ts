import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NEW_BURGER_SLICE_NAME } from './sliceNames';
import { TConstructorIngredient, TOrder } from '@utils-types';
import { postOrder } from '../thunk/new-burger-thunk';

type TNewBurgerState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
  orderRequest: boolean;
  resolveModal: boolean;
  orderData: TOrder | null;
};

const initialState: TNewBurgerState = {
  bun: null,
  ingredients: [],
  orderRequest: false,
  resolveModal: true,
  orderData: null
};

const newBurgerSlice = createSlice({
  name: NEW_BURGER_SLICE_NAME,
  initialState,
  reducers: {
    addIngredients: (state, action: PayloadAction<TConstructorIngredient>) => {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else {
        state.ingredients = [...state.ingredients, action.payload];
      }
    },
    removeIngredient: (state, action: PayloadAction<number>) => {
      state.ingredients.splice(action.payload, 1);
    },
    upIngredient: (state, action: PayloadAction<number>) => {
      const temp = state.ingredients[action.payload - 1];
      state.ingredients[action.payload - 1] = state.ingredients[action.payload];
      state.ingredients[action.payload] = temp;
    },
    downIngredient: (state, action: PayloadAction<number>) => {
      const temp = state.ingredients[action.payload + 1];
      state.ingredients[action.payload + 1] = state.ingredients[action.payload];
      state.ingredients[action.payload] = temp;
    },
    setResolveModal: (state, action: PayloadAction<boolean>) => {
      state.resolveModal = action.payload;
    },
    clearOrderData: (state) => {
      state.orderData = null;
    }
  },
  selectors: {
    getNewBurger: (state) => state,
    getOrderStatus: (state) => state.orderRequest,
    getOrder: (state) => {
      if (state.bun) {
        const order = state.ingredients.map((item) => item._id);
        order.push(state.bun._id);
        return order;
      } else {
        return null;
      }
    },
    getOrderData: (state) => state.orderData
  },
  extraReducers: (builder) => {
    builder
      .addCase(postOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(postOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        (state.bun = null),
          (state.ingredients = []),
          (state.resolveModal = false),
          (state.orderData = action.payload.order);
      })
      .addCase(postOrder.rejected, (state) => {
        state.orderRequest = false;
      });
  }
});

export default newBurgerSlice;
