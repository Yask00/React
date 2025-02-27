import React, { Component } from 'react';
import './App.css';

import Posts from './components/Posts';
import PostForm from './components/Postform';

import { Provider } from 'react-redux'; // react component glue for react and redux
import store from './store';

class App extends Component {

  render() {
    return (
      <Provider store={store}> 
        {/* store holds the whole state tree of the app */}
        {/* The way to change it is to dispatch an action on it */}
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <PostForm />
        <hr />
        <Posts />
      </div>
      </Provider>
    );
  }
}

export default App;
