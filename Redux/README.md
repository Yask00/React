* `npm install @reduxjs/toolkit` includes the `Redux core`
* Most likely, you'll also need the `react-redux` bindings for use with `React`
    ```js
    npm install react-redux
    ```
* !!!The recommended way to start new apps with React and Redux is by using our official `Redux+TS` template for `Vite`:
    ```js
    npx degit reduxjs/redux-templates/packages/vite-template-redux my-app
    ```
* In a typical Redux app, there is just a `single store` with a `single root reducer` function. As your app grows, you `split` the root reducer into `smaller reducers` independently operating on the different `parts` of the state tree. 
* The Redux `core` is a very small and deliberately unopinionated library. It provides a few small API primitives:
    * `createStore` to actually create a Redux store
    * `combineReducers` to combine multiple slice reducers into a single larger reducer
    * `applyMiddleware` to combine multiple middleware into a store enhancer
    * `compose` to combine multiple store enhancers into a single store enhancer
* `mutate` state in the process (always the #1 cause of Redux `bugs`!).
* `Redux Toolkit` starts with two key `APIs` that simplify the most common things you do in every Redux app:
    * `configureStore` sets up a well-configured Redux store with a single function call, including combining reducers, adding the thunk middleware, and setting up the Redux DevTools integration. It also is easier to configure than createStore, because it takes named options parameters.
        * The `slice reducers` were automatically passed to combineReducers()
        * The `redux-thunk` middleware was automatically added
        * `Dev-mode middleware` was added to catch accidental mutations
        * The `Redux DevTools` Extension was automatically set up
        * The middleware and DevTools enhancers were composed together and added to the store
    * `createSlice` lets you write reducers that use the Immer library to enable writing immutable updates using "mutating" JS syntax like state.value = 123, with no spreads needed. It also automatically generates `action creator functions` for each reducer, and generates `action type strings` internally based on your reducer's names. Finally, it works great with TypeScript. `createSlice` API that will help us simplify our Redux reducer logic and actions. 
        * We can write the case reducers as functions inside of an object, instead of having to write a switch/case statement
        * The reducers will be able to write shorter immutable update logic
        * All the action creators will be generated automatically based on the reducer functions we've provided
* Redux Toolkit's `createSlice` and `createReducer` APIs use `Immer` inside to allow us to write "`mutating`" update logic that becomes correct immutable updates.
* We can `read` data from the store with `useSelector`, and `dispatch` actions using `useDispatch`. `useSelector` automatically subscribes to the Redux store for us
* Put a React-Redux `<Provider>` component around your `<App />`: `<Provider store={store}>`
* Redux Toolkit is already written in `TypeScript`, so its `TS type definitions` are built in.
* Typical `ACTION`:
    ```js
    const addTodoAction = {
        type: 'todos/todoAdded',
        payload: 'Buy milk'
    }
    ```
* Typical `ACTION CREATOR`:
    ```js
    const addTodo = text => {
    return {
        type: 'todos/todoAdded',
        payload: text
    }
    }
    ```
* Typical `REDUCER` receives the current state and an action object, decides how to update the state if necessary, and returns the new state: (state, action) => newState:
    ```js
    const initialState = { value: 0 }

    function counterReducer(state = initialState, action) {
    // Check to see if the reducer cares about this action
    if (action.type === 'counter/increment') {
        // If so, make a copy of `state`
        return {
        ...state,
        // and update the copy with the new value
        value: state.value + 1
        }
    }
    // otherwise return the existing state unchanged
    return state
    }
    ```
    Reducers can use `any` kind of logic inside to decide what the new state should be: `if/else`, `switch`, `loops`, and so on.
* Typical `STORE` - The current Redux application state lives in an object called the store:
    ```jsx
    import { configureStore } from '@reduxjs/toolkit'

    const store = configureStore({ reducer: counterReducer })

    console.log(store.getState())
    // {value: 0}
    ```
* Typical `DISPATCH`. The only way to update the state is to call `store.dispatch()` and pass in an action object.
    ```js
    const increment = () => {
        return {
            type: 'counter/increment'
        }
    }
    store.dispatch(increment())

    console.log(store.getState())
    // {value: 1}
    ```
* Typical `SELECTORS` are functions that know how to extract specific pieces of information from a store state value:
    ```js
    const selectCounterValue = state => state.value

    const currentValue = selectCounterValue(store.getState())
    console.log(currentValue)
    // 2
    ```
* You can only write "`mutating`" logic in Redux Toolkit's `createSlice` and `createReducer` because they use `Immer` inside! If you write mutating logic in your code without Immer, it will mutate the state and cause bugs!
* Redux actions and state should only contain `plain` JS values like `objects`, `arrays`, and `primitives`. `Don't` put `class` instances, `functions`, `Date/Map/Set` instances, or other non-serializable values into Redux!.
* Dispatching `two` actions in a row is usually a sign that we need to `rethink` how we're defining our logic.
* many different `slice reducers` can all respond to the same `dispatched` action, and each slice can update its own state if needed!
* The `extraReducers` field is a function that receives a parameter named builder. The builder object has three methods attached, each of which lets the slice listen for other actions and do its own state updates:
    * `builder.addCase(actionCreator, caseReducer)`: listens for one specific action type
    * `builder.addMatcher(matcherFunction, caseReducer)`: listens for any one of multiple action types, using a Redux Toolkit "matcher" function for comparing action objects
    * `builder.addDefaultCase(caseReducer)`: adds a case reducer that runs if nothing else in this slice matched the action (equivalent to a default case inside of a switch).
* Redux Toolkit provides a `createAsyncThunk` API to implement the creation and dispatching of actions describing an async request.
    ```js
    import { createAsyncThunk } from '@reduxjs/toolkit'

    export const fetchItemById = createAsyncThunk(
        'items/fetchItemById',
        async (itemId: string) => {
            const item = await someHttpRequest(itemId)
            return item
        }
    );
    ```
    ```js
    const logAndAdd = (amount: number): AppThunk => {
    return (dispatch, getState) => {
        const stateBefore = getState()
        console.log(`Counter before: ${stateBefore.counter}`)
        dispatch(incrementByAmount(amount))
        const stateAfter = getState()
        console.log(`Counter after: ${stateAfter.counter}`)
    }
    }
    ```
* What we need is a way to look up a single item based on its ID, directly, without having to check all the other items. This process is known as "`normalization`"
    ```js
    {
    users: {
        ids: ["user1", "user2", "user3"],
        entities: {
        "user1": {id: "user1", firstName, lastName},
        "user2": {id: "user2", firstName, lastName},
        "user3": {id: "user3", firstName, lastName},
        }
    }
    }
    ```
    ```js
    const userId = 'user2'
    const userObject = state.users.entities[userId]
    ```
    Redux Toolkit's `createEntityAdapter` API provides a standardized way to store your data in a `slice` by taking a collection of items and putting them into the shape of `{ ids: [], entities: {} }`. Along with this predefined state shape, it generates a set of reducer functions and selectors that know how to work with that data.
* Redux Toolkit includes the `createListenerMiddleware` API to let us write logic that runs in `response` to specific `actions` being `dispatched`.
    * `listenerMiddleware.middleware`: the actual Redux middleware instance that needs to be added to the store
    * `listenerMiddleware.startListening`: adds a new listener entry to the middleware directly
    * `listenerMiddleware.addListener`: an action creator that can be dispatched to add a listener entry from anywhere in the codebase that has access to dispatch, even if you didn't import the listenerMiddleware object
* For Redux specifically, "`thunks`" are a pattern of writing functions with logic inside that can interact with a Redux store's dispatch and getState methods.A thunk function is a function that accepts two arguments: the Redux store dispatch method, and the Redux store getState method. Thunk functions are not directly called by application code. Instead, they are passed to store.dispatch():
    ```js
    const thunkFunction = (dispatch, getState) => {
    // logic here that can dispatch actions or read state
    }

    store.dispatch(thunkFunction)
    ```
    A thunk action creator is a function that may have some arguments, and `returns a new thunk function`. The thunk typically closes over any arguments passed to the action creator, so they can be used in the logic:
    ```js
    // fetchTodoById is the "thunk action creator"
    export function fetchTodoById(todoId) {
    // fetchTodoByIdThunk is the "thunk function"
        return async function fetchTodoByIdThunk(dispatch, getState) {
            const response = await client.get(`/fakeApi/todo/${todoId}`)
            dispatch(todosLoaded(response.todos))
        }
    }
    ```
    In either case, the thunk is dispatched by calling the action creator, in the same way as you'd dispatch any other Redux action:
    ```js
    dispatch(fetchTodoById(todoId))
    ```
* !!! Redux Toolkit's `RTK Query` data fetching API is a purpose built data fetching and caching solution for Redux apps, and can `eliminate` the need to write any `thunks` or `reducers` to manage `data fetching`. 
* Redux Toolkit does not currently provide any special APIs or syntax for writing `thunk` functions. In particular, they `cannot` be defined as part of a `createSlice()` call. You have to write them `separate` from the reducer logic, exactly the same as with plain Redux code. Thunks typically dispatch plain actions, such as `dispatch(dataLoaded(response.data))`. `createAsyncThunk` abstracts this pattern by generating the action types and action creators and generating a thunk that dispatches those actions.
* `createSelector` function that generates `memoized` `selectors` that will only recalculate results when the inputs change.
* `createSlice` lets us handle those situations by adding a "`prepare` callback" to the reducer. We can pass an object that has functions named reducer and prepare. When we call the generated action creator, the prepare function will be called with whatever parameters were passed in. It should then create and return an object that has a payload field (or, optionally, meta and error fields), matching the Flux Standard Action convention.