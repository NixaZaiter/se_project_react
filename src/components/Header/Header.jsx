import "./Header.css";
function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <>
      <section className="header">
        <div className="header__container">
          <img
            className="header__logo"
            src="./src/assets/Logo.svg"
            alt="WTWR logo"
          />
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
          <img
            src="./src/assets/avatar.png"
            alt="Avatar"
            className="header__avatar"
          />
        </div>
      </section>
    </>
  );
}
export default Header;
