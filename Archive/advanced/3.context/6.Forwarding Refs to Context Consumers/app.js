// One issue with the render prop API is that refs don’t automatically 
// get passed to wrapped elements. To get around this, use React.forwardRef:

import FancyButton from './fancy-button';

const ref = React.createRef();

// Our ref will point to the FancyButton component,
// And not the ThemeContext.Consumer that wraps it.
// This means we can call FancyButton methods like ref.current.focus()
<FancyButton ref={ref} onClick={handleClick}>
  Click me!
</FancyButton>;