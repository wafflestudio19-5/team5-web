import TestComponent from "./component/TestComponent/TestComponent";
import "./App.css";
import "./scss/main.scss";
import Home from "./component/Home/Home";
import { useState } from "react";
function App() {
  const [isLayoutDisplayed, setIsLayoutDisplayed] = useState<boolean>(false);
  return (
    <div className="App">
      {isLayoutDisplayed ? <Home /> : <TestComponent />}
      <button
        className="ChangeTestButton"
        onClick={() => setIsLayoutDisplayed(!isLayoutDisplayed)}
      >
        {isLayoutDisplayed ? "로그인 테스트로" : "레이아웃 테스트로"}
      </button>
    </div>
  );
}

export default App;
