import React, { Component } from 'react';
import { Link } from 'react-router-dom'; // newly added
import {addQuote} from '../actions/actions';
import { connect } from 'react-redux';

class Menu extends Component {
    constructor () {
        super();
        this.state = {
            quote: '',
            author: ''
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
        // e.preventDefault();
    }

    onSubmit (e) {
        e.preventDefault();

        const quote = {
            quote: this.state.quote,
            author: this.state.author
        }

        // Call action
        this.props.addQuote(quote);
        this.setState({
            quote: '',
            author: ''
        });
    }

    render() {
        const authors = this.props.authors.map(author => (
            <div className="header--item" key={author.id}>
                <Link to={`/${author.name.slice(0, 4)}`}>
                    <h3 className={author.name.slice(0, 4)}>{author.name}</h3>
                </Link>
            </div>
        ));

        return (
            <div>
                <div className="header">
                    <div className="header--item" key="0">
                        <Link to="/">
                            <h3>HOME</h3>
                        </Link>
                    </div>
                    {authors}
                </div >
                <div className="add-new">
                    <h2>Add new quote</h2>
                    <form onSubmit={this.onSubmit}>
                        <label>Quote:&nbsp;&nbsp;&nbsp;</label>
                        <input 
                            type="text"
                            name="quote" 
                            value={this.state.quote} 
                            onChange={this.onChange}
                        />
                        &nbsp;&nbsp;&nbsp;
                        <label>Author:&nbsp;&nbsp;&nbsp;</label>
                        <input 
                            type="text"
                            name="author" 
                            value={this.state.author} 
                            onChange={this.onChange}
                         />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>

        );
    }
}

export default connect(null, { addQuote })(Menu);