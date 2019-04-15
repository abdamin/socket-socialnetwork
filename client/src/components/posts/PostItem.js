import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { deletePost, addLike, removeLike } from "../../actions/postActions";
import { MoreHorizontal } from "react-feather";

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
    return (
      <div>
        <div className="card">
          <div className="card-header">
            <div className="card-actions float-right">
              <div className="btn-group">
                <a
                  href="/"
                  className="dropdown-toggle"
                  id="dropdownMenu2"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
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
          </div>
          <div className="card-body">
            <div className="media">
              <img
                src={post.avatar}
                //   width="36"
                //   height="36"
                style={{ width: "40px", height: "40px" }}
                className="rounded-circle mr-2"
                alt="Ashley Briggs"
              />
              <div className="media-body">
                <small className="float-right text-navy">5m ago</small>
                <strong>{post.name}</strong> Posted <br />
                <small className="text-muted">Today 7:51 pm</small>
                <br />
                <strong>{post.text}</strong>
              </div>
            </div>
            <div className="mt-4">
              {showActions ? (
                <span>
                  {" "}
                  <button
                    onClick={() => this.onLikeClick(post._id)}
                    type="button"
                    className="btn btn-light mr-1"
                  >
                    {/* Add class to thumbs up if post was liked to ensure its not greyed out */}
                    <i
                      className={classnames("fas fa-thumbs-up", {
                        "text-info": this.findUserLike(post.likes)
                      })}
                    />
                    <span className="badge badge-light">
                      {post.likes.length}
                    </span>
                  </button>
                  <button
                    onClick={() => this.onUnlikeClick(post._id)}
                    type="button"
                    className="btn btn-light mr-1"
                  >
                    <i className="text-secondary fas fa-thumbs-down" />
                  </button>
                  <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                    Comments
                  </Link>
                  {post.user === auth.user.id ? (
                    <button
                      onClick={() => this.onDeleteClick(post._id)}
                      type="button"
                      className="btn btn-danger mr-1"
                    >
                      <i className="fas fa-times" />
                    </button>
                  ) : null}
                </span>
              ) : null}
            </div>
          </div>
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
