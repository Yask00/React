import React, { Component } from 'react';
import './App.css';
import Validation from './Components/Validation';
import Char from './Components/Char';
import './Components/Char.css';

class App extends Component {
  state = {
    inputValue: ''
  }

  changeInputHandler = (event) => {
    this.setState({
      inputValue: event.target.value
    })
  }

  deleteCharHandler = (i) => {
    const text = this.state.inputValue.split('');
    text.splice(i, 1);
    const updatedText = text.join('');

    this.setState({
      inputValue: updatedText
    });
  }

  render() {
    let inputChars;
  
    this.state.inputValue.length > 0 ? 
    // here was trricky mapping string as array
    inputChars = this.state.inputValue.split('').map((x, i) => {
      return <Char charSymbol={x} key={i} click={() => this.deleteCharHandler(i)} />
    }) : 
    inputChars = []
    
    return (
      <div className="App">
        <ol>
          <li>Create an input field (in App component) with a change listener which outputs the length of the entered text below it (e.g. in a paragraph).</li>
          <li>Create a new component (=> ValidationComponent) which receives the text length as a prop</li>
          <li>Inside the ValidationComponent, either output "Text too short" or "Text long enough" depending on the text length (e.g. take 5 as a minimum length)</li>
          <li>Create another component (=> CharComponent) and style it as an inline box (=> display: inline-block, padding: 16px, text-align: center, margin: 16px, border: 1px solid black).</li>
          <li>Render a list of CharComponents where each CharComponent receives a different letter of the entered text (in the initial input field) as a prop.</li>
          <li>When you click a CharComponent, it should be removed from the entered text.</li>
        </ol>
        <p>Hint: Keep in mind that JavaScript strings are basically arrays!</p>

        <input typ="text" onChange={ this.changeInputHandler } value={this.state.inputValue} />

        <Validation input={ this.state.inputValue } />
        {
          inputChars
        }
      </div>
    );
  }
}

export default App;
