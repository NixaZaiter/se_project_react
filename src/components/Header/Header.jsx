import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <div className="header__container header__container_logo">
        <img className="header__logo" src={logo} alt="WTWR logo" />
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
        <div className="header__container header__container_profile">
          <p className="header__user-name">Terrence Tegegne</p>
          <img src={avatar} alt="Avatar" className="header__avatar" />
        </div>
      </div>
    </header>
  );
}
export default Header;
