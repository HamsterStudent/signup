import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { userInfoAtom } from "../atom";

interface IInput {
  inputName: string;
}

interface IError {
  [key: string]: string | boolean;
}

const SignupInput = ({ inputName }: IInput) => {
  const [isError, setIsError] = useState<IError>({
    email: false,
    id: false,
    password: false,
    passwordConfirm: false,
  });
  const [errorMessage, setErrorMessage] = useState<IError>({
    email: "",
    id: "",
    password: "",
    passwordConfirm: "",
  });
  const [passwordError, setPasswordError] = useState({
    lengthCorrect: false,
    special: false,
  });
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);

  // 정규식
  const blank = /[\s]/g;
  const special = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
  const emailPattern =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  const messageCallback = (current: IError, message: string | boolean) => {
    let newCondition = { ...current };
    newCondition[inputName] = message;
    return newCondition;
  };

  const inputHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setUserInfo({ ...userInfo, [name]: value });

    if (name === "email") {
      if (value && !emailPattern.test(value)) {
        setIsError((current) => {
          return messageCallback(current, true);
        });
        setErrorMessage((current) => {
          return messageCallback(current, "올바른 이메일 형식을 입력하세요");
        });
      } else {
        setIsError((current) => {
          return messageCallback(current, false);
        });
      }
    } else if (name === "id") {
      if (blank.test(value)) {
        setIsError((current) => {
          return messageCallback(current, true);
        });
        setErrorMessage((current) => {
          return messageCallback(
            current,
            "공백이 입력되었습니다. 제거해주세요",
          );
        });
      } else if (value && value.length < 5) {
        setIsError((current) => {
          return messageCallback(current, true);
        });
        setErrorMessage((current) => {
          return messageCallback(current, "더 길게 입력해주세요");
        });
      } else {
        setIsError((current) => {
          return messageCallback(current, false);
        });
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
        setIsError((current) => {
          return messageCallback(current, true);
        });
        setErrorMessage((current) => {
          return messageCallback(current, "비밀번호가 다릅니다");
        });
      } else {
        setIsError((current) => {
          return messageCallback(current, false);
        });
        setErrorMessage((current) => {
          return messageCallback(current, "비밀번호가 일치합니다");
        });
      }
    }
  };

  return (
    <div>
      <input
        name={inputName}
        placeholder={inputName}
        value={userInfo[inputName]}
        onChange={inputHandle}
      />
      {inputName === "password" ? (
        <div>
          <p>
            <span>{passwordError.lengthCorrect ? "☘️" : "🍂"}</span>
            8자 이상 입력하세요
          </p>
          <p>
            <span>{passwordError.special ? "☘️" : "🍂"}</span>
            특수문자를 입력하세요
          </p>
        </div>
      ) : (
        <p>{isError[inputName] ? errorMessage[inputName] : null}</p>
      )}
    </div>
  );
};

export default SignupInput;
