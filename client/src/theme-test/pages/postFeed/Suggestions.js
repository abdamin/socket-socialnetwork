import React from "react";

import avatar2 from "../../avatars/avatar-2.jpg";
import avatar4 from "../../avatars/avatar-4.jpg";
import avatar5 from "../../avatars/avatar-5.jpg";

const Following = () => (
  <div className="card flex-fill mb-3">
    <div className="class-header">
      <div className="card-actions float-right" />
      <h5 className="card-title mb-3 mt-4 ml-3">Developers you may know</h5>
      <hr className="my-2" />
    </div>

    <div className="card-body">
      <div className="media">
        <img
          src={avatar5}
          style={{ width: "56px", height: "56px" }}
          className="rounded-circle mr-2"
          alt="Chris Wood"
        />
        <div className="media-body">
          <p className="my-1">
            <strong>Ashley Briggs</strong>
          </p>
          <button className="btn btn-outline-primary btn-sm">
            View Profile
          </button>
        </div>
      </div>

      <hr className="my-2" />

      <div className="media">
        <img
          src={avatar2}
          style={{ width: "56px", height: "56px" }}
          className="rounded-circle mr-2"
          alt="Carl Jenkins"
        />
        <div className="media-body">
          <p className="my-1">
            <strong>Carl Jenkins</strong>
          </p>
          <button className="btn btn-outline-primary btn-sm">
            View Profile
          </button>
        </div>
      </div>

      <hr className="my-2" />

      <div className="media">
        <img
          src={avatar4}
          style={{ width: "56px", height: "56px" }}
          className="rounded-circle mr-2"
          alt="Stacie Hall"
        />
        <div className="media-body">
          <p className="my-1">
            <strong>Stacie Hall</strong>
          </p>
          <button className="btn btn-outline-primary btn-sm">
            View Profile
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default Following;
