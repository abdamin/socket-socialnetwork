import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import { bindActionCreators } from "redux";
import TextFieldGroup from "../common/TextFieldGroup";
import { Link } from "react-router-dom";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    ***REMOVED***
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  ***REMOVED***

  componentDidMount() {
    //if logged in go to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    ***REMOVED***

    this.props.loginUser(userData);
  ***REMOVED***

  render() {
    const { errors } = this.state;
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your DevConnector account
              </p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Email Address"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                />

                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password || errors.isVerified}
                />
                {errors.isVerified && (
                  <Link to="/resendVerification" class="form-check-label">
                    Resend Verification Email?
                  </Link>
                )}
                <input
                  type="submit"
                  value="Login"
                  className="btn btn-info btn-block mt-4"
                />

                <div class="mt-4">
                  <div class="d-flex justify-content-center links">
                    Don't have an account?{" "}
                    <Link to="/register" class="ml-2">
                      Sign Up
                    </Link>
                  </div>
                  <div class="d-flex justify-content-center links">
                    <Link to="/forgot-password">Forgot your password?</Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
***REMOVED***

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ loginUser: loginUser }, dispatch);
***REMOVED***

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
