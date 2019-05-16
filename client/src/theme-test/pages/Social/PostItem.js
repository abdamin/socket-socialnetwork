import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { deletePost, addLike, removeLike } from "../../../actions/postActions";
import { MoreHorizontal } from "react-feather";
import Moment from "react-moment";

class PostItem extends Component {
  onDeleteClick = postId => {
    this.props.deletePost(postId);
  };

  onLikeClick = postId => {
    this.props.addLike(postId);
  };
  onUnlikeClick = postId => {
    this.props.removeLike(postId);
  };

  findUserLike = likes => {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    const { post, auth, showActions } = this.props;

    const deleteOptions = (
      <div>
        {post.user === auth.user.id ? (
          <div className="mr-4 pt-0">
            <div className="card-actions float-right">
              <div className="btn-group">
                <a
                  href="/"
                  id="dropdownMenu2"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <MoreHorizontal />
                </a>
                <div className="dropdown-menu dropdown-menu-right">
                  <button
                    className="dropdown-item"
                    onClick={() => this.onDeleteClick(post._id)}
                  >
                    Delete Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );

    return (
      <div>
        {deleteOptions}
        <div className="card-body">
          <div className="media">
            <img
              src={post.avatar}
              style={{ width: "40px", height: "40px" }}
              className="rounded-circle mr-2"
              alt="Ashley Briggs"
            />
            <div className="media-body">
              <small className="float-right text-navy">
                <Moment fromNow>{post.date}</Moment>
              </small>
              <p>
                {" "}
                <strong>{post.name}</strong> posted
              </p>

              <p>
                <strong>{post.text}</strong>{" "}
              </p>
            </div>
          </div>
          <div className="mt-4">
            {showActions ? (
              <span>
                {" "}
                <button
                  onClick={() => this.onLikeClick(post._id)}
                  type="button"
                  className="btn btn-light btn-sm mr-1 mt-1"
                >
                  {/* Add class to thumbs up if post was liked to ensure its not greyed out */}
                  <i
                    className={classnames("fas fa-thumbs-up", {
                      "text-info": this.findUserLike(post.likes)
                    })}
                  />
                  <span className="badge badge-dark">{post.likes.length}</span>
                </button>
                <button
                  onClick={() => this.onUnlikeClick(post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i className="text-secondary fas fa-thumbs-down" />
                </button>
                <Link
                  to={`/post/${post._id}`}
                  className="btn btn-primary btn-sm mr-1"
                >
                  Comments
                </Link>
              </span>
            ) : null}
          </div>
          <hr />
        </div>
      </div>
    );
  }
}

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { deletePost: deletePost, addLike: addLike, removeLike: removeLike },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostItem);
