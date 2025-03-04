import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'

import { client } from '@/api/client'

import type { RootState } from '@/app/store'
import { createAppAsyncThunk } from '@/app/withTypes'

export interface ServerNotification {
  id: string
  date: string
  message: string
  user: string
}

export interface ClientNotification extends ServerNotification {
    read: boolean
    isNew: boolean
  }

// thunk arguments
// We've already seen that we can pass an argument into a thunk action creator when we dispatch it, like dispatch(addPost(newPost))
//The second argument to our payload creator is a thunkAPI object containing several useful functions and pieces of information:
// - dispatch and getState: the actual dispatch and getState methods
// - extra: the extra argument 
// - requestId: a unique random ID value for this thunk call. Useful for tracking status of an individual request.
// - signal: An AbortController.signal function that can be used to cancel an in-progress request.
// - rejectWithValue: a utility that helps customize the contents of a rejected action if the thunk receives an error.
export const fetchNotifications = createAppAsyncThunk(
  'notifications/fetchNotifications',
  async (_unused, thunkApi) => {
    const allNotifications = selectAllNotifications(thunkApi.getState())
    const [latestNotification] = allNotifications
    const latestTimestamp = latestNotification ? latestNotification.date : ''
    const response = await client.get<ServerNotification[]>(
      `/fakeApi/notifications?since=${latestTimestamp}`
    )
    return response.data
  }
);

const notificationsAdapter = createEntityAdapter<ClientNotification>({
  // Sort with newest first
  sortComparer: (a, b) => b.date.localeCompare(a.date)
})


// const initialState: ServerNotification[] = []
// const initialState: ClientNotification[] = []
const initialState = notificationsAdapter.getInitialState()

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    allNotificationsRead(state) {
        // state.forEach(notification => {
        //   notification.read = true
        // });
        Object.values(state.entities).forEach(notification => {
          notification.read = true
        })
      }
  },
  extraReducers(builder) {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
        const notificationsWithMetadata: ClientNotification[] =
        action.payload.map(notification => ({
          ...notification,
          read: false,
          isNew: true
        }))

      // state.forEach(notification => {
      //   // Any notifications we've read are no longer new
      //   notification.isNew = !notification.read
      // })

      // state.push(...notificationsWithMetadata)
      // Sort with newest first
      // state.sort((a, b) => b.date.localeCompare(a.date))

      Object.values(state.entities).forEach(notification => {
        // Any notifications we've read are no longer new
        notification.isNew = !notification.read
      })

      notificationsAdapter.upsertMany(state, notificationsWithMetadata)
    })
  }
})

export default notificationsSlice.reducer;
export const { allNotificationsRead } = notificationsSlice.actions;
// export const selectAllNotifications = (state: RootState) => state.notifications;
export const { selectAll: selectAllNotifications } =
  notificationsAdapter.getSelectors((state: RootState) => state.notifications)
export const selectUnreadNotificationsCount = (state: RootState) => {
  const allNotifications = selectAllNotifications(state)
  const unreadNotifications = allNotifications.filter((notification) => !notification.read)
  return unreadNotifications.length
}
