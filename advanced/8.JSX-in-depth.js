// Fundamentally, JSX just provides syntactic sugar for the 
// React.createElement(component, props, ...children) function.

<MyButton color="blue" shadowSize={2}>
    Click Me
</MyButton>

// compiles into:

React.createElement(
    MyButton,
    { color: 'blue', shadowSize: 2 },
    'Click Me'
)

    // You can also use the self-closing form of the tag if there are no children. So:

    < div className = "sidebar" />

        // compiles into:

        React.createElement(
            'div',
            { className: 'sidebar' },
            null
        )

// JSX REPEATING 10 ELEMENTS

function Repeat(props) {
    let items = [];
    for (let i = 0; i < props.numTimes; i++) {
        items.push(props.children(i));
    }
    return <div>{items}</div>
}

function ListOfTenThings () {
    return (
        <Repeat numTimes={10}>
            {(index) => <div key={index}>This is item {index} in the list</div>}
        </Repeat>
    );
}


// CONDIOTIONALLY RENDER REACT ELEMENTS
// false, null, undefined, and true are valid children. 
// They simply don’t render. These JSX expressions will all render to the same thing:

// This can be useful to conditionally render React elements. This JSX only renders a <Header /> if showHeader is true:

<div>
    {showHeader && <Header />}
    <Content />
</div>

// NO
<div>
  {props.messages.length &&
    <MessageList messages={props.messages} />
  }
</div>

// YES
<div>
  {props.messages.length > 0 &&
    <MessageList messages={props.messages} />
  }
</div>