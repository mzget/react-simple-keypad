import React, { Component } from "react";
import produce from "immer";

import styled from "styled-components";
import KeyboardReact from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import "./mobile.css";

import layout from "simple-keyboard-layouts/build/layouts/thai";
import enlayout from "simple-keyboard-layouts/build/layouts/english";

const InputStyled = styled.input`
  width: 100%;
  height: 100px;
  padding: 20px;
  font-size: 20px;
  border: none;
  box-sizing: border-box;
`;

type ReactSKBState = {
  layoutName: string;
  input: string;
  lang: string;
};
class ReactSKB extends Component<any, ReactSKBState> {
  keyboard: any;
  thLayout: any;
  enLayout: any;
  mobileLayout: any;
  display = {
    "{locale}": "กขค",
    "{numbers}": "123",
    "{ent}": "return",
    "{escape}": "esc ⎋",
    "{tab}": "tab ⇥",
    "{backspace}": "⌫",
    "{capslock}": "caps lock ⇪",
    "{shift}": "⇧",
    "{controlleft}": "ctrl ⌃",
    "{controlright}": "ctrl ⌃",
    "{altleft}": "alt ⌥",
    "{altright}": "alt ⌥",
    "{metaleft}": "cmd ⌘",
    "{metaright}": "cmd ⌘",
    "{abc}": "ABC"
  };

  constructor(props) {
    super(props);

    this.state = {
      layoutName: "default",
      input: "",
      lang: "EN"
    };

    this.mobileLayout = {
      default: [
        "q w e r t y u i o p",
        "a s d f g h j k l",
        "{shift} z x c v b n m {backspace}",
        "{numbers} {locale} {space} {ent}"
      ],
      shift: [
        "Q W E R T Y U I O P",
        "A S D F G H J K L",
        "{shift} Z X C V B N M {backspace}",
        "{numbers} {locale} {space} {ent}"
      ],
      numbers: ["1 2 3", "4 5 6", "7 8 9", "{abc} 0 {backspace}"]
    };

    this.keyboard = React.createRef();
    this.thLayout = produce(layout, draftState => {
      let lastDefault = draftState["default"][4].split(" ");
      lastDefault[0] = "{locale}";
      draftState["default"][4] = lastDefault.join(" ");

      let lastShift = draftState["shift"][4].split(" ");
      lastShift[0] = "{locale}";
      draftState["shift"][4] = lastShift.join(" ");
    });

    this.enLayout = produce(enlayout, draftState => {
      let lastDefault = draftState["default"][4].split(" ");
      lastDefault[0] = "{th}";
      draftState["default"][4] = lastDefault.join(" ");

      let lastShift = draftState["shift"][4].split(" ");
      lastShift[0] = "{th}";
      draftState["shift"][4] = lastShift.join(" ");
    });

    console.log("th-layout", this.thLayout);
    console.log("en-layout", this.enLayout);
  }

  onChange = input => {
    this.setState({
      input: input
    });
  };

  onKeyPress = button => {
    console.log("Button pressed", button);

    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") this.handleShift();
    if (button === "{locale}") this.handleLocale();
    if (button === "{numbers}" || button === "{abc}") this.handleNumbers();
  };

  handleShift = () => {
    let layoutName = this.state.layoutName;

    this.setState({
      layoutName: layoutName === "default" ? "shift" : "default"
    });
  };

  handleLocale = () => {
    this.setState(
      prev => ({
        lang: prev.lang === "TH" ? "EN" : "TH"
      }),
      () => {
        this.display["{locale}"] = this.state.lang === "TH" ? "ABC" : "กขค";
      }
    );
  };
  handleNumbers = () => {
    let currentLayout = this.state.layoutName;
    let numbersToggle = currentLayout !== "numbers" ? "numbers" : "default";

    this.setState({
      layoutName: numbersToggle
    });
  };
  onChangeInput = event => {
    let input = event.target.value;
    this.setState(
      {
        input: input
      },
      () => {
        this.keyboard.setInput(input);
      }
    );
  };

  render() {
    return (
      <div>
        <InputStyled
          value={this.state.input}
          placeholder={"Tap on the virtual keyboard to start"}
          onChange={e => this.onChangeInput(e)}
        />
        <KeyboardReact
          ref={this.keyboard}
          layoutName={this.state.layoutName}
          onChange={(input: string) => this.onChange(input)}
          onKeyPress={(button: string) => this.onKeyPress(button)}
          layout={this.state.lang === "TH" ? this.thLayout : this.mobileLayout}
          display={this.display}
        />
      </div>
    );
  }
}

export default ReactSKB;
