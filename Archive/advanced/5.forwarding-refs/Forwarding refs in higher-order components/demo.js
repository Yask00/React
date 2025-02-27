// Let’s start with an example HOC that logs component props to the console:

function logProps(Component) {
    class LogProps extends React.Component {
        componentDidUpdate(prevProps) {
            console.log('old props:', prevProps);
            console.log('new props:', this.props);
        }

        render() {
            const {forwardedRef, ...rest} = this.props;
            // Assign the custom prop "forwardedRef" as a ref
            return <Component ref={forwardedRef} {...rest} />;
        }
    }

    // Note the second param "ref" provided by React.forwardRef.
    // We can pass it along to LogProps as a regular prop, e.g. "forwardedRef"
    // And it can then be attached to the Component.
    return React.forwardRef((props, ref) => {
        return <LogProps {...props} forwardedRef={ref} />
    });
}

//   The “logProps” HOC passes all props through to the component it wraps, 
//   so the rendered output will be the same. For example, we can use this HOC 
//   to log all props that get passed to our “fancy button” component

class FancyButton extends React.Component {
    focus() {
        // ...
    }

    // ...
}

// Rather than exporting FancyButton, we export LogProps.
// It will render a FancyButton though.
export default logProps(FancyButton);