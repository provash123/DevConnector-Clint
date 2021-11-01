import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from './store'
import jwt_decode from 'jwt-decode'
import setAuthToken from './utility/setAuthToken';
import { logoutUser, setCurrentUser } from '../../client/src/action/authAction'
import Profiles from './components/GetProfiles/Profiles.js'


import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

import "./App.css";
import DashBoard from './components/dashboard/DashBoard';
import { clearCurrentProfile } from './action/ProfileAction';
import PrivateRoute from './common/PrivateRoute';
import CreateProfile from './components/Create-Profile';
import EditProfile from '../../client/src/components/edit-profile/Edit-Profile';
import AddExperience from './components/addCredantial/AddExperience';
import AddEducation from './components/addCredantial/AddEducation';
import Profile from '../../client/src/components/profile/Profile';
import Posts from './components/Posts/Post';
import NotFound from './components/not-found/notFound';
import Post from './components/post/Post';


// check for token
if(localStorage.jwtToken){
  // set auth token header auth
  setAuthToken(localStorage.jwtToken)
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken)
  store.dispatch(setCurrentUser(decoded))

  // check for expired token
  const currentTime = Date.now() /1000;
  if(decoded.exp < currentTime){
    // logout user
    store.dispatch(logoutUser())

    //  clear current profile
      store.dispatch(clearCurrentProfile())
    // Redirect to login
    window.location.href = '/login'

  }
}


class App extends Component {
  render(){
    const { isAuthenticated } = this.props;
  return (
    <Provider store= {store}>
      <BrowserRouter>
        <div className="app">
          <Navbar />
          <Route path="/" exact component={Landing} />
          <div className="container">
            <Route  path="/register" exact component={Register} />
            <Route  path="/login" exact component={Login} />
            <Route  path="/profiles" exact component={Profiles} />
            <Route  path="/profiles/:handle" exact component={Profile} />
             
            <Switch>
            <PrivateRoute isAuthenticated={isAuthenticated} path="/dashboard" exact component={DashBoard} />
           <PrivateRoute isAuthenticated={isAuthenticated} path="/create-profile" exact component={CreateProfile} />
            <PrivateRoute isAuthenticated={isAuthenticated} path="/edit-profile" exact component={EditProfile} />
            <PrivateRoute isAuthenticated={isAuthenticated} path="/add-experience" exact component={AddExperience} />
            <PrivateRoute isAuthenticated={isAuthenticated} path="/add-education" exact component={AddEducation} />
            <PrivateRoute isAuthenticated={isAuthenticated} path="/feed" exact component={Posts} />
            <PrivateRoute isAuthenticated={isAuthenticated} path="/post/:id" exact component={Post} />
             </Switch>
             <Route  path="/not-found" exact component={NotFound} />
            
            
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </Provider>
  );
  }
}

export default App;
