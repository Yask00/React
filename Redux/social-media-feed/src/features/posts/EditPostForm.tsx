import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '@/app/hooks'
import { postUpdated, selectPostById } from './postsSlice'

interface EditPostFormElements extends HTMLFormControlsCollection {
  postTitle: HTMLInputElement;
  postContent: HTMLTextAreaElement;
}

export const EditPostForm = () => {
    const { postId } = useParams();

    // const post = useAppSelector(// conecting to the store
    //   state => state.posts.find((post) => post.id === postId),
    // );
    const post = useAppSelector(state => selectPostById(state, postId!))


    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    if (!post) {
      return (
        <section>
          <h2>Post not found!</h2>
        </section>
      )
    }
    
    const onSavePostClick = (e: React.FormEvent<HTMLFormElement>) => { // 
        e.preventDefault()

        const { elements } = e.currentTarget;
        console.log(elements);
        const { postTitle, postContent } = elements as EditPostFormElements;
        if (postTitle && postContent) {
          dispatch(postUpdated({
            id: post.id, title: postTitle.value, content: postContent.value,
            user: post.user, date: post.date, reactions: post.reactions
          }))
          navigate(`/posts/${postId}`)
        }
    }

    return (
        <section>
          <h2>Edit Post</h2>
          <form onSubmit={onSavePostClick}>
            <label htmlFor="postTitle">Post Title:</label>
            <input
              type="text"
              id="postTitle"
              name="postTitle"
              defaultValue={post.title}
              required
            />
            <label htmlFor="postContent">Content:</label>
            <textarea
              id="postContent"
              name="postContent"
              defaultValue={post.content}
              required
            />
    
            <button>Save Post</button>
          </form>
        </section>
      );
}