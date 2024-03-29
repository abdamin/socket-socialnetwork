import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

class Landing extends Component {
  componentDidMount() {
    //if logged in go to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center mt-7">
                <h1 style={{ color: "white" }} className="display-3 mb-4">
                  Socket
                </h1>
                <p className="lead">
                  Create a developer profile, share posts and get in touch with
                  other developers
                </p>
                <hr />
                <Link to="/register" className="btn btn-lg btn-light mr-2">
                  Sign Up
                </Link>
                <Link to="/login" className="btn btn-lg btn-outline-light">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(Landing);
