import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { deleteComment } from "../../actions/postActions";
import { MoreHorizontal } from "react-feather";
import Moment from "react-moment";

class CommentItem extends Component {
  onDeleteClick = (postId, commentId) => {
    this.props.deleteComment(postId, commentId);
  };
  render() {
    const { comment, postId, auth } = this.props;

    const deleteOptions = (
      <div>
        {comment.user === auth.user.id ? (
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
                    onClick={() => this.onDeleteClick(postId, comment._id)}
                  >
                    Delete Comment
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
        <div className="card">
          {deleteOptions}
          <div className="card-body">
            <div className="media">
              <div className="pr-2">
                <img
                  src={comment.avatar}
                  style={{ width: "36px", height: "36px" }}
                  className="rounded-circle mr-2"
                  alt="Stacie Hall"
                />
              </div>
              <div className="media-body">
                <small className="float-right text-navy">
                  <Moment fromNow>{comment.date}</Moment>
                </small>
                <p className="text-muted">
                  <strong>{comment.name}</strong>: {comment.text}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ deleteComment: deleteComment }, dispatch);
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentItem);
