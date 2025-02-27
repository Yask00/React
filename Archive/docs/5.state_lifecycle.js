class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = { date: new Date() };
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }
  
    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
          date: new Date()
        });
    }

    render() {
        return (
            <div>
                <h1>Hello, world!</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        );
    }
}

ReactDOM.render(
    <Clock />,
    document.getElementById('root')
);


// 3 DIFFERENT CLOCKS BASED ON PROPS 


// function FormattedDate(props) {
//     return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
//   }
  
//   class Clock extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = {date: new Date()};
//     }
  
//     componentDidMount() {
//       if (this.props.stamp === '1') {
//         this.timerID = setInterval(
//         () => this.tick(),
//         1000
//       );
//       }
//       if (this.props.stamp === '2') {
//         this.timerID = setInterval(
//         () => this.tick(),
//         2000
//       );
//       }
//       if (this.props.stamp === '3') {
//         this.timerID = setInterval(
//         () => this.tick(),
//         3000
//       );
//       }
//     }
  
//     componentWillUnmount() {
//       clearInterval(this.timerID);
//     }
  
//     tick() {
//       this.setState({
//         date: new Date()
//       });
//     }
  
//     render() {
//       return (
//         <div>
//           <h1>Hello, world!</h1>
//           <FormattedDate date={this.state.date} />
//         </div>
//       );
//     }
//   }
  
//   function App() {
//     return (
//       <div>
//         <Clock stamp="1" />
//         <Clock stamp="2" />
//         <Clock stamp="3" />
//       </div>
//     );
//   }
  
//   ReactDOM.render(<App />, document.getElementById('root'));
  