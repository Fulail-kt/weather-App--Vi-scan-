import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Signin from "./pages/signin";
import Signup from "./pages/signup";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
