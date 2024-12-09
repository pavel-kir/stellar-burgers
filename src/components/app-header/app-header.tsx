import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '@store';
import { userSelectors } from '@slices';

export const AppHeader: FC = () => {
  const userName = useSelector(userSelectors.getUser)?.name;
  return <AppHeaderUI userName={userName ? userName : ''} />;
};
