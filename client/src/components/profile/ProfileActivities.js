import React, { Component } from "react";
import ActivityItem from "../social/activityItem";

import { MoreHorizontal } from "react-feather";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import { faHeart } from "@fortawesome/free-regular-svg-icons";

// import avatar1 from "../avatars/avatar.jpg";
// import avatar2 from "../avatars/avatar-2.jpg";
// import avatar4 from "../avatars/avatar-4.jpg";
// import avatar5 from "../avatars/avatar-5.jpg";

// import unsplash1 from "../../img/unsplash-1.jpg";
// import unsplash2 from "../../img/unsplash-2.jpg";

class ProfileActivities extends Component {
  render() {
    const { activities } = this.props;
    return (
      <div>
        <Activities activities={activities} />
      </div>
    );
  }
}

const Activities = ({ activities }) => {
  let activityItems = activities.map(activity => {
    return (
      <ActivityItem
        page={"PROFILE_PAGE"}
        key={activity._id}
        activity={activity}
        type={activity.type}
      />
    );
  });
  return (
    <div className="card">
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
        <h5 className="card-title mb-0">Activities</h5>
      </div>
      <div className="card-body">
        {activityItems}

        {/* <div className="media">
          <img
            src={avatar5}
            style={{ width: "40px", height: "40px" }}
            className="rounded-circle mr-2"
            alt="Ashley Briggs"
          />
          <div className="media-body">
            <small className="float-right text-navy">5m ago</small>
            <strong>Ashley Briggs</strong> started following{" "}
            <strong>{profile.user.name}</strong>
            <br />
            <small className="text-muted">Today 7:51 pm</small>
            <br />
          </div>
        </div>

        <hr />
        <div className="media">
          <img
            src={profile.user.avatar}
            style={{ width: "40px", height: "40px" }}
            className="rounded-circle mr-2"
            alt={profile.user.name}
          />
          <div className="media-body">
            <small className="float-right text-navy">5m ago</small>
            <strong>{profile.user.name}</strong> Posted <br />
            <small className="text-muted">Today 7:51 pm</small>
            <br />
            <strong>Hi Everyone!</strong>
          </div>
        </div>

        <hr />
        <div className="media">
          <img
            src={avatar1}
            style={{ width: "40px", height: "40px" }}
            className="rounded-circle mr-2"
            alt="Chris Wood"
          />
          <div className="media-body">
            <small className="float-right text-navy">30m ago</small>
            <strong>Chris Wood</strong> posted something on{" "}
            <strong>{profile.user.name}</strong>'s timeline
            <br />
            <small className="text-muted">Today 7:21 pm</small>
            <div className="border text-sm text-muted p-2 mt-1">
              Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus,
              sem quam semper libero, sit amet adipiscing sem neque sed ipsum.
              Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem.
              Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut
              libero venenatis faucibus. Nullam quis ante.
            </div>
            <button className="btn btn-danger btn-sm mt-1">
              <FontAwesomeIcon icon={faHeart} fixedWidth /> Like
            </button>
          </div>
        </div>

        <hr />
        <div className="media">
          <img
            src={profile.user.avatar}
            style={{ width: "40px", height: "40px" }}
            className="rounded-circle mr-2"
            alt="Stacie Hall"
          />
          <div className="media-body">
            <small className="float-right text-navy">1h ago</small>
            <strong>{profile.user.name}</strong> posted a new blog
            <br />
            <small className="text-muted">Today 6:35 pm</small>
          </div>
        </div>

        <hr />
        <div className="media">
          <img
            src={avatar2}
            style={{ width: "40px", height: "40px" }}
            className="rounded-circle mr-2"
            alt="Carl Jenkins"
          />
          <div className="media-body">
            <small className="float-right text-navy">3h ago</small>
            <strong>Carl Jenkins</strong> posted two photos on{" "}
            <strong>{profile.user.name}</strong>'s timeline
            <br />
            <small className="text-muted">Today 5:12 pm</small>
            <div className="row no-gutters mt-1">
              <div className="col-6 col-md-4 col-lg-4 col-xl-3">
                <img
                  src={unsplash1}
                  className="img-fluid pr-2"
                  alt="Unsplash"
                />
              </div>
              <div className="col-6 col-md-4 col-lg-4 col-xl-3">
                <img
                  src={unsplash2}
                  className="img-fluid pr-2"
                  alt="Unsplash"
                />
              </div>
            </div>
            <button className="btn btn-danger btn-sm mt-1">
              <FontAwesomeIcon icon={faHeart} fixedWidth /> Like
            </button>
          </div>
        </div>

        <hr />
        <div className="media">
          <img
            src={avatar2}
            style={{ width: "40px", height: "40px" }}
            className="rounded-circle mr-2"
            alt="Carl Jenkins"
          />
          <div className="media-body">
            <small className="float-right text-navy">1d ago</small>
            <strong>Carl Jenkins</strong> started following{" "}
            <strong>{profile.user.name}</strong>
            <br />
            <small className="text-muted">Yesterday 3:12 pm</small>
            <div className="media mt-1">
              <img
                src={avatar4}
                //   width="36"
                //   height="36"
                style={{ width: "40px", height: "40px" }}
                className="rounded-circle mr-2"
                alt="Stacie Hall"
              />
              <div className="media-body pl-3">
                <div className="border text-sm text-muted p-2 mt-1">
                  Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id,
                  lorem. Maecenas nec odio et ante tincidunt tempus.
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr />
        <div className="media">
          <img
            src={profile.user.avatar}
            style={{ width: "40px", height: "40px" }}
            className="rounded-circle mr-2"
            alt="Stacie Hall"
          />
          <div className="media-body">
            <small className="float-right text-navy">1d ago</small>
            <strong>{profile.user.name}</strong> posted a new blog
            <br />
            <small className="text-muted">Yesterday 2:43 pm</small>
          </div>
        </div>

        <hr />
        <div className="media">
          <img
            src={avatar1}
            style={{ width: "40px", height: "40px" }}
            className="rounded-circle mr-2"
            alt="Chris Wood"
          />
          <div className="media-body">
            <small className="float-right text-navy">1d ago</small>
            <strong>Chris Wood</strong> started following{" "}
            <strong>{profile.user.name}</strong>
            <br />
            <small className="text-muted">Yesterdag 1:51 pm</small>
          </div>
        </div>

        <hr />
        <button className="btn btn-primary btn-block">Load more</button> */}
      </div>
    </div>
  );
***REMOVED***

export default ProfileActivities;
