import React from "react";
import styled from "styled-components";

// import NumpadDelete from "./iconNumpadDelete.png";

type KeyboardProps = {
  InputComp?: React.ComponentType<{ inputValue: string }>;
  platform?: "ios" | "android";
  handleSubmit: (value: string) => void;
};

const btns = [1, 2, 3, 4, 5, 6, 7, 8, 9, ".", 0, "-"];
class FullKeyboard extends React.Component<
  KeyboardProps,
  { inputValue: string }
> {
  constructor(props: any) {
    super(props);

    const { handleSubmit, InputComp, platform } = this.props;
    this.state = {
      inputValue: ""
    };

    this.handleDone = this.handleDone.bind(this);
    this.handleMouseExit = this.handleMouseExit.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleBtnClick = this.handleBtnClick.bind(this);
  }

  handleBtnClick = (value: string) => (e: any) => {
    e.preventDefault();

    const { inputValue } = this.state;
    console.log(value);

    let newVal = "";
    if (value === "-") {
      newVal = inputValue.slice(0, -1);
    } else {
      newVal = inputValue.concat(value);
    }
    this.setState({ inputValue: newVal });
  };

  handleDone = (e: any) => {
    e.preventDefault();
    const { inputValue } = this.state;
    const { handleSubmit } = this.props;

    handleSubmit(inputValue);
  };

  handleMouseEnter = (e: any) => {
    let temp = e.target.getAttribute("class");
    console.log("down", temp);
    if (!!temp) {
      e.target.setAttribute("class", `padClick ${temp}`);
    }
  };
  handleMouseExit = (e: any) => {
    let temp = e.target.getAttribute("class");
    console.log("up", temp);
    if (!!temp) {
      e.target.setAttribute("class", temp.replace("padClick ", ""));
    }
  };

  render() {
    const { handleSubmit, InputComp, platform } = this.props;
    const { inputValue } = this.state;
    return (
      <Container platform={platform}>
        {!!InputComp ? <InputComp inputValue={inputValue} /> : null}
        <ActionPad>
          <DoneBtn onClick={this.handleDone}>Done</DoneBtn>
        </ActionPad>
        <KeypadContainer className="test">
          {btns.map((v, i, arr) => (
            <ButtonPad
              key={v.toString()}
              onClick={this.handleBtnClick(v.toString())}
              onMouseDown={this.handleMouseEnter}
              onMouseUp={this.handleMouseExit}
              onMouseOut={this.handleMouseExit}
            >
              {v !== "-" ? v : <img src={""} width={24} height={24} />}
            </ButtonPad>
          ))}
        </KeypadContainer>
      </Container>
    );
  }
}

export { FullKeyboard };

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
