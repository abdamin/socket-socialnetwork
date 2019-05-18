import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addEducation, getCurrentProfile } from "../../actions/profileActions";
import { bindActionCreators } from "redux";
import TextFieldGroup from "../../components/common/TextFieldGroup";
import TextAreaFieldGroup from "../../components/common/TextAreaFieldGroup";
import isEmpty from "../../validation/is-empty";
import CredentialsTable from "./CredentialsTable";

class EducationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      school: "",
      degree: "",
      fieldofstudy: "",
      from: "",
      to: "",
      current: false,
      description: "",
      errors: {},
      disabled: false,
      didSave: false
    };
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
    const educData = {
      school: this.state.school,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description,
      handle: handle
    };

    this.props.addEducation(educData, this.props.history);
    this.props.getCurrentProfile();

    this.setState({ didSave: true });
  };

  onChange = e => {
    this.setState({ didSave: false });

    this.setState({ [e.target.name]: e.target.value });
  };

  onCheck = e => {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  };
  render() {
    return (
      <div>
        <div className="card-header">
          <h5 className="card-title mb-0">Add Education</h5>
          <p>Add any school, bootcamp, etc that you have attended</p>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4">
              <form onSubmit={this.onSubmit}>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="handle">School</label>
                      <TextFieldGroup
                        placeholder="* School"
                        name="school"
                        value={this.state.school}
                        onChange={this.onChange}
                        error={this.state.errors.school}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="handle">Degree or Certification</label>
                      <TextFieldGroup
                        placeholder="* Degree or Certification"
                        name="degree"
                        value={this.state.degree}
                        onChange={this.onChange}
                        error={this.state.errors.degree}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="handle">Field of Study</label>
                      <TextFieldGroup
                        placeholder="* Field of Study"
                        name="fieldofstudy"
                        value={this.state.fieldofstudy}
                        onChange={this.onChange}
                        error={this.state.errors.fieldofstudy}
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
                      <label htmlFor="handle">Program Description</label>
                      <TextAreaFieldGroup
                        placeholder="Program Description"
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
              <h3>Your Education</h3>
              {/*This has been done just to re render the */}
              {this.state.didSave && <CredentialsTable type={"education"} />}
              {!this.state.didSave && <CredentialsTable type={"education"} />}
            </div>
          </div>
        </div>{" "}
      </div>
    );
  }
}

EducationForm.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addEducation: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { addEducation: addEducation, getCurrentProfile: getCurrentProfile },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EducationForm);
