import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCurrentProfile } from "../../actions/profileActions";
import { bindActionCreators } from "redux";
import Spinner from "../../components/common/Spinner";
import Experience from "./Experience";
import Education from "./Education";

class CredentialsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.type) {
      this.setState({ type: nextProps.type });
    }
  }
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      //check if logged in user has profile data (this method check if there are keys in the object)
      if (Object.keys(profile).length > 0) {
        if (this.state.type === "education") {
          dashboardContent = (
            <div>
              <Education education={profile.education} />
              <div style={{ marginBottom: "60px" }} />
            </div>
          );
        } else {
          dashboardContent = (
            <div>
              <Experience experience={profile.experience} />
              <div style={{ marginBottom: "60px" }} />
            </div>
          );
        }
      } else {
        dashboardContent = <p>No Credentials have been added yet</p>;
      }
    }

    return <div className="dashboard">{dashboardContent}</div>;
  }
}

CredentialsTable.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getCurrentProfile: getCurrentProfile }, dispatch);
};

const mapStateToProps = state => {
  return {
    profile: state.profile,
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CredentialsTable);
