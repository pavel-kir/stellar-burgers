import { getFeed } from '../thunk/feed-thunk';
import { getIngredients } from '../thunk/ingredients-thunk';
import { postOrder } from '../thunk/new-burger-thunk';
import { getOrderbyNumber } from '../thunk/order-thunk';
import { getOrders } from '../thunk/orders-thunk';
import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser
} from '../thunk/user-thunk';
import feedSlice from './feed-slice';
import ingredientsSlice from './ingredients-slice';
import newBurgerSlice from './new-burger-slice';
import orderSlice from './order-slice';
import ordersSlice from './orders-slice';
import userSlice from './user-slice';

export const userSelectors = userSlice.selectors;
export const userActions = {
  ...userSlice.actions,
  loginUser,
  logoutUser,
  registerUser,
  getUser,
  updateUser
};

export const feedSelectors = feedSlice.selectors;
export const feedActions = {
  getFeed
};

export const ingredientsSelectors = ingredientsSlice.selectors;
export const ingredientsActions = {
  getIngredients
};

export const orderSelectors = orderSlice.selectors;
export const orderActions = {
  getOrderbyNumber
};

export const newBurgerSelectors = newBurgerSlice.selectors;
export const newBurgerActions = {
  ...newBurgerSlice.actions,
  postOrder
};

export const ordersSelectors = ordersSlice.selectors;
export const ordersActions = {
  getOrders
};
