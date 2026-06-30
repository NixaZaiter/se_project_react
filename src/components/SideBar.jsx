import "./styles/SideBar.css";
import avatarDefault from "../assets/avatar.svg";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts";

export default function SideBar() {
  const currentUser = useContext(CurrentUserContext);
  const username = currentUser.name;
  const avatar = currentUser.avatarURL;

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
