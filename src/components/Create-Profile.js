import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";


import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import {createProfile} from '../../src/action/ProfileAction'
import { withRouter } from 'react-router-dom';

class CreateProfile extends Component {
  constructor(props) {
    super();
    this.state = {
        displaySocialInputs:false,
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      skills: "",
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
  componentWillReceiveProps(nextProps){
     if(nextProps.errors){
       this.setState({errors:nextProps.errors})
     }
  }
  onSubmit = (e) => {
    e.preventDefault();
    const profileData = {
      handle:this.state.handle,
      company:this.state.company,
      website:this.state.website,
      location:this.state.location,
      status:this.state.status,
      skills:this.state.skills,
      githubusername:this.state.githubusername,
      bio:this.state.bio,
      twitter:this.state.twitter,
      facebook:this.state.facebook,
      linkedin:this.state.linkedin,
      youtube:this.state.youtube,
      instagram:this.state.instagram,
}
     this.props.createProfile(profileData,this.props.history)   
  };
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const { errors,displaySocialInputs } = this.state;
    let socialInputs;
    if(displaySocialInputs){
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
       )
    }
    else{

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
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">
                Let's get some information to make your profile stand out
              </p>
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
                       onClick ={()=>{
                         this.setState(prevState =>({
                          displaySocialInputs : !prevState.displaySocialInputs
                         }))
                     }} 
                     className="btn btn-light">
                     Add social networks Links
                     </button>
                     <span className="text-muted"> Optional </span>
                 </div>
                 {socialInputs}
                 <input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />    
            </form>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
});

export default connect(mapStateToProps,{createProfile})(withRouter(CreateProfile));
