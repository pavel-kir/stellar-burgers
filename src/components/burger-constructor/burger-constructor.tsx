import { FC, useMemo } from 'react';
import { TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '@store';
import { newBurgerActions, newBurgerSelectors, userSelectors } from '@slices';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(userSelectors.getUser);
  const constructorItems = useSelector(newBurgerSelectors.getNewBurger);

  const orderRequest = useSelector(newBurgerSelectors.getOrderStatus);

  const orderModalData = useSelector(newBurgerSelectors.getOrderData);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) {
      navigate('/login');
    } else if (constructorItems.bun) {
      const order = constructorItems.ingredients.map((item) => item._id);
      order.push(constructorItems.bun._id);
      dispatch(newBurgerActions.postOrder(order));
    }
  };
  const closeOrderModal = () => {
    if (orderRequest) {
      dispatch(newBurgerActions.setResolveModal(false));
    } else {
      dispatch(newBurgerActions.clearOrderData());
      dispatch(newBurgerActions.setResolveModal(true));
    }
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
