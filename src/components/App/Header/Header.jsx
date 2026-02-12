import "./Header.css";
function Header() {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const currentLocation = "";
  return (
    <>
      <div className="header">
        <div className="header__container">
          <img className="header__logo" src="./src/assets/Logo.svg" alt="" />
          <p className="header__local-time">
            {currentDate}
            {currentLocation}
          </p>
        </div>
        <div className="header__container">
          <button className="header__btn">+ Add clothes</button>
          <p className="header__user-name"></p>
          <img src="" alt="" className="header__avatar" />
        </div>
      </div>
    </>
  );
}
export default Header;
