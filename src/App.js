import { Routes, Route } from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";
import Home from "./routes/home/home.component";
import SignIn from "./routes/sign-in/sign-in.component";

function Shop() {
  return <h1>Shop Page</h1>;
}

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
        <Route path="sign-in" element={<SignIn />} />
      </Route>
    </Routes>
  );
}

export default App;
