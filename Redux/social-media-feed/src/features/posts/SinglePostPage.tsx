import { Link, useParams } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks' // '@/app/hooks'
import { selectPostById } from './postsSlice'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { ReactionButtons } from './ReactionButtons'
import { selectCurrentUsername } from '@/features/auth/authSlice'

export const SinglePostPage = () => {
  const { postId } = useParams()
  const currentUsername = useAppSelector(selectCurrentUsername)!

  // const post = useAppSelector(state =>
  //   state.posts.find(post => post.id === postId)
  // );
  const post = useAppSelector((state) => selectPostById(state, postId!))

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  const canEdit = currentUsername === post.user

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <p className="post-content">{post.content}</p>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
        <br />
        <ReactionButtons post={post} />
        {canEdit && (
          <Link to={`/editPost/${post.id}`} className="button">
            Edit Post
          </Link>
        )}
      </article>
    </section>
  )
}
