"use client";

import { getAuth, signOut } from "firebase/auth";
import { useRecoilState } from "recoil";
import userState from "../atom/userAtom";
import { app } from "../../firebase";
import { useRouter } from "next/navigation";
import userAvatar from "../atom/userAvatar";

export default function SignOut() {
  const [currentUser, setCurrentUser] = useRecoilState(userState);
  const [userAvatarFile, setUserAvatarFile] = useRecoilState(userAvatar);
  const auth = getAuth(app);
  const router = useRouter();

  async function onSignOut() {
    try {
      await signOut(auth);
      setCurrentUser(false);
      setUserAvatarFile({
        photo: "",
        displayName: "",
        email: "",
        uid: "",
      });
      router.push("/");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  }

  return (
    <div>
      <button onClick={onSignOut}>Log-out</button>
    </div>
  );
}
