import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '@store';
import { feedActions, feedSelectors } from '@slices';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(feedActions.getFeed());
  }, []);

  const { orders } = useSelector(feedSelectors.getFeed);

  if (!orders.length) {
    return <Preloader />;
  } else {
    return (
      <FeedUI
        orders={orders}
        handleGetFeeds={() => {
          dispatch(feedActions.getFeed());
        }}
      />
    );
  }
};
