import React, { Component } from 'react'
import PropTypes from 'prop-types';

import { connect } from 'react-redux'; // connects you components to your redux store
// provided by Provider /
import { fetchPosts } from '../actions/postActions';

class Posts extends Component {
    componentWillMount () {
        this.props.fetchPosts();
        // get new items from state map state to props
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.newPost) {
            this.props.posts.unshift(nextProps.newPost);
        }
    }

    render() {
        const postItems = this.props.posts.map(post => (
            <div key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
            </div>
        ));
        return (
            <div>
                <h1>Posts</h1>
                {postItems}
            </div>
        )
    }
}

Posts.propTypes = {
    fetchPosts: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired,
    // newPost: PropTypes.func.isRequired
}

// mapStateToProps: called every time the store state changes. 
// It receives the entire store state, and should return an object
// full of data Each field in the returned object becomes a prop for the wrapped component.

const mapStateToProps = state => ({
    posts: state.posts.items, // posts as postReducer from index
    newPost: state.posts.item   // posts as postReducer from index 
});

// in order to connect our component to redux store
export default connect(mapStateToProps, { fetchPosts })(Posts);
// The connect function generates wrapper "container" components that subscribe to the store