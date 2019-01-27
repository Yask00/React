// REDUCER
const counter = (state =0, action) => {
    switch (action.type) {
        case 'INCREMENT': return state + 1;
        case 'DECREMENT': return state - 1;
        default: return state;
    }
}

// const { createStore } = Redux;
const createStore = (reducer) => {
    let state;
    let listeners;

    const getState = () => state;

    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
    };

    const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter(l => l !== listener);
        }
    };

    dispatch({}); // initial stated populated with value

    return { getState, dispatch, subscribe };
};


const store = createStore(counter); // store + reducer

const render = () => {
    document.body.innerText = store.getState();
};

store.subscribe(render);
render(); // to render the initial 0

document.addEventListener('click', () => {
    // action dispatching OBJECT to STORE
    // then STORE has REDUCER to handle
    store.dispatch({ type: 'INCREMENT'})
});