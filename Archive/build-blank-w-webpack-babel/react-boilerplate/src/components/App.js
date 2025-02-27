import React, { Component } from 'react';
import '../styles/App.css';
import SubComp1 from './SubComp1';
import SubComp2 from './SubComp2';

class App extends Component {
    render() {
        return (
            <div>
                <h1>My react app</h1>
                <SubComp1 />
                <SubComp2 />
            </div>
        );
    }
}

export default App;