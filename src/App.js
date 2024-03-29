import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
  getCurrentUser,
} from "./utils/firebase/firebase.utils";

import { Routes, Route } from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";
import Home from "./routes/home/home.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import { setCurrentUser } from "./store/user/user.slice";

function App() {
  const dispatch = useDispatch();

  //stops listener if component unmounts
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      //only selecting useful values from user object and returning a new object if user is true in first place
      //higher order function that returns another function
      const pickedUser =
        user && (({ accessToken, email }) => ({ accessToken, email }))(user);

      dispatch(setCurrentUser(pickedUser));
    });
    return unsubscribe;
  }, []);

  return (
    // specifying there will be some routes
    <Routes>
      {/* specifying the route and the element to render when route is accessed */}
      <Route path="/" element={<Navigation />}>
        {/* if path = / render this element in <Outlet/> in parent component */}
        <Route index element={<Home />} />
        {/* if path = / render <Navigation/> and <Shop/> */}
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
}

export default App;
