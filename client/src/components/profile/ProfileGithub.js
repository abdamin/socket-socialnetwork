import React, { Component } from "react";
// import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";

class ProfileGithub extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clientId: "2f0a8e7c64ce1310d9ed",
      clientSecret: "ae02f1d97e3f15a733e3b1bbff4a84089db7da9f",
      count: 5,
      sort: "created: asc",
      repos: []
    ***REMOVED***
  }

  componentDidMount() {
    const { username } = this.props;
    // const { count, sort, clientId, clientSecret } = this.state;

    // fetch(
    //   `https://api.github.com/user/${username}/repos?per_page${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
    // )
    //   .then(res => res.json())
    //   .then(data => {
    //     if (this.refs.myRef) {
    //       this.setState({ repos: data });
    //       // console.log(this.state);
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     //this.setState({ repos: [] });
    //   });

    axios
      .get(`https://api.github.com/users/${username}/repos`)
      .then(resp => {
        this.setState({ repos: resp.data });
      })
      .catch(err => console.log(err));
  }
  render() {
    let { repos } = this.state;
    //take the latest 5 repos
    repos = repos.slice(0, 5);
    console.log(repos);
    const repoItems = repos.map(repo => (
      <div key={repo.id} className="card card-body mb-2">
        <div className="row">
          <div className="col-md-6">
            <h4>
              <a
                href={repo.html_url}
                className="text-info"
                target="_blank"
                rel="noopener noreferrer"
              >
                {repo.name}
              </a>
            </h4>
            <p>{repo.description}</p>
          </div>
          <div className="col-md-6">
            <span className="badge badge-info mr-1">
              Stars: {repo.stargazers_count}
            </span>
            <span className="badge badge-secondary mr-1">
              Watchers: {repo.watchers_count}
            </span>
            <span className="badge badge-success">
              Forks: {repo.forks_count}
            </span>
          </div>
        </div>
      </div>
    ));
    return (
      <div>
        <hr />
        <h3 className="mb-4">Latest Github Repos</h3>
        {repoItems}
      </div>
    );
  }
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired
***REMOVED***
export default ProfileGithub;
