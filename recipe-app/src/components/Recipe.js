import React from 'react';
import { Link, BrowserRouter, Switch, Route } from 'react-router-dom';

const API_KEY = 'b5c7cb9cdddbe6cf426544425b52ba9d';

class Recipe extends React.Component {
    state = {
        activeRecipe: []
    }

    componentDidMount = async () => {
        const title = this.props.location.state.recipe;
        const req = await fetch(`https://cors-anywhere.herokuapp.com/http://food2fork.com/api/search?key=${API_KEY}&q=${title}`);

        const res = await req.json();
        this.setState({
            activeRecipe: res.recipes[0]
        })
    }

    render() {

        console.log(this.props);
        const recipe = this.state.activeRecipe;
        return (
            <div className="container">
                {
                    this.state.activeRecipe.length !== 0 &&
                    <div className="active-recipe">
                        <img className="active-recipe__img" src={recipe.image_url} />
                        <h3 className="active-recipe__title">{recipe.title}</h3>
                        <h4 className="active-recipe__publisher"> {}
                            Publisher: <span>{recipe.publisher}</span>
                        </h4>
                        <p className="active-recipe__website" >
                            Website: <span className=""><a href={recipe.publisher_url}>{recipe.publisher_url}</a></span>
                        </p>
                        <button className="active-recipe__button">
                            <Link to="/">Go Home</Link>
                        </button>
                    </div>
                }
            </div>
        );
    }
}

export default Recipe;