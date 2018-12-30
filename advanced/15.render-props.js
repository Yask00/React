// The term “render prop” refers to a simple technique for sharing 
// code between React components using a prop whose value is a function.

//  mouse position

class MouseTracker extends React.Component {
    constructor(props) {
        super(props);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.state = { x: 0, y: 0 };
    }

    handleMouseMove(event) {
        this.setState({
            x: event.clientX,
            y: event.clientY
        });
    }

    render() {
        return (
            <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>
                <h1>Move the mouse around!</h1>
                <p>The current mouse position is ({this.state.x}, {this.state.y})</p>
            </div>
        );
    }
}

// CAT AND MOUSE RENDER PROPS
class Cat extends React.Component {
    render() {
        const mouse = this.props.mouse;
        return (
            <img src="./cat.jpg" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
        );
    }
}

class Mouse extends React.Component {
    constructor(props) {
        super(props);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.state = { x: 0, y: 0 };
    }

    handleMouseMove(event) {
        this.setState({
            x: event.clientX,
            y: event.clientY
        });
    }

    render() {
        return (
            <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>

                {/*
                Instead of providing a static representation of what <Mouse> renders,
                use the `render` prop to dynamically determine what to render.
                */}
                {this.props.render(this.state)}
            </div>
        );
    }
}

class MouseTracker extends React.Component {
    render () {
        return (
            <div>
                <h1>Move the mouse around</h1>
                <Mouse render={mouse => (
                    <Cat mouse={mouse} />
                )}/>
            </div>
        )
    }
}

//More concretely, a render prop is a function prop that a component uses to know what to render.