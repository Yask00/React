import React from 'react';

const userOutput = (props) => {
    return (
        <div className="user-output">
            <span>{ props.name }</span>
            <p>{ props.text1 }</p>
            <p>{ props.text2 }</p>
        </div>
    );
}

export default userOutput;