import { FETCH_POSTS, NEW_POST } from './types';

export const fetchPosts = () => dispatch => {
    //thunk middleware allows us to call dispatch function directly

    // where we want to create out fetch
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res => res.json())
        // we want to dispatch data to the reducer
        .then(posts =>
            dispatch({
                type: FETCH_POSTS,
                payload: posts
            }));
}

export const createPost = (postData) => dispatch => {
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(postData)
    }).then((res) => res.json())
        .then(post =>
            dispatch({ // dispatch to the reducer new post
                type: NEW_POST,
                payload: post
            }));
}