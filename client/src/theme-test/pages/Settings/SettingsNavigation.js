import React from "react";
import classnames from "classnames";

class SettingsNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenLink: "Account"
    ***REMOVED***
  }

  handleOptionClick = option => {
    this.props.handleOptionChange(option);
    this.setState({ chosenLink: option });
  ***REMOVED***

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
          <button className="btn btn-danger ">Delete account</button>
        </div>
      </div>
    );
  }
}

export default SettingsNavigation;
