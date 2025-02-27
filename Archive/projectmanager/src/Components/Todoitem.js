import React, { Component } from 'react';


class TodoItem extends Component {

    render() {
        return (
            <li className="Todo">
                <strong>{ this.props.todo.title }</strong>
            </li>
        );
    }
}

TodoItem.propTypes = {
    // project: React.PropTypes.object,
    // onDelete: React.PropTypes.func
}

export default TodoItem;
