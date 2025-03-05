import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks'; // '@/app/hooks'
import { selectPostById } from './postsSlice';
import { PostAuthor } from './PostAuthor';
import { TimeAgo } from './TimeAgo';
import { ReactionButtons } from './ReactionButtons';
import { selectCurrentUsername } from '@/features/auth/authSlice';
import { useGetPostQuery } from '@/features/api/apiSlice';
import { Spinner } from '@/components/Spinner';

export const SinglePostPage = () => {
  const { postId } = useParams()
  const currentUsername = useAppSelector(selectCurrentUsername)!

  // const post = useAppSelector(state =>
  //   state.posts.find(post => post.id === postId)
  // );
  // const post = useAppSelector((state) => selectPostById(state, postId!))
  const { data: post, isFetching, isSuccess } = useGetPostQuery(postId!)

  // if (!post) {
  //   return (
  //     <section>
  //       <h2>Post not found!</h2>
  //     </section>
  //   )
  // }

  const canEdit = post && currentUsername === post.user
  let content: React.ReactNode

  if (isFetching) {
    content = <Spinner text="Loading..." />
  } else if (isSuccess) {
    content = (
      <article className="post">
        <h2>{post.title}</h2>
        <div>
          <PostAuthor userId={post.user} />
          <TimeAgo timestamp={post.date} />
        </div>
        <p className="post-content">{post.content}</p>
        <ReactionButtons post={post} />
        {canEdit && (
          <Link to={`/editPost/${post.id}`} className="button">
            Edit Post
          </Link>
        )}
      </article>
    )
  }
  return <section>{content}</section>

}
