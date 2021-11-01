import React, { Component } from "react";

import PropTypes from "prop-types";
import { getCurrentProfile } from "../../action/ProfileAction";

import { connect } from "react-redux";
import Spinner from "../../common/Spiner";
import { Link } from 'react-router-dom';
import ProfileAction from './ProfileAction';

import { deleteAccount } from './../../action/ProfileAction';
import Experience from "./Experience";
import Education from "./Education";

class DashBoard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  onDeleteClick=(e)=>{
    this.props.deleteAccount()

  }
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashBoardContent;
    if (profile === null || loading) {
      dashBoardContent = <Spinner />;
    } else {
      // Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashBoardContent = (
                  <div>
                    <p className="lead text-muted">Welcome <Link to={`/profile/${profile.handle}`}> {user.name}</Link></p>
                    <ProfileAction/>
                    <div style={{marginBottom:'10px'}}>
                    <Experience experience = {profile.experience}/>
                    </div>
                    <div style={{marginTop:'50px'}}>
                    <Education education={profile.education} />
                    </div>
                      <div style={{marginBottom:'60px'}}/> 
                       <button onClick={this.onDeleteClick} className="btn btn-danger">Delete My Account</button>
                      </div>
                      
        
        );
      }
      
      
      // user is logged but has not profile
      else {
        dashBoardContent = (
          <div>
            <p className="lead text-muted">Welcome{user.name}</p>
            <p>
              you have not yet setup a profile,place and some information
            </p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
                Create profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">DashBoard</h1>
              {dashBoardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DashBoard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapsStateProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapsStateProps, { getCurrentProfile,deleteAccount })(DashBoard);
