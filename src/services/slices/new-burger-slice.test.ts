import { newBurgerActions } from '@slices';
import newBurgerSlice from './new-burger-slice';
import { TConstructorIngredient } from '@utils-types';

describe('тесты синхронных экшенов new-burger-slice', () => {
  const ingredient_1: TConstructorIngredient = {
    key: 123,
    _id: '1',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'image',
    image_large: 'large image',
    image_mobile: 'image mobile'
  };

  const ingredient_2: TConstructorIngredient = {
    key: 456,
    _id: '2',
    name: 'Соус с шипами Антарианского плоскоходца',
    type: 'sauce',
    proteins: 101,
    fat: 99,
    carbohydrates: 100,
    calories: 100,
    price: 88,
    image: 'image',
    image_large: 'large image',
    image_mobile: 'image mobile'
  };

  const state_1 = {
    bun: null,
    ingredients: [ingredient_1],
    orderRequest: false,
    resolveModal: true,
    orderData: null
  };

  const state_2 = {
    bun: null,
    ingredients: [ingredient_1, ingredient_2],
    orderRequest: false,
    resolveModal: true,
    orderData: null
  };

  const state_3 = {
    bun: null,
    ingredients: [ingredient_2, ingredient_1],
    orderRequest: false,
    resolveModal: true,
    orderData: null
  };

  test('addIngredients', () => {
    const newState = newBurgerSlice.reducer(
      state_1,
      newBurgerActions.addIngredients(ingredient_2)
    );
    expect(newState).toEqual(state_2);
  });

  test('removeIngredients', () => {
    const newState = newBurgerSlice.reducer(
      state_2,
      newBurgerActions.removeIngredient(1)
    );
    expect(newState).toEqual(state_1);
  });

  test('upIngredients', () => {
    const newState = newBurgerSlice.reducer(
      state_2,
      newBurgerActions.upIngredient(1)
    );
    expect(newState).toEqual(state_3);
  });

  test('downIngredients', () => {
    const newState = newBurgerSlice.reducer(
      state_2,
      newBurgerActions.downIngredient(0)
    );
    expect(newState).toEqual(state_3);
  });
});
