class HelloWorld extends React.Component {
    render() {
        return (
            // looks like html, actually JSX
            <h1 className="large">Hello world</h1>
        );
    }
}

//...............AFTER TRANSLATION

class HelloWorld extends React.Component {
    render() {
        return (
            React.createElement(
                'h1',
                { className: 'large' },
                'Hello World'
            )
        );
    }
}

<div>
    <img src="profile.jpg" alt="Profile photo" />
    <h1>Welcome back Ari</h1>
</div>
// ......is
React.createElement("div", null,
    React.createElement("img", { src: "profile.jpg", alt: "Profile photo" }),
    React.createElement("h1", null, "Welcome back Ari")
);