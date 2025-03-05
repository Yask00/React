import { createSlice, nanoid, PayloadAction, createSelector, createEntityAdapter,
  EntityState } from '@reduxjs/toolkit'
import type { RootState } from '@/app/store'
import { sub } from 'date-fns'
// import { userLoggedOut } from '@/features/auth/authSlice'
import { logout } from '@/features/auth/authSlice';
import { client } from '@/api/client';
import { createAppAsyncThunk } from '@/app/withTypes'
import { AppStartListening } from '@/app/listenerMiddleware'


export interface Reactions {
  thumbsUp: number
  tada: number
  heart: number
  rocket: number
  eyes: number
}

export type ReactionName = keyof Reactions

export interface Post {
  id: string
  title: string
  content: string
  user: string
  date: string
  reactions: Reactions
}

type PostUpdate = Pick<Post, 'id' | 'title' | 'content'>
export type NewPost = Pick<Post, 'title' | 'content' | 'user'>

const initialReactions: Reactions = {
  thumbsUp: 0,
  tada: 0,
  heart: 0,
  rocket: 0,
  eyes: 0,
}

// !!! Normilize with createEntityAdapter
interface PostsState extends EntityState<Post, string> {
  // posts: Post[],
  status: 'idle' | 'pending' | 'succeeded' | 'failed',
  error: string | null | undefined,
}

const postsAdapter = createEntityAdapter<Post>({
  sortComparer: (a,b) => b.date.localeCompare(a.date)
});

// const initialState: Post[] = [
const initialState: PostsState = postsAdapter.getInitialState({ 
  //getInitialState ->  {ids: [], enteties: {}}
  // posts: [],
  status: 'idle',
  error: null,
  // {
  //   id: '1',
  //   title: 'First Post!',
  //   content: 'Hello!',
  //   user: '0',
  //   date: sub(new Date(), { minutes: 10 }).toISOString(),
  //   reactions: initialReactions,
  // },
  // {
  //   id: '2',
  //   title: 'Second Post',
  //   content: 'More text',
  //   user: '2',
  //   date: sub(new Date(), { minutes: 5 }).toISOString(),
  //   reactions: initialReactions,
  // },
});

// createAsyncThunk accepts two arguments:
// A string that will be used as the prefix for the generated action types
// A "payload creator" callback function that should return a Promise containing some data, or a rejected Promise with an error
export const fetchPosts = createAppAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get<Post[]>('fakeApi/posts');  
  return response.data
},  {
  // createAsyncThunk accepts an optional condition callback we can use to do that check. If provided, it runs at the start of the thunk call, and it will cancel the entire thunk if condition returns false.
  condition(arg, thunkApi) {
    const postsStatus = selectPostsStatus(thunkApi.getState())
    if (postsStatus !== 'idle') {
      return false
    }
  }
});

