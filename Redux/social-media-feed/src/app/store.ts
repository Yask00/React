import { Action, ThunkAction,configureStore } from "@reduxjs/toolkit";
import  postsReducer from "../features/posts/postsSlice";
import usersReducer from '@/features/users/usersSlice'
import authReducer from '@/features/auth/authSlice'
import notificationsReducer from '@/features/notifications/notificationsSlice';

import { listenerMiddleware } from './listenerMiddleware'

export const store = configureStore({ // configureStore always requires a reducer option. This should typically be an object containing the individual "slice reducers"
    reducer: {
        posts: postsReducer, // This is the reducer that will be used to manage the state for the `posts` slice
        users: usersReducer,
        auth: authReducer,
        notifications: notificationsReducer
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().prepend(listenerMiddleware.middleware)
});

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
// Export a reusable type for handwritten thunks
export type AppThunk = ThunkAction<void, RootState, unknown, Action>