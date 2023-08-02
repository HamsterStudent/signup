import { atom } from "recoil";
interface IUserInfo {
  [key: string]: string;
}
export const userInfoAtom = atom<IUserInfo>({
  key: "userInfo",
  default: { email: "", id: "", password: "", passwordConfirm: "" },
});
