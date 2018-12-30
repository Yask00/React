import React, { Component } from 'react';
import Quotes from './Quotes';
import { connect } from 'react-redux'; // connects you components to your redux store
import { fetchJP } from '../actions/actions'

class JP extends Component {

    componentDidMount = () => {
        this.props.fetchJP();
    }

    render() {
        return (
            <div>
                <div className="page-name">Jesse Pinkman PAGE</div>
                <Quotes quotes={this.props.quotes} isLoadingMore="false" />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    quotes: state.reducer.quotes,
});

export default connect(mapStateToProps, {fetchJP} )(JP);