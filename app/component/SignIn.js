"use client";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import userState from "../atom/userAtom";
import userAvatar from "../atom/userAvatar";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app, db } from "../../firebase";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [currentUser, setCurrentUser] = useRecoilState(userState);
  const [userAvatarFile, setUserAvatarFile] = useRecoilState(userAvatar);
  const auth = getAuth(app);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);

        setUserAvatarFile({
          photo: user.photoURL,
          displayName: user.displayName,
          email: user.email,
          uid: user.uid,
        });

        setCurrentUser(true);
        router.push("/chat");
      } else {
        setCurrentUser(false);
      }
    });
    return () => unsubscribe();
  }, [auth, router, setCurrentUser, setUserAvatarFile]);

  console.log(currentUser, userAvatarFile);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full bg-gray-800 text-center text-white space-y-6">
      <h1 className="text-3xl font-bold text-pretty">
        Welcome to the Chatty Klay Chat App
      </h1>

      {!currentUser && (
        <div className="space-x-6">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => router.push("/signIn")}
          >
            Log-In
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => router.push("/signIn")}
          >
            Sign-Up
          </button>
        </div>
      )}
    </div>
  );
}
