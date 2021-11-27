import "./TestComponent.css";
import React from "react";
import TestLogIn from "./TestLogIn/TestLogIn";
import TestSignup from "./TestSignup/TestSignup";

const TestComponent = () => {
  return (
    <div className="TestComponent">
      <TestLogIn />
      <TestSignup />
    </div>
  );
};

export default TestComponent;
