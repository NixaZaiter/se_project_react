import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
// import CurrentUserContext from "../contexts/CurrentUserContext";

function ProtectedRoute({ children, anonymous = false }) {
  const location = useLocation();
  const from = location.state?.from || "/";

  const { isLoggedIn } = useContext(CurrentUserContext);

  if (anonymous && isLoggedIn) {
    return <Navigate to={from} />;
  }

  if (!anonymous && !isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // Otherwise, render the protected route's child component.
  return children;
}

export default ProtectedRoute;
