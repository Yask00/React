import { createSlice, nanoid, PayloadAction, createEntityAdapter } from '@reduxjs/toolkit'
import type { RootState } from '@/app/store'
import { selectCurrentUsername } from '@/features/auth/authSlice'
import { client } from '@/api/client'
import { createAppAsyncThunk } from '@/app/withTypes'

interface User {
  id: string
  name: string
}

const usersAdapter = createEntityAdapter<User>()

// const initialState: User[] = [];

// By default, `createEntityAdapter` gives you `{ ids: [], entities: {} }`.
// If you want to track 'loading' or other keys, you would initialize them here:
// `getInitialState({ loading: false, activeRequestId: null })
const initialState = usersAdapter.getInitialState()


// !!! users/fetchusers is described in redux dev tools as "users/fetchUsers/fulfilled"
export const fetchUsers = createAppAsyncThunk('users/fetchUsers', async () => {
  const response = await client.get<User[]>('/fakeApi/users')
  return response.data
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    // You may have noticed that this time the case reducer isn't using the state variable at all. Instead, we're returning the action.payload directly. Immer lets us update state in two ways: either mutating the existing state value, or returning a new result.
    // builder.addCase(fetchUsers.fulfilled, (state, action) => {
    //   return action.payload
    //   // or state.push(...action.payload)
    // })
    builder.addCase(fetchUsers.fulfilled, usersAdapter.setAll)
  }
})

export default usersSlice.reducer

// export const selectAllUsers = (state: RootState) => state.users
// export const selectUserById = (state: RootState, userId: string | null) =>
//   state.users.find((user) => user.id === userId)
export const { selectAll: selectAllUsers, selectById: selectUserById } =
  usersAdapter.getSelectors((state: RootState) => state.users)
export const selectCurrentUser = (state: RootState) => {
  const currentUsername = selectCurrentUsername(state);
  if (!currentUsername) {
    return
  }
  return selectUserById(state, currentUsername);
  // return selectUserById(state, currentUsername)
}
