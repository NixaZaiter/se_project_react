import "./SideBar.css";
import avatarDefault from "../../assets/avatar.svg";

export default function SideBar() {
  const username = "Terrence Tegegne";
  const avatar = avatarDefault;

  return (
    <aside className="sidebar">
      <div className="sidebar__profile">
        <div className="sidebar__user-name">{username}</div>
        {avatar ? (
          <img
            src={avatar || avatarDefault}
            alt="Avatar"
            className="sidebar__avatar"
          />
        ) : (
          <span className="sidebar__avatar sidebar__avatar_none">
            {username?.toUpperCase().charAt(0) || ""}
          </span>
        )}
      </div>
    </aside>
  );
}
