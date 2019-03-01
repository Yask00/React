import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index'

class Checkout extends Component {

    checkoutCanceledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render () {
        let summary = <Redirect to="/" />
        if(this.props.ings) {
            const purchasedRedirect = this.props.purchased ?
                <Redirect to="/" /> :
                null;

            summary = 
                <div>
                { purchasedRedirect }
                <CheckoutSummary 
                    checkoutCanceled={this.checkoutCanceledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                    ingredients={this.props.ings} />
                <Route 
                        path={this.props.match.path + '/contact-data'} 
                        // component={ContactData} />
                        // render={(props) => <ContactData {...props} ingredients={this.props.ings} price={this.props.price} />} />
                        component={ContactData} />
                </div>
        }
        return (
            summary
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    };
}

// const mapDispatchToProps = dispatch => {
//     return {
//         onInitPurchase: () => dispatch(actions.purchaseInit())
//     }
// }

export default connect(mapStateToProps)(Checkout);