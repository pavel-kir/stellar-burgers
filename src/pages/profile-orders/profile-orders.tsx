import { ordersActions, ordersSelectors } from '@slices';
import { useDispatch, useSelector } from '@store';
import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ordersActions.getOrders());
  }, []);

  const orders = useSelector(ordersSelectors.getOrders);

  return <ProfileOrdersUI orders={orders} />;
};
