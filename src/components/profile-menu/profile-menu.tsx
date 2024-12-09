import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '@store';
import { userActions } from '@slices';
import { deleteCookie } from '../../utils/cookie';

export const ProfileMenu: FC = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const handleLogout = () => {
    dispatch(userActions.logoutUser())
      .unwrap()
      .then(() => {
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
      })
      .catch((err) => console.log(err));
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
