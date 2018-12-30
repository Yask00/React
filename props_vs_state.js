// props
//      how components talk to eachother
//      flow downwards from the parent component
//      There is also the case that you can have default props if parent dont have them

//      What if the user inputs data directly to the component?
//      Well we have state

// state
//      Props shouldn’t change, so state steps up
//      When you setState it updates the state object and then re-renders the component
//      looks and works a lot like props, but it is contained within a single component


// props
class Topic extends React.Component {
    render () {
        return (
            <div>{this.props.name}</div>
        )
    }
}
class Welcome extends React.Component {
    render (){
        return (
            <div>
                <p> Welcome to React, today you will learn: </p>
                <Topic name="Props"/>
                <Topic name="State"/> 
            </div>
        )
    }
}

// state
class Counter extends React.Component {
    constructor (props){
        super(props);
        this.state = {counter: 0} //!
        this.increment = this.increment.bind(this)
    }

    increment () {
        this.setState({counter: this.state.counter + 1}) //!
    }

    render(){
        return(
          <button onClick={this.increment}>Like</button>
          <p>{this.state.counter}</p> //!
        );
    }
}
