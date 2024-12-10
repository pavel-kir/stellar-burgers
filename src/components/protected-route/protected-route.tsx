import React from 'react';
import { ProtectedRouteProps } from './type';
import { useSelector } from '../../services/store';
import { userSelectors } from '@slices';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '@ui';

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps): React.ReactElement => {
  const checkUser = useSelector(userSelectors.getCheckUser);
  const user = useSelector(userSelectors.getUser);
  const location = useLocation();

  if (!checkUser) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
};
