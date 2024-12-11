import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import {
  Route,
  Routes,
  useLocation,
  useMatch,
  useNavigate
} from 'react-router-dom';
import { ProtectedRoute } from '../protected-route/protected-route';
import { useDispatch } from '@store';
import { useEffect } from 'react';
import { userActions, ingredientsActions } from '@slices';
import { refreshToken } from '@api';

const App = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const feedNumber = useMatch('/feed/:number')?.params.number || '000000';
  const ordersNumber =
    useMatch('profile/orders/:number')?.params.number || '000000';

  useEffect(() => {
    if (localStorage.getItem('refreshToken')) {
      refreshToken()
        .then((res) => {
          if (res.success) {
            dispatch(userActions.getUser());
          } else {
            dispatch(userActions.setCheckUser());
          }
        })
        .catch((err) => {
          console.log(err.message);
          dispatch(userActions.setCheckUser());
        });
    } else {
      dispatch(userActions.setCheckUser());
    }
    dispatch(ingredientsActions.getIngredients());
  }, []);

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={location.state?.background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed'>
          <Route index element={<Feed />} />
          <Route
            path=':number'
            element={
              <div className={styles.detailPageWrap}>
                <p className={`${styles.detailHeader}`}>
                  {`#${feedNumber.padStart(6, '0')}`}
                </p>
                <OrderInfo />
              </div>
            }
          />
        </Route>
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route path='/profile'>
          <Route
            index
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path='orders'>
            <Route
              index
              element={
                <ProtectedRoute>
                  <ProfileOrders />
                </ProtectedRoute>
              }
            />
            <Route
              path=':number'
              element={
                <ProtectedRoute>
                  <div className={styles.detailPageWrap}>
                    <p
                      className={styles.detailHeader}
                    >{`#${ordersNumber.padStart(6, '0')}`}</p>
                    <OrderInfo />
                  </div>
                </ProtectedRoute>
              }
            />
          </Route>
        </Route>
        <Route
          path='/ingredients/:id'
          element={
            <div className={styles.detailPageWrap}>
              <p className={styles.detailHeader}>Детали ингредиента</p>
              <IngredientDetails />
            </div>
          }
        />
        <Route
          element={
            <div className={styles.detailPageWrap}>
              <NotFound404 />
            </div>
          }
        />
      </Routes>

      {location.state?.background && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={handleClose}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/feed/:number'
            element={
              <Modal
                title={`#${feedNumber.padStart(6, '0')}`}
                onClose={handleClose}
              >
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal
                  title={`#${ordersNumber.padStart(6, '0')}`}
                  onClose={handleClose}
                >
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