export const addNewPost = createAppAsyncThunk('posts/addNewPost', async (initialPost: NewPost) => {
  const response = await client.post<Post>('fakeApi/posts',  initialPost)
  return response.data  
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // postAdded(state, action: PayloadAction<Post>) { // createSlice will automatically generate an "action creator" function with the same name
    //     state.push(action.payload);
    // },

    // commenting postAdded to replace with thunk in exta reducers
    // postAddedOld: {
    //   reducer(state, action: PayloadAction<Post>) {
    //     state.posts.push(action.payload)
    //   },
      // createSlice lets us define a "prepare callback" function when we write a reducer. The "prepare callback" function can take multiple arguments, generate random values like unique IDs, and run whatever other synchronous logic is needed to decide what values go into the action object. It should then return an object with the payload field inside.
    //   prepare(title: string, content: string, userId: string) {
    //     return {
    //       payload: {
    //         id: nanoid(),
    //         title,
    //         content,
    //         user: userId,
    //         date: new Date().toISOString(),
    //         reactions: { ...initialReactions } 
    //       },
    //     }
    //   },
    // },
    postUpdated(state, action: PayloadAction<Post>) {
      const { id, title, content } = action.payload;
      postsAdapter.updateOne(state, { id, changes: { title, content }});
      // const existingPost = state.entities[id];
      // const existingPost = state.posts.find((post) => post.id === id)
      // if (existingPost) {
      //   existingPost.title = title
      //   existingPost.content = content
      // }
    },
    reactionAdded(
      state,
      action: PayloadAction<{
        postId: string
        reaction: ReactionName
      }>,
    ) {
      const { postId, reaction } = action.payload;
      const existingPost = state.entities[postId]
      // const existingPost = state.posts.find((post) => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },
  },
  extraReducers: (builder) => { // to respond to actions that were defined outside of the slice.
    builder.addCase(logout.fulfilled, (state) => {
      return initialState;
    // we need to listen for the "pending" and "fulfilled" action types dispatched by our fetchPosts thunk. Those action creators are attached to our actual fetchPost function, and we can pass those to extraReducers to listen for those actions:
    }).addCase(fetchPosts.pending, (state) => {
      state.status = 'pending';
    }).addCase(fetchPosts.fulfilled, (state, action) => {
      state.status = 'succeeded';
      postsAdapter.setAll(state, action.payload) // add posts to state
      // state.posts = state.posts.concat(action.payload);
    }).addCase(fetchPosts.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    // }).addCase(addNewPost.fulfilled, (state, action) => {
    //   state.posts.push(action.payload);
    // });
    }).addCase(addNewPost.fulfilled, postsAdapter.addOne)
  },
  selectors: {
    selectAllPosts: (postsState) => postsState,
  },
})

// Export the auto-generated action creator with the same name
export const { /*postAdded,*/ postUpdated, reactionAdded } = postsSlice.actions

export default postsSlice.reducer

// SELECTORS - to replace repeating logic in other components connecting to store
// export const selectAllPosts = (state: RootState) => state.posts;

// export const selectAllPosts = (state: RootState) => state.posts.posts
// export const selectPostById = (state: RootState, postId: string) =>
  // state.posts.posts.find(post => post.id === postId);

// Export the customized selectors for this adapter using `getSelectors`
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds
  // Pass in a selector that returns the posts slice of state
} = postsAdapter.getSelectors((state: RootState) => state.posts)

export const selectPostsStatus = (state: RootState) => state.posts.status
export const selectPostsError = (state: RootState) => state.posts.error
// export const selectPostsByUser = (state: RootState, userId: string) => {
//   const allPosts = selectAllPosts(state);

  // !!! We know that useSelector will re-run every time an action is dispatched, and that it forces the component to re-render if we return a new reference value.
  //Unfortunately, this means that useSelector always returns a new array reference for this selector, and so our component will re-render after every action even if the posts data hasn't changed!.

  // return allPosts.filter(post => post.user === userId);
// }

// createSelector function that generates memoized selectors that will only recalculate results when the inputs change.
export const selectPostsByUser = createSelector(
  // Pass in one or more "input selectors"
  [
    // we can pass in an existing selector function that
    // reads something from the root `state` and returns it
    selectAllPosts,
    // and another function that extracts one of the arguments
    // and passes that onward
    (state: RootState, userId: string) => userId
  ],
  // the output function gets those values as its arguments,
  // and will run when either input value changes
  (posts, userId) => posts.filter(post => post.user === userId)
);

export const addPostsListeners = (startAppListening: AppStartListening) => {
  startAppListening({
    actionCreator: addNewPost.fulfilled,
    effect: async (action, listenerApi) => {
      const { toast } = await import('react-tiny-toast')

      const toastId = toast.show('New post added!', {
        variant: 'success',
        position: 'bottom-right',
        pause: true
      })

      await listenerApi.delay(5000)
      toast.remove(toastId)
    }
  })
}