import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';

class indexPage extends Component {

    static getInitialProps(context) {
        console.log(context);
        //executes only on the server, if you type url it wont log anything
        // you should go there by clickng a lnik
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    appName: `super app`
                });
            }, 1000);
        });

        return promise;
    }

    render() {
        return (
            <div>
                <h1>The main page of {this.props.appName}</h1>
                <p>Go to {" "}<Link href="/auth"><a>Auth</a></Link></p>
                <button onClick={() => Router.push('/auth')}>Go to Auth</button>
                <style jsx>{`
            div {
                border: 1px solid #eee;
                box-shadow: 0 2px 3pc #ccc;
                padding: 20px;
                text-aligh: center;
            }
        `}</style>
            </div>
        );
    }
};

export default indexPage;