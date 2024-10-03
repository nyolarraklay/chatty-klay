import { atom } from "recoil";

const userState = atom({
  key: "userState",
  default: false,
});

export default userState;
