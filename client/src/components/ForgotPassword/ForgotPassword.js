import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { sendPasswordChangeEmail } from "../../actions/authActions";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import isEmpty from "../../validation/is-empty";

class ForgotPassword extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      errors: {},
      emailSent: false
    ***REMOVED***
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ emailSent: false, errors: {} });
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
      email: this.state.email
    ***REMOVED***
    this.props.sendPasswordChangeEmail(userData);
    this.setState({ emailSent: isEmpty(this.state.errors) });
  ***REMOVED***

  render() {
    const { errors, emailSent } = this.state;
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Forgot Password</h1>
              <p className="lead text-center">
                Please enter your email address below and we will send you
                information to change your password.
              </p>
              <form onSubmit={this.onSubmit}>
                <div>
                  <div className="form-group has-success">
                    <input
                      className={classnames("form-control form-control-lg", {
                        //add this class to errors.type
                        "is-invalid": errors.email,
                        "is-valid": emailSent
                      })}
                      placeholder="Email Address"
                      name="email"
                      value={this.state.email}
                      onChange={this.onChange}
                    />

                    {/*display errors if the error.name exists*/}
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                    {emailSent && isEmpty(errors) && (
                      <div className="valid-feedback">
                        Verification Link Sent. Please check your email
                      </div>
                    )}
                  </div>
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ForgotPassword.propTypes = {
  sendPasswordChangeEmail: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
***REMOVED***

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { sendPasswordChangeEmail: sendPasswordChangeEmail },
    dispatch
  );
***REMOVED***

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ForgotPassword));
