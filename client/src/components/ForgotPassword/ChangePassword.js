import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { changePassword } from "../../actions/authActions";
import { bindActionCreators } from "redux";
import TextFieldGroup from "../common/TextFieldGroup";

class ChangePassword extends React.Component {
  constructor() {
    super();
    this.state = {
      response: "",
      isVerified: false,
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

  componentDidMount() {
    //if logged-in go to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    } else {
      const token = this.props.match.params.token;
      axios
        .get(`/api/passwordChange/${token}`)
        .then(res => {
          this.setState({ isVerified: true });
        })
        .catch(err => {
          this.setState({ response: err.response.data.response });
        });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  ***REMOVED***

  onSubmit = e => {
    e.preventDefault();

    const newPassword = {
      password: this.state.password,
      password2: this.state.password2
    ***REMOVED***

    this.props.changePassword(
      newPassword,
      this.props.history,
      this.props.match.params.token
    );
  ***REMOVED***

  render() {
    const { response, isVerified, errors } = this.state;
    if (isVerified) {
      return (
        <div className="login">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h3 className="display-6 text-center mb-4 mt-4">
                  Change your password
                </h3>
                <form noValidate onSubmit={this.onSubmit}>
                  <TextFieldGroup
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    error={errors.password}
                  />

                  <TextFieldGroup
                    placeholder="Confrm Password"
                    name="password2"
                    type="password"
                    value={this.state.password2}
                    onChange={this.onChange}
                    error={errors.password2}
                  />

                  <input
                    type="submit"
                    value="Change Password"
                    className="btn btn-info btn-block mt-4"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="login">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <p className="lead text-center">{response}</p>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

ChangePassword.propTypes = {
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
)(withRouter(ChangePassword));
