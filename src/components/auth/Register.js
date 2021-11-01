import React, { Component } from "react";

import PropTypes from "prop-types";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "./../../action/authAction";
import TextGroupInput from "../../common/TextFieldGroup";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
    };
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <TextGroupInput
                    type="text"
                    placeholder="Name"
                    value={this.state.name}
                    onChange={this.onChange}
                    name="name"
                    error={errors.name}
                  />
                </div>
                <div className="form-group">
                  <TextGroupInput
                    type="text"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.onChange}
                    name="email"
                    error={errors.email}
                  />
                </div>
                <div className="form-group">
                  <TextGroupInput
                    type="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.onChange}
                    name="password"
                    error={errors.password}
                  />
                </div>
                <div className="form-group">
                  <TextGroupInput
                    type="password"
                    placeholder="ConFirm Password"
                    value={this.state.password2}
                    onChange={this.onChange}
                    name="password2"
                    error={errors.password2}
                  />
                </div>
                <button type="submit" className="btn btn-info btn-block mt-4">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

// auth:state.auth

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
