import React from 'react';
import ReactDOM from 'react-dom';
import { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"

import Main from './Components/Main/Main';
import Registration from "./Components/Registration/Registration"
import LogIn from './Components/LogIn/LogIn';

import { Provider } from "react-redux";
import store from './store';

import './index.css';
import ErrorPage from './Components/Error/ErrorPage';
import EditProfile from './Components/Profile/EditProfile';
import PostGeneral from './Components/Posts/PostGeneral';
import AddPost from './Components/Posts/AddPost';
import PostDetails from './Components/Posts/PostDetails';


class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Provider store={store}>
            <Route path="/home" exact render={() => (<Main />)} />
            <Route path="/registration" exact render={() => (<Registration />)} />
            <Route path="/log-in" exact render={() => (<LogIn />)} />
            <Route path="/profile" exact render={() => (<EditProfile />)} />
            <Route path="/post-general" exact render={()=>(<PostGeneral/>)} />
            <Route path="/add-post" exact render={()=>(<AddPost/>)} />
            <Route path="/post-details" exact render={()=>(<PostDetails/>)} />
            <Route path="/404" component={ErrorPage}/>
            <Redirect from="/" to="/home" />
          </Provider>
        </Switch>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
