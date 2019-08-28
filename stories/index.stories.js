import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import { Keyboard } from "../src/components/Keypad/Keyboard";

const inputField = ({ inputValue }) => <p>{inputValue}</p>;
storiesOf("KB", module).add("with text", () => (
  <Keyboard
    // InputComp={inputField}
    platform="ios"
    handleSubmit={value => console.log("value", value)}
    layout='hide_point'
  ></Keyboard>
));
