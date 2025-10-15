import React from "react";
import img from "../assets/images/final_logo.png";
export default function Logo() {
  // const style = {
  //   large: { width: "365px", height: "142px" },
  //   small: { width: "183px", height: "71px" },
  // };
  return (
    <div class="logo-container">
      <img src={img} alt="Logo"  className="logo-image" />
      <div class="progress-bar">
        <div class="progress-fill"></div>
      </div>
    </div>
  );
}
