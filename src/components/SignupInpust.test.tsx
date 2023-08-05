import {
  fireEvent,
  getByPlaceholderText,
  render,
  screen,
} from "@testing-library/react";
import SignupInput from "./SignupInput";
import Form from "./Form";
import { RecoilRoot } from "recoil";

describe("회원가입 폼", () => {
  test("form 내부 input들이 올바르게 랜더링 되는지 확인", () => {
    render(
      <RecoilRoot>
        <Form />
      </RecoilRoot>,
    );
    expect(screen.getByPlaceholderText("email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("id")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("passwordConfirm")).toBeInTheDocument();
  });

  test("잘못된 이메일 형식 입력시 에러메시지 송출", () => {
    render(
      <RecoilRoot>
        <SignupInput inputName={"email"} />
      </RecoilRoot>,
    );
    const email = screen.getByPlaceholderText("email");
    fireEvent.change(email, { target: { value: "invalid_email" } });
    const errorMessageElement =
      screen.getByText("올바른 이메일 형식을 입력하세요");
    expect(errorMessageElement).toBeInTheDocument();
  });

  test("아이디 공백 입력시 에러메시지 송출", () => {
    render(
      <RecoilRoot>
        <SignupInput inputName={"id"} />
      </RecoilRoot>,
    );
    const id = screen.getByPlaceholderText("id");
    fireEvent.change(id, { target: { value: " " } });
    const errorMessageElement = screen.getByText(
      "공백이 입력되었습니다. 제거해주세요",
    );
    expect(errorMessageElement).toBeInTheDocument();
  });

  test("비밀번호 길이가 8자리 이하일 경우 에러메시지 송출", () => {
    render(
      <RecoilRoot>
        <SignupInput inputName={"password"} />
      </RecoilRoot>,
    );
    const password = screen.getByPlaceholderText("password");
    fireEvent.change(password, { target: { value: "short" } });
    const errorMessageElement = screen.getByText("8자 이상 입력하세요");
    expect(errorMessageElement).toBeInTheDocument();
  });

  test("비밀번호 특수문자 입력하지 않았을 시, 에러메시지 송출", () => {
    render(
      <RecoilRoot>
        <SignupInput inputName="password" />
      </RecoilRoot>,
    );
    const password = screen.getByPlaceholderText("password");
    fireEvent.change(password, { target: { value: "password" } });
    const errorMessageElement =
      screen.getByText("특수문자를 2자 이상 입력하세요");
    expect(errorMessageElement).toBeInTheDocument();
  });

  test("비밀번호 확인과 비밀번호가 일치하지 않을 때, 에러메시지 송출", () => {
    render(
      <RecoilRoot>
        <SignupInput inputName="password" />
        <SignupInput inputName="passwordConfirm" />
      </RecoilRoot>,
    );
    const passwordInput = screen.getByPlaceholderText("password");
    const passwordConfirmInput = screen.getByPlaceholderText("passwordConfirm");

    fireEvent.change(passwordInput, {
      target: { value: "123123123" },
    });
    fireEvent.change(passwordConfirmInput, {
      target: { value: "hamsteriscute" },
    });

    const errorMessageElement = screen.getByText("비밀번호가 다릅니다");
    expect(errorMessageElement).toBeInTheDocument();
  });
});
