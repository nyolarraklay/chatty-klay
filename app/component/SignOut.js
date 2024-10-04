"use client";

import { getAuth, signOut } from "firebase/auth";
import { useRecoilState } from "recoil";
import userState from "../atom/userAtom";
import { app } from "../../firebase";
import { useRouter } from "next/navigation";
import userAvatar from "../atom/userAvatar";
import Avatar from "./Avatar";

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

  console.log(userAvatarFile);

  return (
    <>
      {userAvatarFile && (
        <div className="flex items-center space-x-4 p-5" onClick={onSignOut}>
          <Avatar user={userAvatarFile} />
          <h1 className="text-pretty">{userAvatarFile.displayName}</h1>
        </div>
      )}
    </>
  );
}
