import React, { useState } from 'react';
import { nanoid } from '@reduxjs/toolkit'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { type Post, /* postAdded */ } from './postsSlice';
import { selectCurrentUser } from '@/features/users/usersSlice'
import { selectCurrentUsername } from '../auth/authSlice';
import { addNewPost } from './postsSlice';
import { PostAuthor } from './PostAuthor';

// TS types for the input fields
// See: https://epicreact.dev/how-to-type-a-react-form-on-submit-handler/
interface AddPostFormFields extends HTMLFormControlsCollection {
  postTitle: HTMLInputElement
  postContent: HTMLTextAreaElement,
  // postAuthor: HTMLSelectElement
}
interface AddPostFormElements extends HTMLFormElement {
  readonly elements: AddPostFormFields
}

export const AddPostForm = () => {
  const [addRequestStatus, setAddRequestStatus] = useState<'idle' | 'pending'>(
    'idle'
  );

  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectCurrentUsername)!


  const handleSubmit = async (e: React.FormEvent<AddPostFormElements>) => {
    // Prevent server submission
    e.preventDefault()

    const { elements } = e.currentTarget
    const title = elements.postTitle.value
    const content = elements.postContent.value
    const userId = useAppSelector(selectCurrentUsername)! // elements.postAuthor.value

    // Create the post object and dispatch the `postAdded` action
    // const newPost: Post = {
    //   id: nanoid(),
    //   title,
    //   content
    // }

    const form = e.currentTarget;

    try {
      setAddRequestStatus('pending');
      // Redux Toolkit adds a .unwrap() function to the returned Promise, which will return a new Promise that either has the actual action.payload value from a fulfilled action
      await dispatch(addNewPost({ title, content, user: userId  })).unwrap()
      // form.reset();
      e.currentTarget.reset();
    } catch (err) {
      console.error('Failed to save the post: ', err)
    } finally {
      setAddRequestStatus('idle')
    }

    // dispatch(postAdded(title, content, user.id)); // not newPost because id is added in reducer

  }

  // const usersOptions = users.map(user => (
  //   <option key={user.id} value={user.id}>
  //     {user.name}
  //   </option>
  // ));

  return (
    <section>
      <h2>Add a New Post</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Post Title:</label>
        <input type="text" id="postTitle" defaultValue="" required />
        <label htmlFor="postAuthor">Author:</label>
        <input type="text" id="postAuthor" defaultValue={userId} disabled />
        {/* <select id="postAuthor" name="postAuthor" required>
          <option value=""></option>
          {usersOptions}
        </select> */}
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          defaultValue=""
          required
        />
        <button>Save Post</button>
      </form>
    </section>
  )
}