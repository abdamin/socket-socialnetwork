import React from "react";

// import avatar1 from "../../avatars/avatar.jpg";

// import unsplash1 from "../../img/unsplash-1.jpg";
// import unsplash2 from "../../img/unsplash-2.jpg";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import isEmpty from "../../validation/is-empty";
import { getActivities } from "../../actions/activityActions";
import { bindActionCreators } from "redux";
import Spinner from "../common/Spinner";
import ActivityItem from "./activityItem";

class Activities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      if (nextProps.profile.profile) {
        if (nextProps.profile.profile._id !== this.state._id) {
          this.setState({ _id: nextProps.profile.profile._id });
          this.props.getActivities(nextProps.profile.profile._id);
        }
      }
    }
  }
  // componentDidMount() {
  //   this.props.getActivities(this.state.handle);
  // }
  render() {
    const handle = !isEmpty(this.props.profile.profile)
      ? this.props.profile.profile.handle
      : "";

    // const activityContent = this.props.activity.loading ? (
    //   <Spinner />
    // ) : (
    //   <div className="card flex-fill mb-3">
    //     <div className="card-header">
    //       <div className="card-actions float-right" />
    //       <h5 className="card-title mb-0">Recent Activities</h5>
    //     </div>
    //     <div className="card-body">
    //       <div className="media">
    //         <img
    //           src={avatar1}
    //           style={{ width: "36px", height: "36px" }}
    //           className="rounded-circle mr-2"
    //           alt="Ashley Briggs"
    //         />
    //         <div className="media-body">
    //           <small className="float-right text-navy">5m ago</small>
    //           <strong>Ashley Briggs</strong> started following{" "}
    //           <strong>Stacie Hall</strong>
    //           <br />
    //           <small className="text-muted">Today 7:51 pm</small>
    //           <br />
    //         </div>
    //       </div>

    //       <hr />
    //       <div className="media">
    //         <img
    //           src={avatar1}
    //           style={{ width: "36px", height: "36px" }}
    //           className="rounded-circle mr-2"
    //           alt="Chris Wood"
    //         />
    //         <div className="media-body">
    //           <small className="float-right text-navy">30m ago</small>
    //           <strong>Chris Wood</strong> posted something on{" "}
    //           <strong>Stacie Hall</strong>'s timeline
    //           <br />
    //           <small className="text-muted">Today 7:21 pm</small>
    //           <div className="border text-sm text-muted p-2 mt-1">
    //             Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus,
    //             sem quam..
    //           </div>
    //         </div>
    //       </div>

    //       <hr />
    //       <div className="media">
    //         <img
    //           src={avatar1}
    //           style={{ width: "36px", height: "36px" }}
    //           className="rounded-circle mr-2"
    //           alt="Stacie Hall"
    //         />
    //         <div className="media-body">
    //           <small className="float-right text-navy">1h ago</small>
    //           <strong>Stacie Hall</strong> posted a new blog
    //           <br />
    //           <small className="text-muted">Today 6:35 pm</small>
    //         </div>
    //       </div>

    //       <hr />
    //       <div className="media">
    //         <img
    //           src={avatar1}
    //           style={{ width: "36px", height: "36px" }}
    //           className="rounded-circle mr-2"
    //           alt="Carl Jenkins"
    //         />
    //         <div className="media-body">
    //           <small className="float-right text-navy">3h ago</small>
    //           <strong>Carl Jenkins</strong> posted two photos on{" "}
    //           <strong>Stacie Hall</strong>'s timeline
    //           <br />
    //           <small className="text-muted">Today 5:12 pm</small>
    //           <div className="row no-gutters mt-1">
    //             <div className="col-6 col-md-4 col-lg-4 col-xl-3">
    //               <img
    //                 src={unsplash1}
    //                 className="img-fluid pr-2"
    //                 alt="Unsplash"
    //               />
    //             </div>
    //             <div className="col-6 col-md-4 col-lg-4 col-xl-3">
    //               <img
    //                 src={unsplash2}
    //                 className="img-fluid pr-2"
    //                 alt="Unsplash"
    //               />
    //             </div>
    //           </div>
    //         </div>
    //       </div>

    //       <hr />
    //       <div className="media">
    //         <img
    //           src={avatar1}
    //           style={{ width: "36px", height: "36px" }}
    //           className="rounded-circle mr-2"
    //           alt="Stacie Hall"
    //         />
    //         <div className="media-body">
    //           <small className="float-right text-navy">1d ago</small>
    //           <strong>Stacie Hall</strong> posted a new blog
    //           <br />
    //           <small className="text-muted">Yesterday 2:43 pm</small>
    //         </div>
    //       </div>

    //       <hr />
    //       <div className="media">
    //         <img
    //           src={avatar1}
    //           style={{ width: "36px", height: "36px" }}
    //           className="rounded-circle mr-2"
    //           alt="Chris Wood"
    //         />
    //         <div className="media-body">
    //           <small className="float-right text-navy">1d ago</small>
    //           <strong>Chris Wood</strong> started following{" "}
    //           <strong>Stacie Hall</strong>
    //           <br />
    //           <small className="text-muted">Yesterdag 1:51 pm</small>
    //         </div>
    //       </div>

    //       <hr />
    //       <Link
    //         to={`/profile/${handle}`}
    //         className="btn btn-primary btn-block"
    //         color="primary"
    //       >
    //         View All
    //       </Link>
    //     </div>
    //   </div>
    // );

    const { activities, loading } = this.props.activity;

    let activityItems;

    if (activities === null || loading) {
      activityItems = <Spinner />;
    } else {
      if (activities.length > 0) {
        const shortlistedActivities = activities.slice(0, 5);
        activityItems = shortlistedActivities.map(activity => {
          return (
            <ActivityItem
              key={activity._id}
              activity={activity}
              type={activity.type}
            />
          );
        });
      }
    }

    return (
      <div className="">
        <div className="card flex-fill mb-3">
          <div className="card-header">
            <div className="card-actions float-right" />
            <h5 className="card-title mb-0">Recent Activities</h5>
          </div>
          <div className="card-body" />
          <div className="">{activityItems}</div>
          <Link
            to={`/profile/${handle}`}
            className="btn btn-primary btn-block"
            color="primary"
          >
            View All
          </Link>
        </div>
      </div>
    );
  }
}

Activities.propTypes = {
  profile: PropTypes.object.isRequired,
  activity: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  activity: state.activity
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getActivities: getActivities }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Activities);
