import "./App.css";
import Header from "./Components/Header";
import Main from "./Components/Main";
import { useState } from "react";
import stays from "./stays";
import Footer from "./Components/Footer";

function App() {
  const [display, setDisplay] = useState(stays);

  return (
    <div className="App">
      <Header display={display} setDisplay={setDisplay} />
      <Main display={display} setDisplay={setDisplay} />
      <Footer />
    </div>
  );
}

export default App;
