// Some types of contexts are consumed by many components (e.g. theme or localization). 
// It can be tedious to explicitly wrap each dependency with a <Context.Consumer> element. 
// A higher-order component can help with this.

// We could create a higher-order component called withTheme:
const ThemeContext = React.createContext('light');

// This function takes a component...
export function withTheme(Component) {
      // ...and returns another component...
    return function ThemedComponent(props) {
        return (
            <ThemeContext.Consumer>
                {theme => <Component {...props} theme={theme} />}
            </ThemeContext.Consumer>
        );
    };
}

// Now any component that depends on the theme context can easily subscribe to it using the withTheme function we’ve created:
function Button({ theme, ...rest }) {
    return <button className={theme} {...rest} />;
}

const ThemedButton = withTheme(Button);
