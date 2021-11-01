import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

import { createProfile, getCurrentProfile } from "../../action/ProfileAction";
import {Link, withRouter } from "react-router-dom";
import InputGroup from "../../common/InputGroup";
import TextFieldGroup from "../../common/TextFieldGroup";
import SelectListGroup from "../../common/SelectListGroup";
import TextAreaFieldGroup from "../../common/TextAreaFieldGroup";
import isEmpty from "./../../validation/isEmpty";


class EditProfile extends Component {
  constructor(props) {
    super();
    this.state = {
      displaySocialInputs: false,
      handle: "", // required
      company: "",
      website: "",
      location: "",
      status: "", // required
      skills: "", // required
      bio: "",
      githubusername: "",
      youtube: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      instagram: "",
      errors: {},
    };
  }
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
      if (nextProps.profile.profile) {
        const profile = nextProps.profile.profile;

        // bring skills array back to csv
        const skillsCSV = profile.skills.join(",");
        //if profile field doesnt exist, make empty string
        profile.company = !isEmpty(profile.company) ? profile.company : "";
        profile.website = !isEmpty(profile.website) ? profile.website : "";
        profile.location = !isEmpty(profile.location) ? profile.location : "";
        profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
        profile.githubusername = !isEmpty(profile.githubusername) ? profile.githubusername : "";
       profile.social = !isEmpty(profile.social) ? profile.social : {};
        profile.twitter = !isEmpty(profile.social.twitter)
          ? profile.social.twitter
          : "";
        profile.facebook = !isEmpty(profile.social.facebook)
          ? profile.social.facebook
          : "";
        profile.youtube = !isEmpty(profile.social.youtube)
          ? profile.social.youtube
          : "";
        profile.linkedin = !isEmpty(profile.social.linkedin)
          ? profile.social.linkedin
          : "";
        profile.instagram = !isEmpty(profile.social.instagram)
          ? profile.social.instagram
          : "";
          this.setState({
            handle: profile.handle, // required
            company: profile.company,
            website: profile.websile,
            location: profile.location,
            status: profile.status, // required
            skills: skillsCSV, // required
            bio: profile.bio,
            githubusername: profile.githubusername,
            youtube: profile.youtube,
            twitter: profile.twitter,
            facebook: profile.facebook,
            linkedin: profile.linkedin,
            instagram: profile.instagram
          })
      }
     
  }

  onSubmit = (e) => {
    e.preventDefault();
    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram,
    };
    this.props.createProfile(profileData, this.props.history);
  };
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { errors, displaySocialInputs } = this.state;
    let socialInputs;
    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter profile url"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />
          <InputGroup
            placeholder="Facebook page url"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />
          <InputGroup
            placeholder="Linkedin profile url"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
          />
          <InputGroup
            placeholder="Youtube Channel  url"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />
          <InputGroup
            placeholder="Instagram page url"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />
        </div>
      );
    } else {
    }

    // Select option for status
    const options = [
      { label: "* Select profesional status", value: 0 },
      { label: "Devloper", value: "Devloper" },
      { label: "Junior Devloper", value: "Junior Devloper" },
      { label: "Senior Devloper", value: "Senior Devloper" },
      { label: "Manager", value: "Manager" },
      { label: "Student or Learning", value: "Student or Learning" },
      { label: "Instructor or Teacher", value: "Instructor or Teacher" },
      { label: "Intern", value: "Intern" },
      { label: "Other", value: "Other" },
    ];
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
            <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit Profile</h1>
              <p className="lead text-center"></p>
              <small className="d-block pb-3">* = requied fields</small>
            </div>
            <form onSubmit={this.onSubmit}>
              <TextFieldGroup
                placeholder="* profile Handle"
                name="handle"
                value={this.state.handle}
                error={errors.handle}
                onChange={this.onChange}
                info="A unique handle for your profile url.your full name,company name,
                     nickname,etc(This Can't be change later)"
              />
              <SelectListGroup
                placeholder="Status"
                name="status"
                value={this.state.status}
                error={errors.status}
                options={options}
                onChange={this.onChange}
                info="Give us an idea of where you are ay in your career"
              />
              <TextFieldGroup
                placeholder="Company"
                name="company"
                value={this.state.company}
                error={errors.company}
                onChange={this.onChange}
                info="Could be your own company or on you work for"
              />
              <TextFieldGroup
                placeholder="Website"
                name="website"
                value={this.state.website}
                error={errors.website}
                onChange={this.onChange}
                info="Could be your own website or a company website"
              />
              <TextFieldGroup
                placeholder="Location"
                name="location"
                value={this.state.location}
                error={errors.location}
                onChange={this.onChange}
                info="City or city & state suggested(Dhaka,Bangladesh)"
              />
              <TextFieldGroup
                placeholder="Skills"
                name="skills"
                value={this.state.skills}
                error={errors.skills}
                onChange={this.onChange}
                info="Please use comma separated value(eg.HTML, css,JavaScript,php)"
              />
              <TextFieldGroup
                placeholder="Github Username"
                name="githubusername"
                value={this.state.githubusername}
                error={errors.githubusername}
                onChange={this.onChange}
                info="If you want your latest repos and a Github link,includer your username"
              />
              <TextAreaFieldGroup
                placeholder="Short Bio"
                name="bio"
                value={this.state.bio}
                error={errors.bio}
                onChange={this.onChange}
                info="Tell us a little about yourself"
              />
              <div className="mb-3">
                <button
                  type="button"
                  onClick={() => {
                    this.setState((prevState) => ({
                      displaySocialInputs: !prevState.displaySocialInputs,
                    }));
                  }}
                  className="btn btn-light"
                >
                  Add social networks Links
                </button>
                <span className="text-muted"> Optional </span>
              </div>
              {socialInputs}
              <input
                type="submit"
                value="Submit"
                className="btn btn-info btn-block mt-4"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

EditProfile.propTypes = {

  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,

  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
