import React, { Component } from "react";
import produce from "immer";

import styled from "styled-components";
import KeyboardReact from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

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

  constructor(props) {
    super(props);

    this.state = {
      layoutName: "default",
      input: "",
      lang: "TH"
    };

    this.keyboard = React.createRef();
    this.thLayout = produce(layout, draftState => {
      let lastDefault = draftState["default"][4].split(" ");
      lastDefault[0] = "{TH/EN}";
      draftState["default"][4] = lastDefault.join(" ");

      let lastShift = draftState["shift"][4].split(" ");
      lastShift[0] = "{TH/EN}";
      draftState["shift"][4] = lastShift.join(" ");
    });

    this.enLayout = produce(enlayout, draftState => {
      let lastDefault = draftState["default"][4].split(" ");
      lastDefault[0] = "{TH/EN}";
      draftState["default"][4] = lastDefault.join(" ");

      let lastShift = draftState["shift"][4].split(" ");
      lastShift[0] = "{TH/EN}";
      draftState["shift"][4] = lastShift.join(" ");
    });

    console.log("th-layout", this.thLayout);
    console.log("en-layout", this.enLayout);
  }

  onChange = input => {
    this.setState({
      input: input
    });
    console.log("Input changed", input);
  };

  onKeyPress = button => {
    console.log("Button pressed", button);

    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") this.handleShift();
    if (button === "{TH/EN}") this.handleLocale();
  };

  handleShift = () => {
    let layoutName = this.state.layoutName;

    this.setState({
      layoutName: layoutName === "default" ? "shift" : "default"
    });
  };

  handleLocale = () => {
    this.setState(prev => ({
      lang: prev.lang === "TH" ? "EN" : "TH"
    }));
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
          layout={this.state.lang === "TH" ? this.thLayout : this.enLayout}
        />
      </div>
    );
  }
}

export default ReactSKB;
