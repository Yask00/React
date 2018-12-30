import React, { Component } from 'react';
import { Route, Link, BrowserRouter as Router, } from 'react-router-dom'; // newly added
import './App.css';

// There are two types of Router components that you can use in your React web application. 
// The BrowserRouter and HashRouter. The former gives you a URL without the #, while the latter gives you a URL with the #.

const Home = () => (
  <div>
    <h2> Home </h2>
  </div>
);

const Airport = () => (
  <div>
    <ul>
      <li>Jomo Kenyatta</li>
      <li>Tambo</li>
      <li>Murtala Mohammed</li>
    </ul>
  </div>
);

const City = () => (
  <div>
    <ul>
      <li>San Francisco</li>
      <li>Istanbul</li>
      <li>Tokyo</li>
    </ul>
  </div>
);

const Courses = ({ match }) => (
  <div>
     <ul>
        <li><Link to={`${match.url}/technology`}>Technology</Link></li>
        <li><Link to={`${match.url}/business`}>Business</Link></li>
        <li><Link to={`${match.url}/economics`}>Economics</Link></li>
    </ul>


    {/* <Route exact path={`${match.path}/technology`} render={() => (<div> This is technology </div>)}/>
    <Route path={`${match.path}/business`} component={() => (<div> This is business </div>)}/>
    <Route path={`${match.path}/economics`} component={() => (<div> This is economics </div>)}/> */}

    {/* Replace the three routes with one using match.params */}
    <Route exact path={`${match.path}/:course`} render={({match}) => (<div> This is {match.params.course} </div>)}/>

  </div>
);

class App extends Component {
  render() {
    return (
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/airports">Airports</Link></li>
          <li><Link to="/cities">Cities</Link></li>
          <li><Link to="/courses">Courses</Link></li>
        </ul>

        <Route path="/" exact component={Home} />
        <Route path="/airports" component={Airport} />
        <Route path="/cities" component={City} />
        <Route path="/courses" component={Courses} />

        {/* <Route path="/airports" 
            render={() => (<div> This is the airport route </div>)}/> */}
      </div>
    );
  }
}

export default App;
