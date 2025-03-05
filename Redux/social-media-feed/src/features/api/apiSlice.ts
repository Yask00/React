// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Use the `Post` type we've already defined in `postsSlice`,
// and then re-export it for ease of use
import type { Post, NewPost } from '@/features/posts/postsSlice';
export type { Post, NewPost };

// Define our single API slice object
//Your application is expected to have only one createApi call in it.
export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: 'api', //  all your RTKQ cache data will be stored under state.api
  // All of our requests will have URLs starting with '/fakeApi'
  //  fetchBaseQuery wrapper around the standard fetch()
  baseQuery: fetchBaseQuery({ baseUrl: '/fakeApi' }),
  tagTypes: ['Post'],
  // The "endpoints" represent operations and requests for this server
  endpoints: builder => ({
    // The `getPosts` endpoint is a "query" operation that returns data.
    // The return value is a `Post[]` array, and it takes no arguments.
    getPosts: builder.query<Post[], void>({ // <ReturnType, ArgumentType>
      // The URL for the request is '/fakeApi/posts'
      query: () => '/posts',
      providesTags: ['Post']
    }),
    getPost: builder.query<Post, string>({
        query: postId => `/posts/${postId}`
      }),
    addNewPost: builder.mutation<Post, NewPost>({
        query: initialPost => ({
          // The HTTP URL will be '/fakeApi/posts'
          url: '/posts',
          // This is an HTTP POST request, sending an update
          method: 'POST',
          // Include the entire post object as the body of the request
          body: initialPost
        }),
        invalidatesTags: ['Post']
      })
  }),
  
});

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useGetPostsQuery, useGetPostQuery, useAddNewPostMutation } = apiSlice
 // The hooks are automatically named based on a standard convention:

