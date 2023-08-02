import React, { useState } from "react";
import styled from "styled-components";
import SignupInput from "./components/SignupInput";

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: teal;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentsWrap = styled.div`
  background-color: #fff;
  border-radius: 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  width: 350px;
  height: 650px;
  h2 {
    width: 100%;
    font-size: 24px;
    text-align: center;
    margin-bottom: 10px;
  }
  form {
  }
  input {
    display: block;
    height: 30px;
    text-indent: 10px;
    margin: 10px 0;
    border: 0.7px solid;
    border-radius: 15px;
  }
  input:last-child {
    width: 150px;
    text-indent: 0;
    text-align: center;
    margin: 10px auto;
  }
  p {
    height: 15px;
    font-size: 12px;
  }
  .active {
    border-color: red;
  }
`;
const FormWrap = styled.div`
  display: inline-block;
  margin: 0 auto;
`;

function App() {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="App">
      <Background>
        <ContentsWrap>
          <h2>SIGN UP</h2>
          <FormWrap>
            <form onSubmit={onSubmit}>
              <SignupInput inputName={"email"} />
              <SignupInput inputName={"id"} />
              <SignupInput inputName={"password"} />
              <SignupInput inputName={"passwordConfirm"} />
              <input type="submit" value={"회원가입"} />
            </form>
          </FormWrap>
        </ContentsWrap>
      </Background>
    </div>
  );
}

export default App;
