import React from 'react';
import {Route,Redirect} from 'react-router-dom'
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';


// const PrivateRoute = ({ component : Component, auth, ...children}) => (
//                  <Route 
//                  {...rest}
//                  render = {props=>
//                  auth.isAuthenticated === true ? (

//                      <Component {...props} />
//                  ) : (

//                      <Redirect to="/login" />
//                  )
                 
//                  }

//                  />

// ) 

function PrivateRoute({ component: Component, auth, ...children }) {
    if (auth.isAuthenticated === true) {
      return <Route {...children} render={props => <Component {...props} />} />;
    }
    return <Redirect to="/login" />;
  }
  
 
    
    

 PrivateRoute.propTypes = {
     auth:PropTypes.object.isRequired
 }

 const mapStateToProps = state=>({
     auth:state.auth
 }) 

export default connect(mapStateToProps) (PrivateRoute);
