import React, { Component } from "react";
import Timeline from "./Timeline";
import User from "./User";
import Suggestions from "./Suggestions";
import PostForm from "./PostForm";

class Social extends Component {
  render() {
    return (
      <div className="container p-0">
        <div className="row">
          <div className="col-md-8">
            <PostForm />
            <Timeline />
          </div>
          <div className="col-md-4">
            <User />
            <Suggestions />
          </div>
        </div>
      </div>
    );
  }
}

export default Social;
