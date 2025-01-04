import ingredientsSlice from './ingredients-slice';
import { ingredientsActions } from '@slices';

describe('тесты синхронных экшенов ingredients-slice', () => {
  const ingredientsResponse = [
    {
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
    }
  ];

  test('getIngredients.pending', () => {
    const newState = ingredientsSlice.reducer(
      {
        ingredients: [],
        isIngredientsLoading: false
      },
      ingredientsActions.getIngredients.pending('')
    );
    expect(newState).toEqual({
      ingredients: [],
      isIngredientsLoading: true
    });
  });

  test('getIngredients.fulfilled', () => {
    const newState = ingredientsSlice.reducer(
      {
        ingredients: [],
        isIngredientsLoading: true
      },
      ingredientsActions.getIngredients.fulfilled(ingredientsResponse, '')
    );
    expect(newState).toEqual({
      ingredients: ingredientsResponse,
      isIngredientsLoading: false
    });
  });

  test('getIngredients.rejected', () => {
    const error = new Error('Error');
    const newState = ingredientsSlice.reducer(
      {
        ingredients: [],
        isIngredientsLoading: false
      },
      ingredientsActions.getIngredients.rejected(error, '')
    );
    expect(newState).toEqual({
      ingredients: [],
      isIngredientsLoading: true
    });
  });
});
