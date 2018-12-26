import React from 'react';

const Char = (props) => {
    return (
        <div onClick={props.click} className="char">
            {props.charSymbol}
        </div>
    );
}

export default Char;