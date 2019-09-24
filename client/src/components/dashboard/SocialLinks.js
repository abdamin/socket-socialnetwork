import React from "react";
import InputGroup from "../../components/common/InputGroup";
import {
  createProfile,
  getCurrentProfile,
  createSocialLinks
} from "../../actions/profileActions";
import { bindActionCreators } from "redux";
import isEmpty from "../../validation/is-empty";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class SocialLinks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      didSave: false,
      twitter: "",
      facebook: "",
      linkedin: "",
      youtube: "",
      instagram: "",
      errors: {}
    };
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    //console.log(nextProps);
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : "";
      profile.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : "";
      profile.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : "";
      profile.linkedin = !isEmpty(profile.social.linkedin)
        ? profile.social.linkedin
        : "";
      profile.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : "";

      //Set component fields state
      this.setState({
        twitter: profile.twitter,
        facebook: profile.facebook,
        linkedin: profile.linkedin,
        youtube: profile.youtube,
        instagram: profile.instagram
      });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const profileData = {
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };

    this.props.createSocialLinks(profileData);
    if (isEmpty(this.props.errors)) {
      this.setState({ didSave: true });
    }
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <div className="card-header">
          <h5 className="card-title mb-0">Add Social Network Links</h5>
        </div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <InputGroup
              placeholder="Twitter Profile URL"
              name="twitter"
              icon="fab fa-twitter"
              value={this.state.twitter}
              onChange={this.onChange}
              error={this.state.errors.twitter}
            />
            <InputGroup
              placeholder="Facebook Profile URL"
              name="facebook"
              icon="fab fa-facebook"
              value={this.state.facebook}
              onChange={this.onChange}
              error={this.state.errors.facebook}
            />
            <InputGroup
              placeholder="Youtube Profile URL"
              name="youtube"
              icon="fab fa-youtube"
              value={this.state.youtube}
              onChange={this.onChange}
              error={this.state.errors.youtube}
            />
            <InputGroup
              placeholder="Linkedin Profile URL"
              name="linkedin"
              icon="fab fa-linkedin"
              value={this.state.linkedin}
              onChange={this.onChange}
              error={this.state.errors.linkedin}
            />
            <InputGroup
              placeholder="Instagram Profile URL"
              name="instagram"
              icon="fab fa-instagram"
              value={this.state.instagram}
              onChange={this.onChange}
              error={this.state.errors.instagram}
            />
            <div className="row">
              <div className="col-md-4">
                <button type="submit" className="btn btn-primary">
                  Save changes
                </button>
              </div>
              <div className="col-md-6">
                {isEmpty(this.state.errors) && this.state.didSave && (
                  <p
                    style={{
                      width: "100%",
                      color: "#5fc27e"
                    }}
                  >
                    Changes saved
                  </p>
                )}
                {!isEmpty(this.state.errors) && (
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

SocialLinks.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  errors: state.errors
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      createProfile: createProfile,
      getCurrentProfile: getCurrentProfile,
      createSocialLinks: createSocialLinks
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SocialLinks);
