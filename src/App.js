import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Grid } from 'react-bootstrap';
import Navigation from './Navigation';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Test from './components/Test';
import NotFound from './NotFound';

import './App.css';

const Auth = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true
        setTimeout(cb, 100) // fake async
    },
    signout(cb) {
        this.isAuthenticated = false
        setTimeout(cb, 100) // fake async
    }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        this.state.auth === true
            ? <Component {...props} />
            : <Redirect to='/login' />
    )} />
)



const InitialState = {
    user:[], auth: false
};

class App extends Component {

verifyUser = (e) => {
    this.setState({user: e});
    console.log(this.state);
    this.state.user.id === null ? this.setState({auth: false}): this.setState({auth: true});
    console.log(this.state);
}
logoutUser = () => {
    this.reset();
    console.log(this.state);
    // this.setState({auth:false});
    // this.state.user.id === null || this.state.user.id === undefined ? this.setState({auth: false}): this.setState({auth: true});
    // console.log(this.state);
}

    constructor(props) {
        super(props)
        this.state = InitialState;
    }

    reset() {
        this.setState(InitialState);
    }

render () {
    return(
    <Router>
        <div className="App">
            <Navigation auth={this.state.auth} user={this.state.user} callback={this.logoutUser}/>
            <Grid>
                <Switch>
                    <Route exact name="index" path="/" component={Home} />
                    <Route path="/test" component={Test}/>
                    {/*<Route path="/login" callback={this.verifyUser} component={Login}/>*/}
                    <Route exact path='/login' render={(props) =>
                        (<Login {...props} user={this.state.user} callback={this.verifyUser} />)}/>
                    <Route path="/register" component ={Register}/>
                    <Route path="/profile" component ={Profile}/>
                    <Route component={NotFound} />
                </Switch>
            </Grid>
            <hr/>
        </div>
    </Router>
  // render() {
  //   return (
  //     <div className="App">
  //       {/*<header className="App-header">*/}
  //         {/*<img src={logo} className="App-logo" alt="logo" />*/}
  //         {/*<h1 className="App-title">Welcome to React</h1>*/}
  //       {/*</header>*/}
  //       {/*<p className="App-intro">*/}
  //       {/*</p>*/}
  //     </div>
  //   );
  // }
);}}


export default App;
