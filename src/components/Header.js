import React from "react";
import logo from "../components/spacex-logo-vector.svg";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      {/* <span>SPACEX</span> */}
      <img src={logo} alt="logo"></img>
      {/* style={{ width: 250 }} */}
      <hr></hr>
    </div>
  );
};

export default Header;
