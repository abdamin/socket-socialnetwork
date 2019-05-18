import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addExperience, getCurrentProfile } from "../../actions/profileActions";
import { bindActionCreators } from "redux";
import TextFieldGroup from "../../components/common/TextFieldGroup";
import TextAreaFieldGroup from "../../components/common/TextAreaFieldGroup";
import isEmpty from "../../validation/is-empty";
import CredentialsTable from "./CredentialsTable";

class ExperienceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      company: "",
      title: "",
      location: "",
      from: "",
      to: "",
      current: false,
      description: "",
      errors: {},
      disabled: false,
      didSave: false
    ***REMOVED***
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onSubmit = e => {
    e.preventDefault();

    //this is added to for the activites document
    const handle = this.props.profile.profile
      ? this.props.profile.profile.handle
      : "";
    const expData = {
      company: this.state.company,
      title: this.state.title,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description,
      handle: handle
    ***REMOVED***

    this.props.addExperience(expData);
    this.props.getCurrentProfile();
    this.setState({ didSave: true });
  ***REMOVED***

  onChange = e => {
    this.setState({ didSave: false });

    this.setState({ [e.target.name]: e.target.value });
  ***REMOVED***

  onCheck = e => {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  ***REMOVED***
  render() {
    return (
      <div>
        <div className="card-header">
          <h5 className="card-title mb-0">Add Experience</h5>
          <p>
            Add any job or position that you have had in the past or current
          </p>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4">
              <form onSubmit={this.onSubmit}>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="handle">Company</label>
                      <TextFieldGroup
                        placeholder="* Company"
                        name="company"
                        value={this.state.company}
                        onChange={this.onChange}
                        error={this.state.errors.company}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="handle">Job Title</label>
                      <TextFieldGroup
                        placeholder="* Job Title"
                        name="title"
                        value={this.state.title}
                        onChange={this.onChange}
                        error={this.state.errors.titles}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="handle">Location</label>
                      <TextFieldGroup
                        placeholder="* Location"
                        name="location"
                        value={this.state.location}
                        onChange={this.onChange}
                        error={this.state.errors.location}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="handle">From Date</label>
                      <TextFieldGroup
                        name="from"
                        type="date"
                        value={this.state.from}
                        onChange={this.onChange}
                        error={this.state.errors.from}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="handle">To Date</label>
                      <TextFieldGroup
                        name="to"
                        type="date"
                        value={this.state.to}
                        onChange={this.onChange}
                        error={this.state.errors.to}
                        disabled={this.state.disabled ? "disabled" : ""}
                      />
                      <div className="form-check mb-12">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="current"
                          value={this.state.current}
                          checked={this.state.current}
                          onChange={this.onCheck}
                          id="current"
                        />
                        <label htmlFor="current" className="form-check-label">
                          Current Job
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="handle">Job Description</label>
                      <TextAreaFieldGroup
                        placeholder="Job Description"
                        name="description"
                        value={this.state.description}
                        onChange={this.onChange}
                        error={this.state.errors.description}
                        info="Tell us about the program that you were in"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <button type="submit" className="btn btn-primary">
                      Add Education
                    </button>
                  </div>
                  <div className="col-md-12">
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
            <div className="col-md-8">
              <h3>Your Experience</h3>
              {/*This has been done just to re render the table whenever something is added */}
              {this.state.didSave && <CredentialsTable type={"experience"} />}
              {!this.state.didSave && (
                <CredentialsTable type={"experience"} />
              )}{" "}
            </div>
          </div>
        </div>{" "}
      </div>
    );
  }
}

ExperienceForm.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addExperience: PropTypes.func.isRequired
***REMOVED***

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { addExperience: addExperience, getCurrentProfile: getCurrentProfile },
    dispatch
  );
***REMOVED***

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExperienceForm);
