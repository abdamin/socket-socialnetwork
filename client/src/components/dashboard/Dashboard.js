import React from "react";

import PasswordChangeForm from "./PasswordChangeForm";
import SettingsNavigation from "./SettingsNavigation";
import EditAccount from "./EditAccount";
import SocialLinks from "./SocialLinks";
import EducationForm from "./EducationForm";
import ExperienceForm from "./ExperienceForm";

class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
      settingsOption: "Account"
    ***REMOVED***
  }

  handleOptionChange = option => {
    this.setState({ settingsOption: option });
  ***REMOVED***

  render() {
    let settingsContent;

    switch (this.state.settingsOption) {
      case "Account":
        settingsContent = (
          <div className="card">
            <EditAccount />
          </div>
        );
        break;

      case "Social":
        settingsContent = (
          <div className="card">
            <SocialLinks />
          </div>
        );
        break;

      case "Education":
        settingsContent = (
          <div className="card">
            <EducationForm />
          </div>
        );
        break;

      case "Experience":
        settingsContent = (
          <div className="card">
            <ExperienceForm />
          </div>
        );
        break;
      case "Password":
        settingsContent = (
          <div className="card">
            <PasswordChangeForm />
          </div>
        );
        break;

      default:
        settingsContent = (
          <div className="card">
            <EditAccount />
          </div>
        );
    }

    return (
      <div className="container fluid p-0">
        <h1 className="h3 mb-3">Dashboard</h1>

        <div className="row">
          <div className="col-md-3 col-xl-2">
            <SettingsNavigation handleOptionChange={this.handleOptionChange} />
          </div>
          <div className="col-md-9 col-xl-10">{settingsContent}</div>
        </div>
      </div>
    );
  }
}

export default Settings;
