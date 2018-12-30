// Context provides a way to pass data through the component tree 
// without having to pass props down manually at every level.

class App extends React.Component {
    render() {
        return <Toolbar theme="dark" />
    }
}

function Toolbar(props) {
    return (
        <div>
            <ThemedButton theme={props.theme} />
        </div>
    );
}

function ThemedButton(props) {
    return <Button theme={props.theme} />;
}

// Using context, we can avoid passing props through intermediate elements:

const ThemeContext = React.createContext('light');

class App extends React.Component {
    render() {
        return (
            <ThemeContext.Provider value="dark">
                <Toolbar />
            </ThemeContext.Provider>
        );
    }
}

function Toolbar(props) {
    return (
        <div>
            <ThemedButton />
        </div>
    );
}

function ThemedButton(props) {
    // Use a Consumer to read the current theme context.
    // React will find the closest theme Provider above and use its value.
    // In this example, the current theme is "dark".
    return (
        <ThemeContext.Consumer>
            {theme => <Button {...props} theme={theme} />}
        </ThemeContext.Consumer>
    )
}

// If you only want to avoid passing some props through many levels, 
// component composition is often a simpler solution than context.


