import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";

import { ToggleSwitch } from "../index";

export default function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <div className="header__container header__container_logo">
        <Link to="/">
          <img className="header__logo" src={logo} alt="WTWR logo" />
        </Link>
        <p className="header__local-time">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <div className="header__container header__container_nav">
        <ToggleSwitch />
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-btn"
        >
          + Add clothes
        </button>
        <Link to="/profile">
          <div className="header__container header__container_profile">
            <p className="header__user-name">Terrence Tegegne</p>
            <img src={avatar} alt="Avatar" className="header__avatar" />
          </div>
        </Link>
      </div>
    </header>
  );
}
