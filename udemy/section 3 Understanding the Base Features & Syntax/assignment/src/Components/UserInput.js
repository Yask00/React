import React from 'react';

const userInput = (props) => {
    return (
        <div className="user-input">
            <input 
                onChange={props.change} 
                value={props.currentName} 
                type="text" />
            <br /><br />
        </div>
    );
}

export default userInput;