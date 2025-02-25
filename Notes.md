* React `components` are JavaScript functions that return `markup`:
* The `export default` keywords specify the `main` component in the file
* In React, you specify a CSS class with `className`.
* `JSX` lets you put markup into JavaScript.A JSX element is a combination of JavaScript code and HTML tags that describes what you’d like to display.`JSX` looks like HTML, but under the hood it is transformed into plain JavaScript `objects`. You can’t return `two objects` from a function without wrapping them into an array. This explains why you also can’t return two JSX tags without wrapping them into another tag or a Fragment. 
* You will rely on JavaScript features like for `loop` and the array `map()` or `filter` function to render lists of components.
* Notice how `<li>` has a `key` attribute. For each item in a `list`, you should pass a string or a number that `uniquely` identifies that item among its siblings. 
* Notice how `onClick={handleClick}` has `no parentheses` at the end! Do not call the event handler function: you only need to pass it down. React will call your event handler when the user clicks the button.
* You’ll get two things from `useState`: the `current` state (count), and the function that lets you `update` it (`setCount`). Functions starting with `use` are called `Hooks`. `useState` is a `built-in` Hook provided by React. state acts like a snapshot for every render and doesn’t update `synchronously`.  
* `<MyButton count={count} onClick={handleClick} />` The information you pass down like this is called props. This is called `“lifting state up”`. By moving state up, you’ve shared it between components.
* React’s library to talk to web browsers (`React DOM`)
*  In React, it’s conventional to use `onSomething` names for props which represent events and `handleSomething` for the function definitions which handle those events.
* `Immutability` - Avoiding direct data mutation lets you keep previous versions of the data intact, and reuse them later.  By default, all child components `re-render` automatically when the state of a parent component changes. This includes even the child components that weren’t affected by the change.  Immutability makes it very cheap for components to compare whether their data has changed or not. 
* `setHistory([...history, nextSquares]);` adds to old array new item, eg combines them
* `<Avatar {...props} />`- This forwards all of `Profile’s` props to the `Avatar` without listing each of their names.
* When you nest content inside a JSX tag, the parent component will receive that content in a prop called `children`. Nested JSX like `<Card><Avatar /></Card>` will appear as `Card` component’s `children` prop.
* In React, you can `conditionally` render JSX using JavaScript syntax like `if` statements,`&&`, and `? :` operators.
* the `render tree` is only composed of React components.
* Instead, when you want to `update` an `object` and `array`, you need to create a `new one` (or make a `copy` of an existing one), and then `update the state` to use that cop - technically mutable, you should treat them as if they were immutable. 
``` 
    setPerson({
        ...person, // Copy other fields
        artwork: { // but replace the artwork
            ...person.artwork, // with the same one
            city: 'New Delhi' // but in New Delhi!
        }
    });
```
* All `events` `propagate` in React except `onScroll`, which only works on the JSX tag you attach it to.
* `batching` - React waits until `all` code in the event handlers has run before processing your state `updates`. This is why the `re-render` only happens after all these setNumber() calls. To update some state `multiple` times in one event, you can use `setNumber(n => n + 1)` updater function.
* Components with `many` state updates spread across many event handlers can get overwhelming. For these cases, you can consolidate all the state update logic `outside` your component in a single `function`, called `“reducer”` - `useReducer`. useReducer declares a state variable with the update logic inside a reducer function.
* `const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);`
    - The useReducer Hook takes two arguments:
        * A reducer function
        * An initial state
    - And it returns:
        * A stateful value
        * A dispatch function (to “dispatch” user actions to the reducer)
* `Context` lets the parent component make some information available to any component in the tree below it—no matter how deep—without passing it explicitly through props.
* Functions like `useTasks` and `useTasksDispatch` are called `Custom Hooks`. Your function is considered a custom Hook if its name starts with `use`. This lets you use other Hooks, like useContext, inside it.
* When you want a component to “remember” some information, but you don’t want that information to trigger new renders, you can use a `ref`: ```const ref = useRef(0);```.  Setting state re-renders a component. Changing a ref does not! For example, you can use `refs` to store `timeout IDs`, `DOM elements`, and other objects that don’t impact the component’s rendering output. Sometimes you might need access to the DOM elements managed by React
```
const inputRef = useRef(null);
inputRef.current.focus();
<input ref={inputRef} />
```
* Unlike `event handlers`, which let you handle particular events, `Effects` let you run some code `after` rendering. Use them to synchronize your component with a system outside of React.  This includes dealing with network, browser DOM, animations, widgets written using a different UI library, and other non-React code.
    * You don’t need Effects to transform data for rendering.
    * You don’t need Effects to handle user events.   
