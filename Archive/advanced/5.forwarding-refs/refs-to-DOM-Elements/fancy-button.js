function FancyButton(props) {
    return (
      <button className="FancyButton">
        {props.children}
      </button>
    );
  }

//   In the example below, FancyButton uses React.forwardRef to 
//   obtain the ref passed to it, and then forward it to the DOM button that it renders:

  const FancyButton = React.forwardRef((props, ref) => (
    <button ref={ref} className="FancyButton">
      {props.children}
    </button>
  ));
  
  // You can now get a ref directly to the DOM button:
  const ref = React.createRef();
  <FancyButton ref={ref}>Click me!</FancyButton>;

// Here is a step-by-step explanation of what happens in the above example:

// We create a React ref by calling React.createRef and assign it to a ref variable.
// We pass our ref down to <FancyButton ref={ref}> by specifying it as a JSX attribute.
// React passes the ref to the (props, ref) => ... function inside forwardRef as a second argument.
// We forward this ref argument down to <button ref={ref}> by specifying it as a JSX attribute.
// When the ref is attached, ref.current will point to the <button> DOM node.