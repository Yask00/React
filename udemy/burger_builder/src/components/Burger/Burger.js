import React from 'react'
import { withRouter } from 'react-router-dom';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngridient/BurgerIngridient';

const burger = (props) => {
    // object to array
    let transformedIngredients =
        Object.keys(props.ingredients) // only names salad, bacon...
            .map(igKey => {
                return [...Array(props.ingredients[igKey])] // ..Array(1, 1, 2, 2)
                    .map((_, i) => {
                        return <BurgerIngredient key={igKey + i} type={igKey} />
                    });
            })
            .reduce((arr, el) => { // prev and current value
                return arr.concat(el);
            }, []);

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients</p>
    }

    return (
        // multiple ingredient components
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default withRouter(burger);
