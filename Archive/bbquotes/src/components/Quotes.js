import React, { Component } from 'react';

class Quotes extends Component {
    render() {
        const quotes = this.props.quotes.map(quote => (
            <div 
                key={quote.quote} 
                className="single--quote" 
            >
                    {`"${quote.quote}"`}
            <div className="single-quote-author">-{quote.author}</div>
            </div>
        ));

        return (
            <div className="quotes-container">
                <div className="quotes">
                    {quotes}
                </div >
                {this.props.isLoadingMore === 'true' &&
                    <div className="load-more" onClick={this.props.fetchMore}>
                        Load All...
                </div>
                }
            </div>
        );
    }
}

export default Quotes;