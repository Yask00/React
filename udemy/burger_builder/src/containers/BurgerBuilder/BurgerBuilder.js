import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal.js';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
// small letter because not used in JSX
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axios from '../../axios-orders';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
    state = {
        // ingredients: null, // redux case
        // totalPrice: 4, // redux case
        // purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount () {
        // axios.get('https://burger-builder-77c13.firebaseio.com/ingredients.json')
        // .then(response => {
        //     this.setState({
        //         ingredients: response.data
        //     });
        // })
        // .catch(error => {
        //     this.setState({ error: true })
        // })
    }

    updatePerchaseState(ingredients) {
        // was copying the old state
        // const ingredients = {
        //     ...this.state.ingredients
        // }
        const sum = Object.keys(ingredients).map(
            igKey => {
                return ingredients[igKey]; // igKEy is salad, bacon...
            }
        ).reduce((sum, el) => {
            return sum + el; // el is the number
        }, 0);
        // this.setState({
        //     purchasable: sum > 0
        // });
 
        return sum > 0;

    }

    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     let updatedIngredients = { // deep copy of the state === immutability
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = priceAddition + oldPrice;

    //     this.setState({
    //         totalPrice: newPrice,
    //         ingredients: updatedIngredients
    //     });
    //     this.updatePerchaseState(updatedIngredients);
    // }

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     if (oldCount <= 0) {
    //         return;
    //     }
    //     const updatedCount = oldCount - 1;
    //     let updatedIngredients = { // deep copy of the state === immutability
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceDeduction = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceDeduction;

    //     this.setState({
    //         totalPrice: newPrice,
    //         ingredients: updatedIngredients
    //     });
    //     this.updatePerchaseState(updatedIngredients);
    // }

    purchaseHandler() {
        this.setState({
            purchasing: true
        })
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredient cant be loaded</p> : <Spinner />;

        if(this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ordered={this.purchaseHandler.bind(this)}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        ingredientAdded={this.props.onIngredientAdded}
                        disabled={disabledInfo}
                        purchasable={this.updatePerchaseState(this.props.ings)}
                        price={this.props.price}
                    />
                </Aux>);
                orderSummary = <OrderSummary
                price={this.props.price}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                ingredients={this.props.ings} />;
        }

        if(this.state.loading){
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal modalClosed={this.purchaseCancelHandler} show={this.state.purchasing}>
                    { orderSummary }
                </Modal>
                { burger }
            </Aux>
        );
    }
}

const mapStateToProps =state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));