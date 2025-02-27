// Resist the temptation to modify a component’s prototype (or otherwise mutate it) inside a HOC.
function logProps (InputComponent) {
    InputComponent.prototype.componentWillReceiveProps = function  (nextProps) {
        console.log('Current props: ', this.props);
        console.log('Next props: ', nextProps);
    }
    // The fact that we're returning the original input is a hint that it has
    // been mutated.
  return InputComponent;
}

// EnhancedComponent will log whenever props are received
const EnhancedComponent = logProps(InputComponent);


// Instead of mutation, HOCs should use composition, by wrapping the input component in a container component:

function logProps (WrappedComponent) {
    return class extends React.Component {
        componentWillReceiveProps(nextProps) {
            console.log('Current props: ', this.props);
            console.log('Next props: ', nextProps);
        }
        render() {
            // Wraps the input component in a container, without mutating it. Good!
            return <WrapppedComponent {...this.props} />
        }
    }
}