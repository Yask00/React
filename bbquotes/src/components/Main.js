import React, { Component } from 'react';
import Quotes from './Quotes';
import { connect } from 'react-redux';
import { fetchQuotes, fetchAll } from '../actions/actions'

class Main extends Component {

    componentWillMount = () => {
        this.props.fetchQuotes();
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.newQuote) {
            this.props.quotes.unshift(nextProps.newQuote);
        }
    }

    render() {
        return (
            <div>
                <div className="page-name">HOME PAGE</div>
                <Quotes 
                    quotes={this.props.quotes} 
                    isLoadingMore="true" 
                    fetchMore={this.props.fetchAll} 
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    quotes: state.reducer.quotes,
    newQuote: state.reducer.newQuote
});

export default connect(mapStateToProps, {fetchQuotes, fetchAll} )(Main);