import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <div className="header__container">
        <img className="header__logo" src={logo} alt="WTWR logo" />
        <p className="header__local-time">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <div className="header__container">
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-btn"
        >
          + Add clothes
        </button>
        <p className="header__user-name">Terrence Tegegne</p>
        <img src={avatar} alt="Avatar" className="header__avatar" />
      </div>
    </header>
  );
}
export default Header;
