import React, {useEffect} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  landing as landingRoutes,
  dashboard as dashboardRoutes,
  page as pageRoutes,
  // studentDashboard as stDashboard,
  student as studentDashboard
} from "./index";

import DashboardLayout from "../layouts/Dashboard";
import AuthLayout from "../layouts/Auth";
import Page404 from "../pages/auth/Page404";
import { connect,useDispatch } from "react-redux";
import { enableModernTheme } from "../redux/actions/themeActions";
import {selectRole} from "../redux/selectors/userLoginInfoSelector";

import ScrollToTop from "../components/ScrollToTop";

const childRoutes = (Layout, routes) =>
  routes.map(({ children, path, component: Component }, index) =>
    children ? (
      // Route item with children
      children.map(({ path, component: Component }, index) => (
        <Route
          key={index}
          path={path}
          exact
          render={props => (
            <Layout>
              <Component {...props} />
            </Layout>
          )}
        />
      ))
    ) : (
      // Route item without children
      <Route
        key={index}
        path={path}
        exact
        render={props => (
          <Layout>
            <Component {...props} />
          </Layout>
        )}
      />
    )
  );

const Routes = (props) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(enableModernTheme());
  }, [dispatch]);

  return(
  <Router>
    <ScrollToTop>
      <Switch>
        {childRoutes(DashboardLayout, landingRoutes)}
        {(props.role === "STUDENT") ? childRoutes(DashboardLayout, studentDashboard) : 
        childRoutes(DashboardLayout, dashboardRoutes) }

        {childRoutes(AuthLayout, pageRoutes)}
        <Route
          render={() => (
            <AuthLayout>
              <Page404 />
            </AuthLayout>
          )}
        />
      </Switch>
    </ScrollToTop>
  </Router>
  );
}
const mapGlobalStateToProps = state => {
  return {
      role: selectRole(state)
  };
};
export default connect(mapGlobalStateToProps)(Routes);

