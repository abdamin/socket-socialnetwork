import React, { Component } from "react";
import Moment from "react-moment";

class activityItem extends Component {
  render() {
    let itemContent;

    console.log(this.props);

    const calendarStrings = {
      lastDay: "[Yesterday at] LT",
      sameDay: "[Today at] LT",
      nextDay: "[Tomorrow at] LT",
      lastWeek: "[last] dddd [at] LT",
      nextWeek: "dddd [at] LT",
      sameElse: "L"
    ***REMOVED***

    switch (this.props.activity.type) {
      case "JOINED":
        itemContent = (
          <div className="">
            <div className="media p-2">
              <img
                src={this.props.activity.user.avatar}
                style={{ width: "36px", height: "36px" }}
                className="rounded-circle mr-2"
                alt={this.props.activity.user.name}
              />
              <div className="media-body">
                <small className="float-right text-navy">
                  {" "}
                  <Moment fromNow>{this.props.activity.date}</Moment>
                </small>
                You <strong> Joined</strong> Devconnector
                <br />
                <small className="text-muted">
                  {" "}
                  <Moment calendar={calendarStrings}>
                    {this.props.activity.date}
                  </Moment>
                </small>
                <br />
              </div>
            </div>

            <hr />
          </div>
        );
        break;

      case "POST":
        itemContent = (
          <div className="">
            <div className="media p-2">
              <img
                src={this.props.activity.user.avatar}
                style={{ width: "36px", height: "36px" }}
                className="rounded-circle mr-2"
                alt="Chris Wood"
              />
              <div className="media-body">
                <small className="float-right text-navy">
                  <Moment fromNow>{this.props.activity.date}</Moment>
                </small>
                <strong>You</strong> posted on
                <strong> your</strong> timeline
                <br />
                <small className="text-muted">
                  {" "}
                  <Moment calendar={calendarStrings}>
                    {this.props.activity.date}
                  </Moment>
                </small>
                <div className="border text-sm text-muted p-2 mt-1">
                  {this.props.activity.detail}
                </div>
              </div>
            </div>

            <hr />
          </div>
        );
        break;

      case "EXPERIENCE":
        itemContent = (
          <div className="">
            <div className="media p-2">
              <img
                src={this.props.activity.user.avatar}
                style={{ width: "36px", height: "36px" }}
                className="rounded-circle mr-2"
                alt="Chris Wood"
              />
              <div className="media-body">
                <small className="float-right text-navy">
                  {" "}
                  <Moment fromNow>{this.props.activity.date}</Moment>
                </small>
                <strong>You</strong> added work experience at
                <strong> {this.props.activity.detail}</strong> to your profile
                <br />
                <small className="text-muted">
                  {" "}
                  <Moment calendar={calendarStrings}>
                    {this.props.activity.date}
                  </Moment>
                </small>
              </div>
            </div>

            <hr />
          </div>
        );
        break;

      case "EDUCATION":
        itemContent = (
          <div className="">
            <div className="media p-2">
              <img
                src={this.props.activity.user.avatar}
                style={{ width: "36px", height: "36px" }}
                className="rounded-circle mr-2"
                alt="Chris Wood"
              />
              <div className="media-body">
                <small className="float-right text-navy">
                  {" "}
                  <Moment fromNow>{this.props.activity.date}</Moment>
                </small>
                <strong>You</strong> added education at
                <strong> {this.props.activity.detail}</strong> to your profile
                <br />
                <small className="text-muted">
                  {" "}
                  <Moment calendar={calendarStrings}>
                    {this.props.activity.date}
                  </Moment>
                </small>
              </div>
            </div>

            <hr />
          </div>
        );
        break;
      case "IMAGE":
        itemContent = (
          <div className="">
            <div className="media p-2">
              <img
                src={this.props.activity.user.avatar}
                style={{ width: "36px", height: "36px" }}
                className="rounded-circle mr-2"
                alt="Stacie Hall"
              />
              <div className="media-body">
                <small className="float-right text-navy">
                  {" "}
                  <Moment fromNow>{this.props.activity.date}</Moment>
                </small>
                <strong>You</strong> updated your profile image
                <br />
                <small className="text-muted">
                  {" "}
                  <Moment calendar={calendarStrings}>
                    {this.props.activity.date}
                  </Moment>
                </small>
              </div>
            </div>

            <hr />
          </div>
        );
        break;

      default:
        itemContent = <div>{}</div>;
    }

    return <div>{itemContent}</div>;
  }
}

export default activityItem;