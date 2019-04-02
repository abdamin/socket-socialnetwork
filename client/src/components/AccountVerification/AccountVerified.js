import React from "react";
import { Link } from "react-router-dom";

const AccountVerified = () => {
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
***REMOVED***

export default AccountVerified;
