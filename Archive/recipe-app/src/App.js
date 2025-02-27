import React, { Component } from 'react';
import './App.css';
import Form from './components/Form'
import Recipes from './components/Recipes';

const API_KEY = 'b5c7cb9cdddbe6cf426544425b52ba9d';

class App extends Component {
  // in REACT 16+ you dont need constructor to set state ect in
  state = {
    recipes: []
  }

  getRecipe = async (e) => {
    const recipeName = e.target.elements.recipeName.value;
    e.preventDefault();
    const api_call = await fetch(`https://cors-anywhere.herokuapp.com/http://food2fork.com/api/search?key=${API_KEY}&q=${recipeName}&count=10`);

    const data = await api_call.json();
    this.setState({
      recipes: data.recipes
    });

    console.log(this.state.recipes);
  }

  componentDidMount = () => {
    const json = localStorage.getItem('recipes');
    const recipes = JSON.parse(json);
    this.setState({
      recipes: recipes
    });
  }

  componentDidUpdate = () => {
    const recipes = JSON.stringify(this.state.recipes);
    localStorage.setItem('recipes', recipes);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Recipe Search</h1>
        </header>
        <Form getRecipe={ this.getRecipe }/>
        <Recipes recipes={ this.state.recipes || [] }/>
      </div>
    );
  }
}

export default App;