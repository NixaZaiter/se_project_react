import { Link } from "react-router-dom";
import { useContext } from "react";
import "./styles/Header.css";
import logo from "../assets/logo.svg";
import avatarDefault from "../assets/avatar.svg";

import { ToggleSwitch } from "./index";
import { CurrentUserContext } from "../contexts";

export default function Header({
  handleLoginClick,
  handleRegisterClick,
  handleAddClick,
  weatherData,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);
  const username = currentUser.name;
  const avatar = currentUser.avatarURL;
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
        {isLoggedIn ? (
          <>
            <button
              onClick={handleAddClick}
              type="button"
              className="header__btn header__add-clothes-btn"
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
          </>
        ) : (
          <>
            <button
              onClick={handleRegisterClick}
              type="button"
              className="header__btn header__signup-btn"
            >
              Sign Up
            </button>
            <button
              onClick={handleLoginClick}
              type="button"
              className="header__btn header__login-btn"
            >
              Log In
            </button>
          </>
        )}
      </div>
    </header>
  );
}
