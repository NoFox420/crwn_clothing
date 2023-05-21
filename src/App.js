import { Routes, Route } from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";
import Home from "./routes/home/home.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";

function App() {
  return (
    // specifying there will be some routes
    <Routes>
      {/* specifying the route and the element to render when route is accessed */}
      <Route path="/" element={<Navigation />}>
        {/* if path = / render this element in <Outlet/> in parent component */}
        <Route index element={<Home />} />
        {/* if path = / render <Navigation/> and <Shop/> */}
        <Route path="shop" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
      </Route>
    </Routes>
  );
}

export default App;
