import React from "react";
import spinner from "./477.gif";
import "./Spinner.css";

export default function Spinner() {
  return (
    <img
      src={spinner}
      alt="Loading..."
      style={{ width: "40px", margin: "auto", display: "block" }}
    />

    // <div className="spinner">
    //   <div className="rect1" />
    //   <div className="rect2" />
    //   <div className="rect3" />
    //   <div className="rect4" />
    //   <div className="rect5" />
    // </div>
  );
}
