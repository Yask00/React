import React from 'react';

const Validation = (props) => {
    const output = props.input.length >= 5 ? "Text long enough" : "Text too short";
    return (
        <div>
            { output }
        </div>
    );
}

export default Validation;