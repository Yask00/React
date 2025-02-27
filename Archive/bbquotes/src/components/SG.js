import React, { Component } from 'react';
import Quotes from './Quotes';
import { connect } from 'react-redux'; // connects you components to your redux store
import { fetchSG } from '../actions/actions'

class SG extends Component {

    componentDidMount = () => {
        this.props.fetchSG();
    }

    render() {
        return (
            <div>
                <div className="page-name">Saul Goodman PAGE</div>
                <Quotes quotes={this.props.quotes} isLoadingMore="false" />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    quotes: state.reducer.quotes,
});

export default connect(mapStateToProps, {fetchSG} )(SG);