import store from '@store';
import rootReducer from './rootReducer';

describe('тест инициализации rootReducer', () => {
  const initialState = store.getState();
  test('проверяем правильную работу rootReducer с неизвестным состоянием и экшеном', () => {
    const newState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(newState).toEqual(initialState);
  });
});
