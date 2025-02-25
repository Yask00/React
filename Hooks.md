* Hooks
    * `useActionState` is a Hook that allows you to update state based on the result of a form action.
        * In earlier React Canary versions, this API was part of React DOM and called useFormState.
        ```js
        const [state, formAction, isPending] = useActionState(fn, initialState, permalink?);
        ```
        ```js
        const [state, formAction] = useActionState(increment, 0);

        <button formAction={formAction}>Increment</button>
        ```
    * `useCallback` is a React Hook that lets you cache a function definition between re-renders. useCallback caches the `function` itself vs `useMemo` where result of fn iscached
        * If you’re writing a `custom` Hook, it’s recommended to wrap any functions that it returns into useCallback:
        ```js
        const cachedFn = useCallback(fn, dependencies)
        ```
        ```js
        const handleSubmit = useCallback((orderDetails) => {
            post('/product/' + productId + '/buy', {
                referrer,
                orderDetails,
            });
        }, [productId, referrer]);
        ```
    * `useContext` is a React Hook that lets you read and subscribe to context from your component.
        ```js
        const value = useContext(SomeContext)
        ```
    * `useDebugValue` is a React Hook that lets you add a label to a custom Hook in React DevTools.
    * `useDeferredValue` is a React Hook that lets you defer updating a part of the UI.
        * Showing `stale` content while fresh content is loading 
        * `Deferring` re-rendering for a part of the UI 
        ```js
        useDeferredValue(value, initialValue?)
        ```
    * `useEffect` is a React Hook that lets you synchronize a component with an external system.
        ```js
        useEffect(setup, dependencies?) 
        ```
        * setup: The function with your Effect’s logic. Your setup function may also optionally return a cleanup function. 
        * useEffect returns `undefined`.
        * Most of time useEffect() callbacks are run `after` paint but not always.
        * When `Strict` Mode is on, React will run one `extra` development-only `setup+cleanup` cycle before the first real setup.
        *  If your Effect is doing something `visual` (for example, positioning a tooltip), and the delay is noticeable (for example, it flickers), `replace` `useEffect` with `useLayoutEffect`. 
        * Wrapping Effects in custom Hooks-If you find yourself often needing to `manually` write Effects, it’s usually a sign that you need to `extract` some `custom` Hooks for common behaviors your components rely on.
        * state updater fixes dependencies that are set inside effect: `setCount(c => c + 1);` 
    * `useId` is a React Hook for generating unique IDs that can be passed to accessibility attributes.
        * useId should `not` be used to generate `keys` in a list. Keys should be generated from your data.
    * `useImperativeHandle` is a React Hook that lets you customize the handle exposed as a `ref`.
        ```js
        useImperativeHandle(ref, createHandle, dependencies?) 
        ```
        * `ref`: The ref you received as a prop to the MyInput component.
        * `createHandle`: A function that takes no arguments and returns the ref handle you want to expose. That ref handle can have any type. Usually, you will return an object with the methods you want to expose.
        ```js
        useImperativeHandle(ref, () => {
            return {
            focus() {
                inputRef.current.focus();
            },
            scrollIntoView() {
                inputRef.current.scrollIntoView();
            },
            };
        }, []);

        return <input ref={inputRef} />;
        ```
        * Now, if the parent component gets a `ref` to `MyInput`, it will be able to call the `focus` and `scrollIntoView` methods on it. However, it will `not` have full access to the underlying `<input>` DOM node.
    * `useInsertionEffect` allows inserting elements into the DOM before any layout Effects fire.
        ```js
            useInsertionEffect(setup, dependencies?)
        ```
        * useInsertionEffect is for `CSS-in-JS` library authors. Unless you are working on a CSS-in-JS library and need a place to inject the styles, you probably want useEffect or useLayoutEffect instead.
    * `useLayoutEffect` is a version of `useEffect` that fires `before` the browser `repaints` the screen.
        * useLayoutEffect can `hurt` performance. `Prefer` useEffect when possible.The code inside `useLayoutEffect` and all `state updates ` scheduled from it `block` the browser from repainting the screen.
        * Call useLayoutEffect to perform the layout measurements before the browser repaints the screen:
        ```js
        useLayoutEffect(() => {
            const { height } = ref.current.getBoundingClientRect();
            setTooltipHeight(height);
        }, []);
        ```
    * `useMemo` is a React Hook that lets you `cache` the result of a calculation between re-renders.
        ```js
        const cachedValue = useMemo(calculateValue, dependencies)
        ```
        * `calculateValue`: The function should be `pure`, should take no `arguments`, and should `return` a value of any type. 
        * The difference is that: `useEffect` runs `after` a render happens, while `useMemo` runs `before`.
    * `useOptimistic` is a React Hook that lets you optimistically `update` the UI.
        * useOptimistic is a React Hook that lets you show a `different state` while an `async` action is underway. 
        ````js
        const [optimisticState, addOptimistic] = useOptimistic(state, updateFn);
        ````
    * `useReducer` is a React Hook that lets you add a reducer to your component.
        * The `dispatch` function only updates the state variable for the `next` render. If you read the state variable after calling the dispatch function, you will still get the `old` value that was on the screen before your call.
        ```js
        const [state, dispatch] = useReducer(reducer, { age: 42 });
        ```
    * `useRef` is a React Hook that lets you `reference` a value that’s not needed for rendering.
        * useRef returns an object with a single property `current`
        * `Changing` a ref does not trigger a `re-render`. This means refs are perfect for storing information that doesn’t affect the visual output of your component. 
        * Do not `write` or `read` ref.current during `rendering`.
        * It’s particularly common to use a ref to manipulate the `DOM`
    * `useState` is a React Hook that lets you add a state variable to your component.
        * The `set` function only updates the state variable for the `next` render. If you read the state variable after calling the set function, you will still get the old value that was on the screen before your call.
        * React `batches` state updates. It updates the screen after `all` the event handlers have run and have called their set functions.
        * In React, state is considered `read-only`, so you should `replace` it rather than `mutate` your existing objects. 
        * You can `reset` a component’s `state` by passing a `different key` to a component.
        * If you need to use the next state, you can save it in a variable before passing it to the set function:
    * `useSyncExternalStore` is a React Hook that lets you subscribe to an external store.
        * The useSyncExternalStore API is mostly useful if you need to integrate with existing `non-React` code.
        ```js
        const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?)
        const todos = useSyncExternalStore(todosStore.subscribe, todosStore.getSnapshot);
        ```
        ```js
        const isOnline = useSyncExternalStore(subscribe, getSnapshot);
        function getSnapshot() {
            return navigator.onLine;
        }
        function subscribe(callback) {
            window.addEventListener('online', callback);
            window.addEventListener('offline', callback);
            return () => {
                window.removeEventListener('online', callback);
                window.removeEventListener('offline', callback);
            };
        }
        ```
        * Usually you won’t write useSyncExternalStore directly in your components. Instead, you’ll typically call it from your own `custom` Hook. 
        ```js
        export function useOnlineStatus() {
            const isOnline = useSyncExternalStore(subscribe, getSnapshot);
            return isOnline;
        }
        ```
    * `useTransition` is a React Hook that lets you render a part of the UI in the `background`.
        * The `isPending` flag that tells you whether there is a pending Transition. The startTransition function that lets you `mark updates as a Transition`.
        ```js
        const [isPending, startTransition] = useTransition()
        ```
        ```js
        function selectTab(nextTab) {
            startTransition(() => {
                setTab(nextTab);
            });
        }
        ```
        * Functions called in startTransition are called `“Actions”`. 
        ```js
        const updateQuantityAction = async newQuantity => {
            // To access the pending state of a transition,
            // call startTransition again.
            startTransition(async () => {
                const savedQuantity = await updateQuantity(newQuantity); // API
                startTransition(() => {
                    setQuantity(savedQuantity);
                });
            });
        };
        ```
        * `Suspense`-enabled `routers` are expected to `wrap` the navigation updates into `Transitions` by default.


