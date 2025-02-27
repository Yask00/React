class HelloMessage extends React.Component {
    render () {
        return (
            <div>
                Hello {this.props.name}
            </div>
        );
    }
}

ReactDom.render(
    <HelloMessage name="Taylor" />,
);