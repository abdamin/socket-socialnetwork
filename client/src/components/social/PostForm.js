import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { addPost } from "../../actions/postActions";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faLaughWink } from "@fortawesome/free-regular-svg-icons";

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      errors: {},
      showEmojis: false
    ***REMOVED***
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const { user } = this.props.profile.profile;
    const newPost = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    ***REMOVED***

    this.props.addPost(newPost);
    this.setState({ text: "", showEmojis: false });
  ***REMOVED***

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  ***REMOVED***

  addEmoji = e => {
    //console.log(e.unified)
    if (e.unified.length <= 5) {
      let emojiPic = String.fromCodePoint(`0x${e.unified}`);
      this.setState({
        text: this.state.text + emojiPic
      });
    } else {
      let sym = e.unified.split("-");
      let codesArray = [];
      sym.forEach(el => codesArray.push("0x" + el));
      //console.log(codesArray.length)
      //console.log(codesArray)  // ["0x1f3f3", "0xfe0f"]
      let emojiPic = String.fromCodePoint(...codesArray);
      this.setState({
        text: this.state.text + emojiPic
      });
    }
  ***REMOVED***

  render() {
    const { errors } = this.state;
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-light text-white">
            <h5 className="card-title">Create a post</h5>
            <h6 className="card-subtitle text-muted">Say something...</h6>
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="What's on your mind?"
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                  error={errors.text}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Share
              </button>
              <button
                type="button"
                onClick={() =>
                  this.setState({ showEmojis: !this.state.showEmojis })
                }
                className="ml-3 btn"
                style={{}}
              >
                <FontAwesomeIcon
                  icon={faLaughWink}
                  fixedWidth
                  size="lg"
                  className="mr-1"
                />
              </button>
            </form>
            {this.state.showEmojis && (
              <span>
                <Picker onSelect={this.addEmoji} />
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
***REMOVED***

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ addPost: addPost }, dispatch);
***REMOVED***
const mapStateToProps = state => {
  return {
    errors: state.errors,
    auth: state.auth,
    profile: state.profile
  ***REMOVED***
***REMOVED***

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostForm);
