import React, { useState } from "react";
import styled from "styled-components";

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
  const [isId, setIsId] = useState<boolean>(false);
  const [idError, setIdError] = useState<string>("");
  const blank = /[\s]/g;

  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState({
    lengthCorrect: false,
    special: false,
  });
  const special = /[`~!@#$%^&*|\\\'\";:\/?]/gi;

  const [isPasswordConfirm, setIsPasswordConfirm] = useState<boolean>(false);
  const [passwordConfirmError, setPasswordConfirmError] = useState<string>("");

  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string>("");
  const emailPattern =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  const [userInfo, setUserInfo] = useState({
    email: "",
    id: "",
    password: "",
    passwordConfirm: "",
  });

  const inputHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setUserInfo({ ...userInfo, [name]: value });
    console.log(userInfo);

    if (name === "email") {
      if (value && !emailPattern.test(value)) {
        setEmailError("올바른 이메일 형식을 입력하세요");
        setIsEmail(true);
      } else {
        setIsEmail(false);
      }
    } else if (name === "id") {
      if (blank.test(value)) {
        setIdError("공백이 입력되었습니다. 제거해주세요");
        setIsId(true);
      } else if (value && value.length < 5) {
        setIdError("더 길게 입력해주세요");
        setIsId(true);
      } else {
        setIsId(false);
      }
    } else if (name === "password") {
      if (value && value.length > 8) {
        setPasswordError((current) => {
          let newCondition = { ...current };
          newCondition.lengthCorrect = true;
          return newCondition;
        });
      } else {
        setPasswordError((current) => {
          let newCondition = { ...current };
          newCondition.lengthCorrect = false;
          return newCondition;
        });
      }
      if (special.test(value)) {
        setPasswordError((current) => {
          let newCondition = { ...current };
          newCondition.special = true;
          return newCondition;
        });
      } else {
        setPasswordError((current) => {
          let newCondition = { ...current };
          newCondition.special = false;
          return newCondition;
        });
      }
    } else if (name === "passwordConfirm") {
      if (value && userInfo.password !== value) {
        setPasswordConfirmError("비밀번호가 다릅니다");
        setIsPasswordConfirm(true);
      } else {
        setPasswordConfirmError("비밀번호가 일치합니다");
        setIsPasswordConfirm(false);
      }
    }
  };

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
              <input
                name="email"
                placeholder="email"
                value={userInfo.email}
                onChange={inputHandle}
              />
              <p>{isEmail ? emailError : null}</p>
              <input
                name="id"
                placeholder="id"
                value={userInfo.id}
                onChange={inputHandle}
              />
              <p>{isId ? idError : null}</p>
              <input
                name="password"
                type="password"
                placeholder="password"
                value={userInfo.password}
                onChange={inputHandle}
              />
              <p>
                <span>{passwordError.lengthCorrect ? "☘️" : "🍂"}</span>
                8자 이상 입력하세요
              </p>
              <p>
                <span>{passwordError.special ? "☘️" : "🍂"}</span>
                특수문자를 입력하세요
              </p>
              <input
                name="passwordConfirm"
                type="password"
                placeholder="password confirm"
                value={userInfo.passwordConfirm}
                onChange={inputHandle}
                className={isPasswordConfirm ? "active" : undefined}
              />
              <p>{isPasswordConfirm ? passwordConfirmError : null}</p>
              <input type="submit" value={"회원가입"} />
            </form>
          </FormWrap>
        </ContentsWrap>
      </Background>
    </div>
  );
}

export default App;
