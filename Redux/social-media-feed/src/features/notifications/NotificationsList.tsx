import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { TimeAgo } from '@/features/posts/TimeAgo';
import { PostAuthor } from '@/features/posts/PostAuthor'
import { useLayoutEffect } from 'react';
import classnames from 'classnames';
import {
    allNotificationsRead,
    selectAllNotifications
  } from './notificationsSlice';

export const NotificationsList = () => {
    const dispatch = useAppDispatch();
  const notifications = useAppSelector(selectAllNotifications)

  useLayoutEffect(() => { //after that first render and dispatch allNotificationsRead. This creates a new state.notifications array containing the immutably-updated entries, which forces our component to render again because it sees a new array returned from the useSelector.When the component renders the second time, useLayoutEffect hook runs again and dispatches allNotificationsReadagain. The reducer runs again too, but this time no data changes, so the slice state and root state remain the same, and the component doesn't re-render.
    dispatch(allNotificationsRead())
  });

  const renderedNotifications = notifications.map(notification => {
    const notificationClassname = classnames('notification', {
        new: notification.isNew
      });

    return (
      <div key={notification.id} className={notificationClassname}>
        <div>
          <b>
            <PostAuthor userId={notification.user} showPrefix={false} />
          </b>{' '}
          {notification.message}
        </div>
        <TimeAgo timestamp={notification.date} />
      </div>
    )
  })

  return (
    <section className="notificationsList">
      <h2>Notifications</h2>
      {renderedNotifications}
    </section>
  )
}