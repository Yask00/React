// NO
<button onclick="activateLasers()">
    Activate Lasers
</button>
//YES
<button onClick={activateLasers}>
    Activate Lasers
</button>

// preventDefault

function ActionLink() {
    function handleClick(e) {
        e.preventDefault();
        console.log('The link was clicked.');
    }

    return (
        <a href="#" onClick={handleClick}>
            Click me
      </a>
    );
}

// Example
class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isToggleOn: true };

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);

        // Generally, if you refer to a method without () after it, such as 
        // onClick={this.handleClick}, you should bind that method.
        // or

        // handleClick = () => {
        //     console.log('this is:', this);
        // }
    }

    handleClick() {
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));
    }

    render() {
        return (
            <button onClick={this.handleClick}>
                {this.state.isToggleOn ? 'ON' : 'OFF'}
            </button>
        );
    }
}

ReactDOM.render(
    <Toggle />,
    document.getElementById('root')
);