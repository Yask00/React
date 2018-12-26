import React, { Component } from 'react';
import './App.css';
import UserInput from './Components/UserInput';
import UserOutput from './Components/UserOutput';
import './Components/UserInput.css';
import './Components/UserOutput.css';

class App extends Component {
  state = {
    name: "Yasen"
  }

  changeUserHandler = (event) => {
    this.setState({
      name: event.target.value
    })
  }

  render() {
    return (
      <div className="App">
        <UserInput 
        change={ this.changeUserHandler } 
        currentName={ this.state.name }/>
        <UserOutput name={this.state.name} text1="UseroutputText 1.1" text2="UseroutputText 1.2" />
      </div>
    );
  }
}

export default App;
