import React from "react";
import { Keyboard } from "./components/Keypad/Keyboard";

function App() {
  const inputField = ({ inputValue }: any) => <p>{inputValue}</p>;
  return (
    <div>
      <Keyboard
        InputComp={inputField}
        platform="android"
        handleSubmit={value => console.log("value", value)}
      ></Keyboard>
    </div>
  );
}

export default App;
