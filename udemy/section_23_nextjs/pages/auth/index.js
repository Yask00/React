import React from 'react';
import User from '../../components/User';

const authIndexPage = (props) => (
    <div>
        <h1>The authIndexPage page - {props.appName}</h1>
        <User name="Y" age={1} />
    </div>
);

authIndexPage.getInitialProps = (context) => {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                appName: `super app(AUTH)`
            });
        }, 1000);
    });

    return promise;
};

export default authIndexPage;