import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { getCurrentProfile } from "../../actions/profileActions";
import isEmpty from "../../validation/is-empty";
import { Link } from "react-router-dom";

class User extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      handle: "",
      avatar: "",
      status: ""
    ***REMOVED***
  }
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      const avatar = !isEmpty(nextProps.profile.profile)
        ? nextProps.profile.profile.user.avatar
        : "";

      const name = !isEmpty(nextProps.profile.profile)
        ? nextProps.profile.profile.user.name
        : "";
      this.setState({
        name: name,
        handle: profile.handle,
        avatar: avatar,
        status: profile.status
      });
    }
  }
  render() {
    return (
      <div className="card flex-fill mb-3">
        <div className="card-body text-center">
          <img
            src={this.state.avatar}
            alt={this.state.name}
            className="img-fluid rounded-circle mb-2"
            style={{ width: "128px", height: "128px" }}
          />
          <h5 className="card-title mb-0">{this.state.name}</h5>
          <div className="text-muted mb-2">{this.state.status}</div>

          <div>
            <Link
              to={`/profile/${this.state.handle}`}
              className="btn btn-primary btn-sm"
            >
              View Profile
            </Link>
            <Link to={"/dashboard"} className="btn btn-outline-primary btn-sm">
              Edit Profile
            </Link>{" "}
          </div>
        </div>
      </div>
    );
  }
}

User.propTypes = {
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
***REMOVED***

const mapStateToProps = state => ({
  profile: state.profile
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getCurrentProfile: getCurrentProfile }, dispatch);
***REMOVED***

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);
