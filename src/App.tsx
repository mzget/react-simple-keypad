import React from "react";
import { Keyboard } from "./components/Keypad/Keyboard";
import ReactSKB from "./components/ReactSKB";

function App() {
  const inputField = ({ inputValue }: any) => <p>{inputValue}</p>;
  return (
    <div>
      <Keyboard
        InputComp={inputField}
        platform="android"
        handleSubmit={value => console.log("value", value)}
      ></Keyboard>
      <ReactSKB />
    </div>
  );
}

export default App;
