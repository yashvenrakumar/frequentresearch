import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";
import PrivateRoute from "../components/PrivateRoute";
import PublicRoute from "../components/PublicRoute";
import { publicRoutes, privateRoutes } from "../routes";

function AppRoutes() {
  const accessToken = useSelector(
    (state: RootState) => state.userAuth.login?.accessToken
  );
  const isAuthenticated = Boolean(accessToken);

  return (
    <Routes>
      {privateRoutes.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={<PrivateRoute element={element} isAuthenticated={isAuthenticated} />}
        />
      ))}
      {publicRoutes.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={<PublicRoute element={element} isAuthenticated={isAuthenticated} />}
        />
      ))}
    </Routes>
  );
}

export default AppRoutes;
