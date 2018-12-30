import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'; // added for routnig
import './index.css';
import App from './App';
import PPP from './PPP';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Router>
         <PPP />
         {/* <App /> */}
    </Router>,
    document.getElementById('root'));
registerServiceWorker();
