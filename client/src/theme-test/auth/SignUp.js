import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => (
  <React.Fragment>
    <div className="container">
      <div className="row">
        <div className="col-md-3" />
        <div className="col-md-6">
          <div className="text-center mt-4">
            <h1 className="h2">Get started</h1>
            <p className="lead">Create your Devconnector account</p>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="m-sm-4">
                <form>
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      className="form-control border-4"
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                    />
                  </div>
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
                  </div>
                  <div className="form-group">
                    <label>Confirm Password</label>
                    <input
                      className="form-control border-4"
                      type="password"
                      name="password2"
                      placeholder="Confirm your password"
                    />
                  </div>
                  <div className="text-center mt-3">
                    <Link to="/dashboard/default">
                      <button className="btn btn-primary btn-lg">
                        Sign up
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

export default SignUp;
