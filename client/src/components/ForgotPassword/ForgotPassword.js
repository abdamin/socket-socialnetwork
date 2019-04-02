import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { verifyUser } from "../../actions/authActions";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import isEmpty from "../../validation/is-empty";

class ResetEmail extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      errors: {},
      emailSent: false
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ emailSent: false, errors: {} });
  };

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
    };
    this.props.verifyUser(userData);
    this.setState({ emailSent: isEmpty(this.state.errors) });
  };

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

ResetEmail.propTypes = {
  verifyUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ verifyUser: verifyUser }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ResetEmail));
