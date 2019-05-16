import React, { Component } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import Spinner from "../common/Spinner";
import { getPosts } from "../../actions/postActions";
import PostFeed from "./PostFeed";

class Timeline extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const { posts, loading } = this.props.post;
    let postContent;

    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = <PostFeed posts={posts} />;
    }

    return <div className="card flex-fill">{postContent}</div>;
  }
}

Timeline.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getPosts: getPosts }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timeline);
// <div className="card flex-fill">
//   <div className="card-body">

/* <div className="media">
        <img
          src={avatar5}
          style={{ width: "56px", height: "56px" }}
          className="rounded-circle mr-3"
          alt="Ashley Briggs"
        />
        <div className="media-body">
          <small className="float-right text-navy">5m ago</small>
          <p className="mb-2">
            <strong>Ashley Briggs</strong>
          </p>
          <p>
            Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem
            quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam
            quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem.
            Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut
            libero venenatis faucibus.
          </p>

          <div className="row noGutters mt-1">
            <div className="col-sm-6">
              <img src={unsplash2} className="img-fluid pr-1" alt="Unsplash" />
            </div>
            <div className="col-sm-6">
              <img src={unsplash3} className="img-fluid pl-1" alt="Unsplash" />
            </div>
          </div>

          <small className="text-muted">Today 7:51 pm</small>
          <br />
          <button className="btn btn-sm btn-danger mt-1">
            <FontAwesomeIcon icon={faHeart} fixedWidth /> Like
          </button>

          <div className="media mt-3">
            <div className="pr-2">
              <img
                src={avatar4}
                style={{ width: "36px", height: "36px" }}
                className="rounded-circle mr-2"
                alt="Stacie Hall"
              />
            </div>
            <div className="media-body">
              <p className="text-muted">
                <strong>Stacie Hall</strong>: Nam pretium turpis et arcu. Duis
                arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis,
                ipsum. Sed aliquam ultrices mauris. Integer ante arcu, accumsan
                a, consectetuer eget, posuere ut, mauris.
              </p>
            </div>
          </div>
        </div>
      </div>

      <hr />
      <div className="media">
        <img
          src={avatar1}
          style={{ width: "56px", height: "56px" }}
          className="rounded-circle mr-3"
          alt="Chris Wood"
        />
        <div className="media-body">
          <small className="float-right text-navy">30m ago</small>
          <p className="mb-2">
            <strong>Chris Wood</strong>
          </p>
          <p>
            Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem
            quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam
            quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem.
            Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut
            libero venenatis faucibus. Nullam quis ante.
          </p>
          <small className="text-muted">Today 7:21 pm</small>
          <br />
          <button className="btn btn-sm btn-danger mt-1">
            <FontAwesomeIcon icon={faHeart} fixedWidth /> Like
          </button>
        </div>
      </div>

      <hr />
      <div className="media">
        <img
          src={avatar2}
          style={{ width: "56px", height: "56px" }}
          className="rounded-circle mr-3"
          alt="Carl Jenkinsh"
        />
        <div className="media-body">
          <small className="float-right text-navy">3h ago</small>
          <p className="mb-2">
            <strong>Carl Jenkinsh</strong>
          </p>

          <img src={unsplash1} className="img-fluid" alt="Unsplash" />

          <small className="text-muted">Today 5:12 pm</small>
          <br />
          <button className="btn btn-sm btn-danger mt-1">
            <FontAwesomeIcon icon={faHeart} fixedWidth /> Like
          </button>

          <div className="media mt-3">
            <div className="pr-2">
              <img
                src={avatar4}
                style={{ width: "36px", height: "36px" }}
                className="rounded-circle mr-2"
                alt="Stacie Hall"
              />
            </div>
            <div className="media-body">
              <p className="text-muted">
                <strong>Stacie Hall</strong>: Nam pretium turpis et arcu. Duis
                arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis,
                ipsum. Sed aliquam ultrices mauris. Integer ante arcu, accumsan
                a, consectetuer eget, posuere ut, mauris.
              </p>
            </div>
          </div>
        </div>
      </div>

      <hr />
      <div className="media">
        <img
          src={avatar5}
          style={{ width: "56px", height: "56px" }}
          className="rounded-circle mr-3"
          alt="Ashley Briggs"
        />
        <div className="media-body">
          <small className="float-right text-navy">4h ago</small>
          <p className="mb-2">
            <strong>Ashley Briggs</strong>
          </p>
          <p>
            Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem
            quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam
            quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem.
            Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut
            libero venenatis faucibus. Nullam quis ante.
          </p>
          <small className="text-muted">Today 4:21 pm</small>
          <br />
          <button className="btn btn-sm btn-danger mt-1">
            <FontAwesomeIcon icon={faHeart} fixedWidth /> Like
          </button>
        </div>
      </div> */

//   </div>
// </div>
// );
