import { combineReducers } from '@reduxjs/toolkit';
import userSlice from './slices/user-slice';
import feedSlice from './slices/feed-slice';
import ingredientsSlice from './slices/ingredients-slice';
import orderSlice from './slices/order-slice';
import newBurgerSlice from './slices/new-burger-slice';
import ordersSlice from './slices/orders-slice';

const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [feedSlice.name]: feedSlice.reducer,
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [orderSlice.name]: orderSlice.reducer,
  [newBurgerSlice.name]: newBurgerSlice.reducer,
  [ordersSlice.name]: ordersSlice.reducer
});

export default rootReducer;
