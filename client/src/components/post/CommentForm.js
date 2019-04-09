import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { addComment } from "../../actions/postActions";

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      errors: {}
    ***REMOVED***
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const { user } = this.props.auth;
    const { postId } = this.props;

    const newComment = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    ***REMOVED***

    this.props.addComment(postId, newComment);
    this.setState({ text: "" });
  ***REMOVED***

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  ***REMOVED***

  render() {
    const { errors } = this.state;
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">
            Make a comment...
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Reply to post"
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                  error={errors.text}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired
***REMOVED***

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ addComment: addComment }, dispatch);
***REMOVED***
const mapStateToProps = state => {
  return {
    errors: state.errors,
    auth: state.auth
  ***REMOVED***
***REMOVED***

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentForm);
