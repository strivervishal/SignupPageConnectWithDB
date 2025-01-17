import React from "react";
import { Routes, Route } from "react-router-dom";
import SignupForm from "./components/SignupForm";
import WelcomePage from "./components/WelcomePage";
import LoginForm from "./components/LoginForm";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SignupForm />} />
      <Route path="/welcome" element={<WelcomePage />} />
      <Route path="/signin" element={<LoginForm />} />
    </Routes>
  );
};

export default App;
