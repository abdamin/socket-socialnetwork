import React from "react";
import { Link } from "react-router-dom";

const AccountVerified = () => {
  return (
    <div className="login">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <p className="display-4 text-center">This link has expired. </p>
            <div className="text-center">
              <Link
                to="/resendVerification"
                className="btn btn-info btn-lg mt-4"
              >
                Resend Verification Email
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountVerified;
