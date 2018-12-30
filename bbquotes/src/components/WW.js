import React, { Component } from 'react';
import Quotes from './Quotes';
import { connect } from 'react-redux'; // connects you components to your redux store
import { fetchWW } from '../actions/actions'


class WW extends Component {

    componentDidMount = () => {
        this.props.fetchWW();
    }

    render() {

        return (
            <div>
                <div className="page-name">Walter White PAGE</div>
                <Quotes quotes={this.props.quotes} isLoadingMore="false" />
            </div>
        )
    }
}
const mapStateToProps = state => ({
    quotes: state.reducer.quotes,
});

export default connect(mapStateToProps, {fetchWW} )(WW);