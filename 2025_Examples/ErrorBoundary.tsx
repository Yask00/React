class ErrorBoundary extends React.Component {
    this.state = { hasError: false };
 
 
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }
 
 
    componentDidCatch(error, info) {
        console.log(error, info);
    }
 
 
    render() {
        if (this.state.hasError) {
            return <div>Something went wrong.</div>;
        }
        return this.props.children;
    }
}

class App extends React.Component {
    render() {
        return (
            <ErrorBoundary>
                <SomeErrorProneComponent />
            </ErrorBoundary>
        );
    }
}