```
useEffect(() => {
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
    return () => { // cleanup fn - React will call your cleanup function each time before the Effect runs again
      connection.disconnect();
    };
  }, [isPlaying]);
```
```
    useEffect{.... 
      const intervalId = setInterval(onTick, 1000);
      return () => clearInterval(intervalId); // cleanup interval iside UseEffect
      return return () => {ignore = true;} / /where based on ignore you set state before
```
* Don’t use `refs` to prevent `Effects` from `firing` 
* This will instruct React to update the DOM synchronously right after the code wrapped in flushSync executes. 
```
flushSync(() => {
  setTodos([ ...todos, newTodo]);
});
listRef.current.lastChild.scrollIntoView();
```
* When `Strict Mode` is on, React `remounts` every component `once` after mount (state and DOM are preserved). This helps you find Effects that need cleanup and exposes bugs like race conditions early. 
* if you want to update a component’s `state` when some `props` or `state` change), you shouldn’t need an `Effect`. 
* `useMemo` tells React that you don’t want the inner function to re-run unless either todos or filter have changed. React will remember the return value of getFilteredTodos() during the initial render.It lets you cache the `result` of an expensive calculation.
```
    const visibleTodos = useMemo(() => {
        // ✅ Does not re-run unless (todos or filter) change
        return getFilteredTodos(todos, filter);
    }, [todos, filter]);
```
```
const contextValue = useMemo(() => ({
    currentUser, // Obj
    login // FN
  }), [currentUser, login]);
```
* Use ImmerJS to mutate like objects in state
```
const [shape, updateShape] = useImmer({
    color: 'orange',
    position: initialPosition
  });
```
```
updateShape(draft => {
    draft.color = e.target.value;
});
```
* `Debouncing` lets you delay some action until the user “stops doing things”.
* `useEffectEvent` - behaves a lot more like an `event handler`. The logic inside it is not `reactive`, and it always “sees” the `latest` values of your props and state.
```
const onConnected = useEffectEvent(() => {
    showNotification('Connected!', theme);
});
```
```
useEffect(() => {
  onConnected();
}, [dep2]); // theme is not dep1
 
```
* `Fetching` in an `effect` means the user has to wait longer to see the content, even though the data could have been fetched earlier. To solve this, you can use a data fetching library like `React Query`, `SWR`, `Apollo`, or Re`lay which provide options to `prefetch` data so the request is started before the component renders.
* React exposes a few built-in `components` that you can use in your JSX.
  * `<Fragment>`, alternatively written as <>...</>, lets you group multiple JSX nodes together.
  * `<Profiler>` lets you measure rendering performance of a React tree programmatically.
  ```js
  function onRender(id, phase, actualDuration, baseDuration, startTime, commitTime) {
    // Aggregate or log render timings...
  }
  ```
  * `<Suspense>` lets you display a fallback while the child components are loading.
  * `<StrictMode>` enables extra development-only checks that help you find bugs early.
    * Your components will re-render an extra time to find bugs caused by impure rendering.
    * Your components will re-run Effects an extra time to find bugs caused by missing Effect cleanup.
    * Your components will re-run refs callbacks an extra time to find bugs caused by missing ref cleanup.
    * Your components will be checked for usage of deprecated APIs.
* In addition to `Hooks` and `Components`, the react package `exports` a few other `APIs` that are useful for `defining` components. This page lists all the remaining modern React APIs.
    * `createContext` lets you define and provide context to the child components. Used with useContext.
    * `cache` lets you cache the result of a data fetch or computation.
      * cache is only for use with `React Server Components`.
    * `forwardRef` lets your component expose a DOM node as a ref to the parent. Used with useRef.
    * `lazy` lets you defer loading a component’s code until it’s rendered for the first time.
      * Do not declare lazy components inside other components:
      ```js
      const MarkdownPreview = lazy(() => import('./MarkdownPreview.js'));
      <Suspense fallback={<Loading />}>
        <h2>Preview</h2>
        <MarkdownPreview />
      </Suspense>
      ```
    * `memo` lets your component skip re-renders with same props. Used with useMemo and useCallback.
      ```js
      const Greeting = memo(function Greeting({ name }) {
        return <h1>Hello, {name}!</h1>;
      });
      ```
    * `startTransition` lets you mark a state update as non-urgent. Similar to useTransition, lets you render a part of the UI in the background.
      ```js
      function selectTab(nextTab) {
        startTransition(() => {
          setTab(nextTab);
        });
      }
      ```
    * `act` lets you wrap renders and interactions in tests to ensure updates have processed before making assertions.
      * Rendering components in tests
      * Dispatching events in tests
      ```js
      await act(async actFn)
      ```
    * `use` lets you read the value of a resource like a Promise or context.
* React DOM
  * `useFormStatus` is a Hook that gives you status information of the last form submission.The useFormStatus Hook must be called from a component that is rendered inside a `<form>`.
    ```js
    const { pending, data, method, action } = useFormStatus();
    ```
  * React supports all of the browser built-in HTML and SVG components.
  * `createPortal` lets you render some children into a different part of the DOM.
  ```js
    <div style={{ border: '2px solid black' }}>
      <p>This child is placed in the parent div.</p>
      {createPortal(
        <p>This child is placed in the document body.</p>,
        document.body
      )}
    </div>
  ```
  * `flushSync` lets you force React to flush any updates inside the provided callback synchronously. This ensures that the DOM is updated immediately. Using flushSync is uncommon and can hurt the performance of your app.
  ```js
  flushSync(() => {
    setSomething(123);
  });
  ```
  * `createRoot` lets you create a root to display React components inside a browser DOM node. If your app is `server-rendered`, using createRoot() is not supported. Use `hydrateRoot`() instead. `hydrateRoot` lets you display React components inside a browser DOM node whose HTML content was previously generated by `react-dom/server`.







