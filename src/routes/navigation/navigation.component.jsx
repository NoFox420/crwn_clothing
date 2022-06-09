// parent level component
import { Outlet, Link } from "react-router-dom";
import { Fragment } from "react";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import "./navigation.styles.scss";

function Navigation() {
  return (
    // renders to nothing on page, used as a wrapping div for components
    <Fragment>
      <div className="navigation">
        {/* essentially an anchor tag, to match the BrowserRouter */}
        <Link className="logo-container" to="/">
          {/* svg file imported an used as a component */}
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
        </div>
      </div>
      {/* Render H1 first and then render everything else inside <Route/> component */}
      <Outlet />
    </Fragment>
  );
}

export default Navigation;
