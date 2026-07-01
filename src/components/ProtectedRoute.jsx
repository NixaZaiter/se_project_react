import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({
  children,
  isLoading,
  isLoggedIn,
  anonymous = false,
}) {
  const location = useLocation();
  const from = location.state?.from || "/";

  if (!isLoading) {
    if (anonymous && isLoggedIn) {
      return <Navigate to={from} />;
    }

    if (!anonymous && !isLoggedIn) {
      return <Navigate to="/signin" state={{ from: location }} />;
    }

    // Otherwise, render the protected route's child component.
    return children;
  }
}

export default ProtectedRoute;
