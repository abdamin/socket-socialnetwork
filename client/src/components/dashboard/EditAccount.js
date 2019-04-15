import React from "react";
import TextFieldGroup from "../../components/common/TextFieldGroup";
import TextAreaFieldGroup from "../../components/common/TextAreaFieldGroup";
import SelectListGroup from "../../components/common/SelectListGroup";
import { MoreHorizontal } from "react-feather";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createProfile, getCurrentProfile } from "../../actions/profileActions";
import { bindActionCreators } from "redux";
import isEmpty from "../../validation/is-empty";

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
      didSave: false
    ***REMOVED***
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
      const skillsCSV = profile.skills.join(",");

      //If profile field does not exist, make empty string
      profile.company = !isEmpty(profile.company) ? profile.company : "";
      profile.website = !isEmpty(profile.website) ? profile.website : "";
      profile.location = !isEmpty(profile.location) ? profile.location : "";
      profile.githubusername = !isEmpty(profile.githubusername)
        ? profile.githubusername
        : "";
      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";

      if (isEmpty(nextProps.errors)) {
        //Set component fields state
        this.setState({
          handle: profile.handle,
          company: profile.company,
          website: profile.website,
          location: profile.location,
          status: profile.status,
          skills: skillsCSV,
          githubusername: profile.githubusername,
          bio: profile.bio
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
    ***REMOVED***
    this.props.createProfile(profileData);
    if (isEmpty(this.props.errors)) {
      this.setState({ didSave: true });
    }
  ***REMOVED***

  onChange = e => {
    this.setState({ didSave: false });
    this.setState({ [e.target.name]: e.target.value });
  ***REMOVED***

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

    return (
      <div>
        <div className="card-header">
          <div className="card-actions float-right">
            <div className="btn-group">
              <a
                className="dropdown-toggle"
                id="dropdownMenu2"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                href="/"
              >
                <MoreHorizontal />
              </a>
              <div className="dropdown-menu dropdown-menu-right">
                <div className="dropdown-item">Action</div>
                <div className="dropdown-item">Another Action</div>
                <div className="dropdown-item">Something else here</div>
              </div>
            </div>
          </div>
          <h5 className="card-title mb-0">Public info</h5>
        </div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <div className="row">
              <div className="col-md-8">
                <div className="form-group">
                  <label htmlFor="handle">Profile Handle</label>
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
              <div className="col-md-4">
                <div className="text-center">
                  <img
                    alt="Chris Wood"
                    src={this.props.auth.user.avatar}
                    className="rounded-circle img-responsive mt-2"
                    style={{ width: "128px", height: "128px" }}
                  />
                  <div className="mt-2">
                    <button className="btn btn-primary">
                      <FontAwesomeIcon icon={faUpload} /> Upload
                    </button>
                  </div>
                  <small>
                    For best results, use an image at least 128px by 128px in
                    .jpg format
                  </small>
                </div>
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
}
EditAccount.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
***REMOVED***

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  errors: state.errors
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { createProfile: createProfile, getCurrentProfile: getCurrentProfile },
    dispatch
  );
***REMOVED***

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditAccount);
