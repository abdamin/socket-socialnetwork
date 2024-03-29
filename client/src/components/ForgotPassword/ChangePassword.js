import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { resetPassword } from "../../actions/authActions";
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
    };
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
  };

  onSubmit = e => {
    e.preventDefault();

    const newPassword = {
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.resetPassword(
      newPassword,
      this.props.history,
      this.props.match.params.token
    );
  };

  render() {
    const { response, isVerified, errors } = this.state;
    if (isVerified) {
      return (
        <div className="login">
          <div className="container">
            <div className="row">
              <div className="col-md-6 m-auto">
                <div className="text-center mt-4">
                  <h3 className="h2">Change your password</h3>
                </div>

                <div className="card">
                  <div className="card-body">
                    <div className="m-sm-4">
                      <form onSubmit={this.onSubmit}>
                        <div className="form-group has-success">
                          <label>Password</label>
                          <TextFieldGroup
                            placeholder="Password"
                            name="password"
                            type="password"
                            value={this.state.password}
                            onChange={this.onChange}
                            error={errors.password}
                          />
                          <label>Confirm Password</label>

                          <TextFieldGroup
                            placeholder="Confrm Password"
                            name="password2"
                            type="password"
                            value={this.state.password2}
                            onChange={this.onChange}
                            error={errors.password2}
                          />
                        </div>
                        <div className="text-center mt-3">
                          <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                            color="primary"
                            size="lg"
                          >
                            Reset password
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
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
  resetPassword: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ resetPassword: resetPassword }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ChangePassword));
