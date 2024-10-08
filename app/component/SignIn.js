"use client";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import userState from "../atom/userAtom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app, db } from "../../firebase";
import { useRouter } from "next/navigation";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

export default function SignIn() {
  const [currentUser, setCurrentUser] = useRecoilState(userState);
  const auth = getAuth(app);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userRef = auth.currentUser.providerData[0];
          const docRef = doc(db, "users", userRef.uid);
          const docSnap = await getDoc(docRef);
          if (!docSnap.exists()) {
            await setDoc(docRef, {
              displayName: userRef.displayName,
              email: userRef.email,
              photo: userRef.photoURL,
              uid: userRef.uid,
              timestamp: serverTimestamp(),
              username: userRef.displayName.split(" ").join(""),
            });
          }

          setCurrentUser(true);
          router.push("/chat");
        } catch (error) {
          console.error("Error signing in: ", error);
        }
      }
    });

    return () => unsubscribe();
  }, [auth, router, setCurrentUser]);

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
