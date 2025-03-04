import React, { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/app/hooks' // pre-typed useAppSelector hook that we added in src/app/hooks.ts, since that has the right RootState type already included.
import { Link } from 'react-router-dom'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { ReactionButtons } from './ReactionButtons'
import { fetchPosts, selectAllPosts, selectPostsStatus, selectPostsError, Post } from './postsSlice'
import { Spinner } from '@/components/Spinner'

interface PostExcerptProps {
  post: Post
}

let PostExcerpt = ({ post }: PostExcerptProps) => {
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
}
// NOT WORKING
// PostExcerpt = React.memo(PostExcerpt)

export const PostsList = () => {
  const dispatch = useAppDispatch()
  // Select the `state.posts` value from the store into the component
  // const posts = useAppSelector(state => state.posts);
  const posts = useAppSelector(selectAllPosts)
  const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
  const postsStatus = useAppSelector(selectPostsStatus)
  const postsError = useAppSelector(selectPostsError)

  useEffect(() => {
    if (postsStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postsStatus, dispatch])

  let content: React.ReactNode

  if (postsStatus === 'pending') {
    content = <Spinner text="Loading..." />
  } else if (postsStatus === 'succeeded') {
    // Sort posts in reverse chronological order by datetime string
    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

    content = orderedPosts.map((post) => <PostExcerpt key={post.id} post={post} />)
  } else if (postsStatus === 'failed') {
    content = <div>{postsError}</div>
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}
