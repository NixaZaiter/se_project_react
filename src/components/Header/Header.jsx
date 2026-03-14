import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.svg";
import avatarDefault from "../../assets/avatar.svg";

import { ToggleSwitch } from "../index";

export default function Header({ handleAddClick, weatherData }) {
  const username = "Terrence Tegegne";
  const avatar = avatarDefault;
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
            <div className="header__user-name">{username}</div>
            {avatar ? (
              <img
                src={avatar || avatarDefault}
                alt="Avatar"
                className="header__avatar"
              />
            ) : (
              <span className="header__avatar header__avatar_none">
                {username?.toUpperCase().charAt(0) || ""}
              </span>
            )}
          </div>
        </Link>
      </div>
    </header>
  );
}
