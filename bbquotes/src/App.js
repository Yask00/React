import React, { Component } from 'react';
import './App.css';
import { Route, BrowserRouter as Router, } from 'react-router-dom';
import Main from './components/Main';
import WW from './components/WW';
import SG from './components/SG';
import JP from './components/JP';
import Menu from './components/Menu';
import { Provider } from 'react-redux'; // react component glue for react and redux

import store from './store';

const authors = [
  { name: 'Saul Goodman', id: 1 },
  { name: 'Walter White', id: 2 },
  { name: 'Jesse Pinkman', id: 3 }
];

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Menu authors={authors} />
            <Route path='/' exact component={Main} />
            <Route path='/Walt' component={WW} />
            <Route path='/Saul' component={SG} />
            <Route path='/Jess' component={JP} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
