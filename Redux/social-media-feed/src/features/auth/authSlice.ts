import { RootState } from '@/app/store';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { client } from '@/api/client';
import { createAppAsyncThunk } from '@/app/withTypes';

interface AuthState {
  username: string | null
}

const initialState: AuthState = {
  // Note: a real app would probably have more complex auth state,
  // but for this example we'll keep things simple
  username: null,
}

export const login = createAppAsyncThunk(
  'auth/login',
  async (username: string) => {
    await client.post('/fakeApi/login', { username })
    return username
  }
);

export const logout = createAppAsyncThunk('auth/logout', async () => {
  await client.post('/fakeApi/logout', {})
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // !! Acommented bacause of extra reducers
    // userLoggedIn(state, action: PayloadAction<string>) {
    //   state.username = action.payload
    // },
    // userLoggedOut(state) {
    //   state.username = null
    // },
  },
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, action) => {
        state.username = action.payload
      }).addCase(logout.fulfilled, state => {
        state.username = null
      });
  }
});

// commented bacause of extra reducers
// export const { userLoggedIn, userLoggedOut } = authSlice.actions

export const selectCurrentUsername = (state: RootState) => state.auth.username

export default authSlice.reducer
