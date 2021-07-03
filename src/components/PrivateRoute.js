import { Route, Navigate } from "react-router-dom";

export const PrivateRoute = ({ path, ...props }) => {
  return JSON.parse(localStorage?.getItem("accessToken")) ? (
    <Route path={path} {...props} />
  ) : (
    <Navigate state={{ from: path }} replace to="/welcome" />
  );
}
