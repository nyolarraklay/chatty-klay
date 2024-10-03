"use client";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import userState from "../atom/userAtom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [currentUser, setCurrentUser] = useRecoilState(userState);
  const auth = getAuth(app);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        router.push("/");
      }
      setCurrentUser(!!user);
    });
    return () => unsubscribe();
  });

  function onSignOut() {
    signOut(auth);
    setCurrentUser(false);
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full bg-gray-800 text-center text-white space-x-6">
      <h1 className="text-4xl font-bold">
        Welcome to the Chatty Klay Chat App
      </h1>
      {currentUser ? (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={onSignOut}
        >
          Log-out
        </button>
      ) : (
        <div className="flex justify-center items-center min-h-screen w-full bg-gray-800 text-center text-white space-x-6">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => router.push("/signIn")}
          >
            Sign-In
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
