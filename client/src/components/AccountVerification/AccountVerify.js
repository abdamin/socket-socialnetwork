import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class AccountVerify extends React.Component {
  constructor() {
    super();
    this.state = {
      response: "",
      isVerified: false
    };
  }

  componentDidMount() {
    //if logged-in go to dashboard: TODO BY ADDING REDUX

    const token = this.props.match.params.token;
    axios
      .get(`/api/confirmation/${token}`)
      .then(res => {
        this.setState({ isVerified: true });
      })
      .catch(err => {
        this.setState({ response: err.response.data.response });
      });
  }

  render() {
    const { response, isVerified } = this.state;
    console.log(response);
    if (isVerified) {
      return (
        <div className="login">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Account Verified</h1>
                <p className="lead text-center">
                  You may sign in to your DevConnector account
                </p>
                <div className="text-center">
                  <Link
                    to="/login"
                    value="Login"
                    className="btn btn-info btn-lg mt-4"
                  >
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="login">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <p className="lead text-center">{response}</p>
                <div className="text-center">
                  {/* <Link
                    to="/resendVerification"
                    value="Login"
                    className="btn btn-info btn-lg mt-4"
                  >
                    Resend Confirmation Email
                  </Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default AccountVerify;
