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
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
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
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-3" />
            <div className="col-md-6">
              <div className="text-center mt-4">
                <h2>Welcome back</h2>
                <p className="lead">
                  Sign in to your account to connect with developers
                </p>
              </div>

              <div className="card">
                <div className="card-body">
                  <div className="m-sm-4">
                    <div className="text-center">
                      <h2 className="mb-4">
                        <strong>{"< Socket />"}</strong>{" "}
                      </h2>
                    </div>
                    <form onSubmit={this.onSubmit}>
                      <div className="form-group">
                        <label>Email</label>
                        <TextFieldGroup
                          placeholder="Enter your email"
                          name="email"
                          type="email"
                          value={this.state.email}
                          onChange={this.onChange}
                          error={errors.email}
                        />
                      </div>
                      <div className="form-group">
                        <label>Password</label>
                        <TextFieldGroup
                          placeholder="Password"
                          name="password"
                          type="password"
                          value={this.state.password}
                          onChange={this.onChange}
                          error={errors.password || errors.isVerified}
                        />
                        {errors.isVerified && (
                          <Link
                            to="/resendVerification"
                            className="form-check-label"
                          >
                            Resend Verification Email?
                          </Link>
                        )}
                        <div className="mt-4">
                          <div className="d-flex justify-content-center links">
                            Don't have an account?{" "}
                            <Link to="/register" className="ml-2">
                              Sign Up
                            </Link>
                          </div>
                          <div className="d-flex justify-content-center links">
                            <Link to="/forgot-password">
                              Forgot your password?
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="pl-3">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="rememberMe"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="exampleCheck1"
                        >
                          Remember me next time
                        </label>
                      </div>
                      <div className="text-center mt-3">
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg"
                        >
                          Sign in
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3" />
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
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ loginUser: loginUser }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
