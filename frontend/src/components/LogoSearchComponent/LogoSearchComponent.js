import React from "react";
import Logo from "../../img/logo.png";
import { UilSearch } from "@iconscout/react-unicons";
import "./LogoSearchComponent.css"
const LogoSearchComponent = () => {
  return (
    <div className="LogoSearchComponent">
      <img src={Logo} alt="Logo"></img>
      <div className="searchInput">
        <input type="text" placeholder="Kousik Roy"></input>
        <div className="searchIcon">
          <UilSearch />
        </div>
      </div>
    </div>
  );
};

export default LogoSearchComponent;
