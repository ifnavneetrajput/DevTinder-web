import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./Components/Body";
import Login from "./Components/Login";
import appStore from "./utils/appStore";
import { Provider } from "react-redux";
import Feed from "./Components/Feed";
import Profile from "./Components/Profile";
function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/feed" element={<Feed />}></Route>
              <Route path="/profile" element={<Profile />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
