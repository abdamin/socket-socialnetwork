import React from "react";
import TextFieldGroup from "../../../components/common/TextFieldGroup";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { changePassword } from "../../../actions/authActions";
import { bindActionCreators } from "redux";
import isEmpty from "../../../validation/is-empty";

class PasswordChangeForm extends React.Component {
  constructor() {
    super();
    this.state = {
      didSave: false,
      currentPassword: "",
      password: "",
      password2: "",
      errors: {}
    ***REMOVED***
  }
  componentWillReceiveProps(nextProps) {
    //console.log(nextProps);
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({ didSave: false });

    this.setState({ [e.target.name]: e.target.value });
  ***REMOVED***

  onSubmit = e => {
    e.preventDefault();

    const newPassword = {
      currentPassword: this.state.currentPassword,
      password: this.state.password,
      password2: this.state.password2
    ***REMOVED***

    this.props.changePassword(newPassword);
    this.setState({ didSave: true });
  ***REMOVED***
  render() {
    const { errors } = this.state;
    return (
      <div>
        <div className="card-header">
          <h5 className="card-title mb-0">Change your password</h5>
        </div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="address">Current Password</label>
                  <TextFieldGroup
                    placeholder="Current Password"
                    name="currentPassword"
                    value={this.state.currentPassword}
                    onChange={this.onChange}
                    error={errors.currentPassword}
                    info="Enter your current passowrd"
                    type="password"
                  />
                </div>
              </div>
              <div className="col-md-6" />
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="address2">New Password</label>
                  <TextFieldGroup
                    placeholder="New Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    error={errors.password}
                    info="Password must be more than 6 characters"
                    type="password"
                  />
                </div>
              </div>
              <div className="col-md-6" />
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="address2">Confirm New Password</label>
                  <TextFieldGroup
                    placeholder="Confirm New Password"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.onChange}
                    error={errors.password2}
                    info="Passwords must match"
                    type="password"
                  />
                </div>
              </div>
              <div className="col-md-6" />
            </div>

            <div className="row">
              <div className="col-md-4">
                <button type="submit" className="btn btn-primary">
                  Change Password
                </button>
              </div>
              <div className="col-md-6">
                {isEmpty(errors) && this.state.didSave && (
                  <p
                    style={{
                      width: "100%",
                      color: "#5fc27e"
                    }}
                  >
                    Changes saved
                  </p>
                )}
                {!isEmpty(errors) && (
                  <p
                    style={{
                      width: "100%",
                      color: "#f44455"
                    }}
                  >
                    Check Errors. Could not save changes.
                  </p>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
PasswordChangeForm.propTypes = {
  changePassword: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
***REMOVED***

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ changePassword: changePassword }, dispatch);
***REMOVED***

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordChangeForm);
