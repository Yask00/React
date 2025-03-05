import React, { useEffect, useMemo } from 'react'
import { useAppSelector, useAppDispatch } from '@/app/hooks' // pre-typed useAppSelector hook that we added in src/app/hooks.ts, since that has the right RootState type already included.
import { Link } from 'react-router-dom'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { ReactionButtons } from './ReactionButtons'
import {
  fetchPosts,
  selectPostById,
  selectPostIds,
  selectPostsStatus,
  selectPostsError
} from './postsSlice'
import { Spinner } from '@/components/Spinner'
import { useSelector } from 'react-redux'
import { useGetPostsQuery, Post } from '@/features/api/apiSlice';
import classnames from 'classnames';

// interface PostExcerptProps {
//   postId: string
// }

interface PostExcerptProps {
  post: Post
}

const PostExcerpt = ({ post }: PostExcerptProps) => {
  // const post = useAppSelector(state => selectPostById(state, postId));

  return (
    <article className="post-excerpt" key={post.id}>
      <h3>
        <Link to={`/posts/${post.id}`}>{post.title}</Link>
      </h3>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <ReactionButtons post={post} />
    </article>
  )
};

// NOT WORKING
// PostExcerpt = React.memo(PostExcerpt)

export const PostsList = () => {
  // Calling the `useGetPostsQuery()` hook automatically fetches data!
  const {
    data: posts = [],
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
    refetch
  } = useGetPostsQuery()

  const sortedPosts = useMemo(() => {
    const sortedPosts = posts.slice()
    // Sort posts in descending chronological order
    sortedPosts.sort((a, b) => b.date.localeCompare(a.date))
    return sortedPosts
  }, [posts]);

  // const dispatch = useAppDispatch()
  // Select the `state.posts` value from the store into the component
  // const posts = useAppSelector(state => state.posts);
  // const posts = useAppSelector(selectAllPosts);
  // const orderedPostIds = useSelector(selectPostIds)
  // const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
  // const orderedPostIds = useSelector(selectPostIds);

  // const postsStatus = useAppSelector(selectPostsStatus)
  // const postsError = useAppSelector(selectPostsError)

  // useEffect(() => {
  //   if (postsStatus === 'idle') {
  //     dispatch(fetchPosts())
  //   }
  // }, [postsStatus, dispatch])

  let content: React.ReactNode

  // if (postsStatus === 'pending') {
  //   content = <Spinner text="Loading..." />
  // } else if (postsStatus === 'succeeded') {
  //   // Sort posts in reverse chronological order by datetime string
  //   // const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
  //   // content = orderedPosts.map((post) => <PostExcerpt key={post.id} post={post} />)

  //   content = orderedPostIds.map(postId => (
  //     <PostExcerpt key={postId} postId={postId} />
  //   ))
  // } else if (postsStatus === 'failed') {
  //   content = <div>{postsError}</div>
  // }

  // Show loading states based on the hook status flags
  if (isLoading) {
    content = <Spinner text="Loading..." />
  } else if (isSuccess) {
    const renderedPosts = sortedPosts.map(post => (
      <PostExcerpt key={post.id} post={post} />
    ))

    const containerClassname = classnames('posts-container', {
      disabled: isFetching
    })

    content = <div className={containerClassname}>{renderedPosts}</div>
    // content = sortedPosts.map(post => <PostExcerpt key={post.id} post={post} />)
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      <button onClick={refetch}>Refetch Posts</button>
      {content}
    </section>
  )
}
