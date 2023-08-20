// parent level component
import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { signOutStart } from "../../store/user/user.action";

import { selectIsCartOpen } from "../../store/cart/cart.selector";

import "./navigation.styles";

import {
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavLink,
} from "./navigation.styles";

function Navigation() {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);

  const signOutUser = () => dispatch(signOutStart());

  return (
    // renders to nothing on page, used as a wrapping div for components
    <Fragment>
      {/*introducing styled-components */}
      <NavigationContainer>
        <LogoContainer to="/">
          {/* svg file imported an used as a component */}
          <CrwnLogo />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>
          {/* show sign out button if user is signed in */}
          {currentUser ? (
            <NavLink as="span" onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      {/* Render H1 first and then render everything else inside <Route/> component */}
      <Outlet />
    </Fragment>
  );
}

export default Navigation;
