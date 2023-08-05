import React from "react";
import SignupInput from "./SignupInput";

const Form = () => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={onSubmit}>
      <SignupInput inputName={"email"} />
      <SignupInput inputName={"id"} />
      <SignupInput inputName={"password"} />
      <SignupInput inputName={"passwordConfirm"} />
      <input type="submit" value={"회원가입"} />
    </form>
  );
};

export default Form;
