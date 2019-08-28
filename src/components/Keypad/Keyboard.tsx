import React, { useState, useCallback } from "react";
import styled from "styled-components";

// import NumpadDelete from "./iconNumpadDelete.png";

type KeyboardProps = {
  InputComp?: React.ComponentType<{ inputValue: string }>;
  platform?: "ios" | "android";
  layout?: "numpad" | "hide_point";
  handleSubmit: (value: string) => void;
};

function handleMouseEnter(e: any) {
  let temp = e.target.getAttribute("class");
  if (!!temp) {
    e.target.setAttribute("class", `padClick ${temp}`);
  }
}
function handleMouseExit(e: any) {
  let temp = e.target.getAttribute("class");
  if (!!temp) {
    e.target.setAttribute("class", temp.replace("padClick ", ""));
  }
}
const Keyboard = (props: KeyboardProps) => {
  let btns = [1, 2, 3, 4, 5, 6, 7, 8, 9, ".", 0, "-"];
  const {
    handleSubmit,
    InputComp,
    platform = "ios",
    layout = "numpad"
  } = props;
  const [inputValue, setValue] = useState("");

  if (layout === "hide_point") {
    btns = [1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "-"];
  }

  const handleBtnClick = useCallback(
    (value: string) => (e: any) => {
      e.preventDefault();

      let newVal = "";
      if (value === "-") {
        newVal = inputValue.slice(0, -1);
      } else {
        newVal = inputValue.concat(value);
      }
      setValue(newVal);
    },
    [inputValue]
  );

  const handleDone = useCallback(
    (e: any) => {
      e.preventDefault();

      handleSubmit(inputValue);
    },
    [inputValue]
  );

  return (
    <Container platform={platform}>
      {!!InputComp ? <InputComp inputValue={inputValue} /> : null}
      <ActionPad>
        <DoneBtn onClick={handleDone}>Done</DoneBtn>
      </ActionPad>
      <KeypadContainer className="test">
        {btns.map((v, i, arr) => (
          <ButtonPad
            key={v.toString()}
            onClick={handleBtnClick(v.toString())}
            onMouseDown={handleMouseEnter}
            onMouseUp={handleMouseExit}
            onMouseOut={handleMouseExit}
          >
            {v !== "-" ? v : <img src={""} width={24} height={24} />}
          </ButtonPad>
        ))}
      </KeypadContainer>
    </Container>
  );
};

export { Keyboard };

const Container = styled.div<any>`
  display: flex;
  flex-direction: ${props =>
    props.platform === "ios" ? "column" : "column-reverse"};
  width: 100vw;
`;

const KeypadContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 25% 25% 25% 25%;
  gap: 1px;
  background-color: #ebebeb;
`;

const ActionPad = styled.div`
  height: 48px;
  display: flex;
  justify-content: flex-end;
  background-color: #ebebeb;
`;

const ButtonPad = styled.button<any>`
  height: 54px;
  background-color: #f2f2f2;
  font-size: 24px;
  border: none;
  outline: none;
  &.padClick {
    background-color: #ebebeb;
  }
  user-select: none;
  color: inherit;
`;

const DoneBtn = styled.div`
  color: #45c2b1;
  margin-right: 38px;
  align-self: center;
  font-size: 18px;
  user-select: none;
`;
