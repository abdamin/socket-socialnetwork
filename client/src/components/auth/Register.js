import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import { bindActionCreators } from "redux";
import TextFieldGroup from "../common/TextFieldGroup";
import { Link } from "react-router-dom";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentDidMount() {
    //if logged-in go to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    //console.log(nextProps);
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-3" />
            <div className="col-md-6">
              <div className="text-center mt-4">
                <h1 className="h2">Get started</h1>
                <p className="lead">Create your Devconnector account</p>
              </div>

              <div className="card">
                <div className="card-body">
                  <div className="m-sm-4">
                    <form noValidate onSubmit={this.onSubmit}>
                      <div className="form-group">
                        <label>Name</label>
                        <TextFieldGroup
                          placeholder="Your full name"
                          name="name"
                          type="text"
                          value={this.state.name}
                          onChange={this.onChange}
                          error={errors.name}
                        />
                      </div>
                      <div className="form-group">
                        <label>Email</label>
                        <TextFieldGroup
                          placeholder="Email"
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
                          error={errors.password}
                        />
                      </div>
                      <div className="form-group">
                        <label>Confirm Password</label>
                        <TextFieldGroup
                          placeholder="Confrm your password"
                          name="password2"
                          type="password"
                          value={this.state.password2}
                          onChange={this.onChange}
                          error={errors.password2}
                        />
                        <div className="mt-4">
                          <div className="d-flex justify-content-center links">
                            Already have an account?{" "}
                            <Link to="/login" className="ml-2">
                              Sign In
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="text-center mt-3">
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg"
                        >
                          Sign up
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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

// const mapDispatchToProps = dispatch => {
//   return {
//     registerUser: userData => dispatch(registerUser(dispatch))
//   };
// };

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ registerUser: registerUser }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Register));
