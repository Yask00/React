import React from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.css';

const layout = (props) => (
    <Aux>
        <div>Toolbar, SideDrawler, Backfrop</div>
        <main className={classes.Content}>
            {/* The component we wraped with this layout */}
            {props.children}
        </main>
    </Aux>

);

export default layout;