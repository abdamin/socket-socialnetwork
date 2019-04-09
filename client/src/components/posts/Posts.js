import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import PostFrom from "./PostForm";
import Spinner from "../common/Spinner";
import { getPosts } from "../../actions/postActions";
import PostFeed from "./PostFeed";

class Posts extends Component {
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

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostFrom />
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired
***REMOVED***

const mapStateToProps = state => ({
  post: state.post
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getPosts: getPosts }, dispatch);
***REMOVED***

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts);
