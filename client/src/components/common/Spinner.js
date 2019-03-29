import React from "react";
import spinner from "./spinner.gif";
import "./Spinner.css";

export default function Spinner() {
  return (
    /* <img
        src={spinner}
        alt="Loading..."
        style={{ width: "200px", margin: "auto", display: "block" }}
      /> */

    <div class="spinner">
      <div class="rect1" />
      <div class="rect2" />
      <div class="rect3" />
      <div class="rect4" />
      <div class="rect5" />
    </div>
  );
}
