"use client";
import { useEffect } from "react";
import * as firebaseui from "firebaseui";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import "firebaseui/dist/firebaseui.css";
import { app } from "../../firebase";
import firebase from "firebase/compat/app";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  useEffect(() => {
    const auth = getAuth(app); // Ensure you're using Firebase v9's modular approach
    const ui =
      firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);

    ui.start("#firebaseui-auth-container", {
      signInOptions: [
        {
          provider: "password", // Email/Password sign-in
          requireDisplayName: true,
        },
        {
          provider: "google.com", // Google sign-in
        },
      ],
      signInSuccessUrl: "/", // URL to redirect to after successful sign-in
      signInFlow: "popup", // Use popup for Google sign-in
    });
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-gray-800 text-center text-white">
      <div id="firebaseui-auth-container"></div>
    </div>
  );
}
