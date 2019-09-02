import React , {useState}from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import { Keyboard } from "../src/components/Keypad/Keyboard";

const inputField = ({ inputValue }) => <input value={inputValue} readOnly></input>;
const HookKeypad =(props) => {
  let [value , setValue] = useState('');

  return (
    <div style={{display: 'flex', flexDirection:'column', height: '100vh'}}>
    <input value={value} readOnly/>
    <span style={{flex:1}} />
    <Keyboard
      platform="ios"
      handleSubmit={v => console.log(v)}
      layout='hide_point'
      handleChange={v=> setValue(v)}
    ></Keyboard>
    </div>
  )}
  const CustomLogicKeypad =(props) => {
    let [customValue , setValue] = useState('');

    function customChange(value) {
      let newVal = "";
      if (value === "-") {
        newVal = customValue.slice(0, -1);
      } else {
        newVal = customValue.concat(value);
      }
      setValue(newVal);
    }
  
    return (
      <div style={{display: 'flex', flexDirection:'column', height: '100vh'}}>
      <input value={customValue} readOnly/>
      <span style={{flex:1}} />
      <Keyboard
        platform="ios"
        handleSubmit={v => console.log("Submit")}
        customLogic
        layout='hide_point'
        handleChange={customChange}
      ></Keyboard>
      </div>
    )}

storiesOf("Keypad", module).add("with input props", () => (
  <Keyboard
    InputComp={inputField}
    platform="ios"
    handleSubmit={value => console.log("value", value)}
    layout='hide_point'
  ></Keyboard>
)).add("without input", () => <HookKeypad />).add("Custom Input", () => <CustomLogicKeypad />);
