import React from "react";
import TextFieldGroup from "../../components/common/TextFieldGroup";
import TextAreaFieldGroup from "../../components/common/TextAreaFieldGroup";
import SelectListGroup from "../../components/common/SelectListGroup";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createProfile, getCurrentProfile } from "../../actions/profileActions";
import { updateAvatar } from "../../actions/authActions";

import { bindActionCreators } from "redux";
import isEmpty from "../../validation/is-empty";
import axios from "axios";
import Spinner from "../common/Spinner";

const PLACEHOLDERURL =
  "https://res.cloudinary.com/dxemu0gku/image/upload/v1557829466/avatar-placeholder_knb8nt.gif";

class EditAccount extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      githubusername: "",
      bio: "",
      errors: {},
      didSave: false,
      avatar: "",
      selectedImage: null,
      imageErrors: {},
      changingImage: false,
      saveClicked: true
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

      //bring skills array back to CSV
      const skillsCSV = !isEmpty(profile.skills)
        ? profile.skills.join(",")
        : "";

      const avatar = !isEmpty(nextProps.profile.profile)
        ? nextProps.profile.profile.user.avatar
        : "";

      //If profile field does not exist, make empty string
      profile.company = !isEmpty(profile.company) ? profile.company : "";
      profile.website = !isEmpty(profile.website) ? profile.website : "";
      profile.location = !isEmpty(profile.location) ? profile.location : "";
      profile.githubusername = !isEmpty(profile.githubusername)
        ? profile.githubusername
        : "";
      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";

      if (isEmpty(nextProps.errors) && this.state.saveClicked) {
        //Set component fields state
        this.setState({
          handle: profile.handle,
          company: profile.company,
          website: profile.website,
          location: profile.location,
          status: profile.status,
          skills: skillsCSV,
          githubusername: profile.githubusername,
          bio: profile.bio,
          avatar: avatar
        });
      }
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio
    };
    this.props.createProfile(profileData);
    if (isEmpty(this.props.errors)) {
      this.setState({ didSave: true });
    }
  };

  onChange = e => {
    this.setState({ didSave: false });
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ saveClicked: false });
  };

  onImageChange = e => {
    this.setState({
      selectedImage: e.target.files[0],
      avatar: URL.createObjectURL(e.target.files[0])
    });
  };
  uploadImage = () => {
    const formData = new FormData();
    formData.append("image", this.state.selectedImage);
    formData.append("handle", this.state.handle);
    this.setState({ changingImage: true });

    axios
      .post("/api/profile/uploadProfileImage", formData)
      .then(res => {
        this.setState({ changingImage: false });
        this.props.updateAvatar(res.avatarUrl);
        window.location.reload();
      })
      .catch(err => {
        this.setState({
          imageErrors: err.response.data,
          changingImage: false
        });
        console.log(err.response.data);
      });
  };

  removeImage = () => {
    this.setState({ changingImage: true });
    axios
      .post("/api/profile/removeProfileImage")
      .then(res => {
        this.setState({ changingImage: false });
        window.location.reload();
      })
      .catch(err => {
        this.setState({
          imageErrors: err.response.data,
          changingImage: false
        });
      });
  };

  render() {
    //select options for status
    const options = [
      { label: "* Select Professional Status", value: 0 },
      { label: "Developer", value: "Developer" },
      { label: "Junior Developer", value: "Junior Developer" },
      { label: "Senior Developer", value: "Senior Developer" },
      { label: "Manager", value: "Manager" },
      { label: "Student or Learning", value: "Student or Learning" },
      { label: "Instructor or Teacher", value: "Instructor or Teacher" },
      { label: "Intern", value: "Intern" },
      { label: "Other", value: "Other" }
    ];

    /*image upload options*/
    const uploadOptions = (
      <div>
        <input
          type="file"
          className="btn btn-primary"
          onChange={this.onImageChange}
        />

        {this.state.selectedImage && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.uploadImage}
          >
            <FontAwesomeIcon icon={faUpload} /> Upload
          </button>
        )}
        <div>
          {!isEmpty(this.state.imageErrors) && (
            <p
              style={{
                width: "100%",
                color: "#f44455"
              }}
            >
              {this.state.imageErrors.error}
            </p>
          )}
        </div>
      </div>
    );

    const { profile, loading } = this.props.profile;
    let dashboardContent;
    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      dashboardContent = (
        <div>
          <div className="card-header">
            <h5 className="card-title mb-0">Public info</h5>
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="row">
                <div className="col-md-8">
                  <div className="form-group">
                    <label htmlFor="handle">Profile Handle</label>
                    <a
                      className="ml-2"
                      href={`http://localhost:3000/profile/${
                        this.state.handle
                      }`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {`http://localhost:3000/profile/${this.state.handle}`}
                    </a>
                    <TextFieldGroup
                      placeholder="* Profile Handle"
                      name="handle"
                      value={this.state.handle}
                      onChange={this.onChange}
                      error={this.state.errors.handle}
                      info="A unique handle for your profile URL. Your full name, company name, nickname, etc"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="bio">Biography</label>
                    <TextAreaFieldGroup
                      placeholder="Short Bio"
                      name="bio"
                      value={this.state.bio}
                      onChange={this.onChange}
                      error={this.state.errors.bio}
                      info="Tell us a little about yourself"
                    />
                  </div>
                </div>
                <div className="col-md-3 p-0 m-0">
                  <div className="text-center">
                    <img
                      alt={this.props.auth.user.name}
                      src={this.state.avatar}
                      className="rounded-circle img-responsive mt-2"
                      style={{ width: "128px", height: "128px" }}
                    />

                    <div className="mt-2">
                      {this.state.changingImage ? <Spinner /> : uploadOptions}
                    </div>

                    <small>
                      For best results, use an image at least 128px by 128px in
                      .jpg format
                    </small>
                  </div>
                </div>
                <div className="col-md-1 p-0 m-0">
                  {this.state.avatar !== PLACEHOLDERURL &&
                    !this.state.changingImage && (
                      <button
                        type="button"
                        className="btn btn-danger btn-secondary btn-sm"
                        onClick={this.removeImage}
                      >
                        {/* <FontAwesomeIcon icon={faUpload} /> Remove */}
                        Remove
                      </button>
                    )}
                </div>
              </div>

              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="status">Status</label>
                      <SelectListGroup
                        placeholder="* Status"
                        name="status"
                        value={this.state.status}
                        onChange={this.onChange}
                        options={options}
                        error={this.state.errors.status}
                        info="Give us an idea of where you are at in your career"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="website">Website</label>
                      <TextFieldGroup
                        placeholder="Website"
                        name="website"
                        value={this.state.website}
                        onChange={this.onChange}
                        error={this.state.errors.website}
                        info="Could be your own website or company one"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="skills">Skills</label>
                  <TextFieldGroup
                    placeholder="Skills"
                    name="skills"
                    value={this.state.skills}
                    onChange={this.onChange}
                    error={this.state.errors.skills}
                    info="Please use comma separated values (eg. HTML,CSS,JavaScript,PHP) "
                  />
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="company">Company</label>
                      <TextFieldGroup
                        placeholder="Company"
                        name="company"
                        value={this.state.company}
                        onChange={this.onChange}
                        error={this.state.errors.company}
                        info="Could be your own company or one you work for"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="githubusername">Github Username</label>
                      <TextFieldGroup
                        placeholder="Github Username"
                        name="githubusername"
                        value={this.state.githubusername}
                        onChange={this.onChange}
                        error={this.state.errors.githubusername}
                        info="If you want your latest repos and a Github link, include your github username"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="location">Location</label>
                      <TextFieldGroup
                        placeholder="Location"
                        name="location"
                        value={this.state.location}
                        onChange={this.onChange}
                        error={this.state.errors.location}
                        info="City or city & state suggested (eg. Toronto, ON)"
                      />
                    </div>
                  </div>
                </div>
              </div>
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

    return <div className="">{dashboardContent}</div>;
  }
}
EditAccount.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  updateAvatar: PropTypes.func.isRequired
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
      updateAvatar
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditAccount);
