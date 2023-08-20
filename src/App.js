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
import { checkUserSession } from "./store/user/user.action";

function App() {
  const dispatch = useDispatch();

  //stops listener if component unmounts
  useEffect(() => {
    dispatch(checkUserSession());
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
