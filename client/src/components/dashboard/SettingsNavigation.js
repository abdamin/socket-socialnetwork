import React from "react";
import classnames from "classnames";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteAccount, clearErrors } from "../../actions/profileActions";
import { bindActionCreators } from "redux";
import isEmpty from "../../validation/is-empty";

class SettingsNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenLink: "Account"
    };
  }
  onDeleteClick = e => {
    this.props.deleteAccount();
  };

  handleOptionClick = option => {
    this.props.handleOptionChange(option);
    this.setState({ chosenLink: option });
    if (!isEmpty(this.props.errors)) {
      this.props.clearErrors();
    }
  };

  render() {
    return (
      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">Profile Settings</h5>
        </div>
        <div className="list-group list-group-flush">
          <button
            onClick={() => this.handleOptionClick("Account")}
            className={classnames(
              "list-group-item list-group-item-action",
              this.state.chosenLink === "Account" && {
                active: "active"
              }
            )}
          >
            Account
          </button>

          <button
            name="Social"
            onClick={() => this.handleOptionClick("Social")}
            className={classnames(
              "list-group-item list-group-item-action",
              this.state.chosenLink === "Social" && {
                active: "active"
              }
            )}
          >
            Social Network Links
          </button>
          <button
            onClick={() => this.handleOptionClick("Education")}
            className={classnames(
              "list-group-item list-group-item-action",
              this.state.chosenLink === "Education" && {
                active: "active"
              }
            )}
          >
            Education
          </button>
          <button
            onClick={() => this.handleOptionClick("Experience")}
            className={classnames(
              "list-group-item list-group-item-action",
              this.state.chosenLink === "Experience" && {
                active: "active"
              }
            )}
          >
            Experience
          </button>
          <button className="list-group-item list-group-item-action">
            Project Porfolio
          </button>
          <button
            onClick={() => this.handleOptionClick("Password")}
            className={classnames(
              "list-group-item list-group-item-action",
              this.state.chosenLink === "Password" && {
                active: "active"
              }
            )}
          >
            Password
          </button>
          <button onClick={this.onDeleteClick} className="btn btn-danger ">
            Delete account
          </button>
        </div>
      </div>
    );
  }
}

SettingsNavigation.propTypes = {
  deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { deleteAccount: deleteAccount, clearErrors: clearErrors },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsNavigation);
