import React from "react";
import logo from "../components/spacex-logo-vector.svg";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      {/* <span>SPACEX</span> */}
      <img style={{ width: 250 }} src={logo} alt="logo"></img>
      <hr></hr>
    </div>
  );
};

export default Header;
