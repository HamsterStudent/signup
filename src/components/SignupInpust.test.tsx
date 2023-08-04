import { render } from "@testing-library/react";
import SignupInput from "./SignupInput";

describe("input 컴포넌트", () => {
  test("input 랜더링", () => {
    const name = "test";
    render(<SignupInput inputName={name} />);
  });
});
