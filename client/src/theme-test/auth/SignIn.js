import React, { Component } from "react";
import avatar from "../avatars/avatar.jpg";
import { Link } from "react-router-dom";
// import "../css/classic.css";

class SignIn extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-md-3" />
            <div className="col-md-6">
              <div className="text-center mt-4">
                <h2>Welcome back</h2>
                <p className="lead">Sign in to your account to continue</p>
              </div>

              <div className="card">
                <div className="card-body">
                  <div className="m-sm-4">
                    <div className="text-center">
                      <img
                        src={avatar}
                        alt="Chris Wood"
                        className="img-fluid rounded-circle"
                        //   width="132"
                        //   height="132"
                        style={{ width: "132px", height: "132px" }}
                      />
                    </div>
                    <form>
                      <div className="form-group">
                        <label>Email</label>
                        <input
                          className="form-control border-4"
                          type="email"
                          name="email"
                          placeholder="Enter your email"
                        />
                      </div>
                      <div className="form-group">
                        <label>Password</label>
                        <input
                          className="form-control border-4"
                          type="password"
                          name="password"
                          placeholder="Enter your password"
                        />
                        <small>
                          <Link to="/auth/reset-password">
                            Forgot password?
                          </Link>
                        </small>
                      </div>
                      <div className="pl-3">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="rememberMe"
                        />
                        <label class="form-check-label" for="exampleCheck1">
                          Remember me next time
                        </label>
                      </div>
                      <div className="text-center mt-3">
                        <Link to="/dashboard/default">
                          <button className="btn btn-primary btn-lg">
                            Sign in
                          </button>
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3" />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SignIn;
