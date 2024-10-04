"use client";

import Head from "next/head";
import { useEffect } from "react";
import ChatSidebar from "../component/ChatSidebar";
import { onSnapshot, query, collection, where } from "firebase/firestore";
import userAvatar from "../atom/userAvatar";
import { useRecoilState } from "recoil";
import { app, db } from "../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Chat() {
  const [userAvatarFile, setUserAvatarFile] = useRecoilState(userAvatar);
  const auth = getAuth(app);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.auth.currentUser.providerData[0].uid;
        const unsubscribe = onSnapshot(
          query(collection(db, "users"), where("uid", "==", uid)),
          (snapshot) => {
            const userData = snapshot.docs.map((doc) => doc.data());
            setUserAvatarFile(userData[0] || null);
          },
        );
        return unsubscribe;
      } else {
        setUserAvatarFile(null);
      }
    });
  }, [db]);

  return (
    <>
      <Head>
        <title>New Chat</title>
        <meta name="description" content="Ask chatty-klay anything" />
      </Head>

      <div className="grid h-screen grid-cols-[260px_1fr]">
        <ChatSidebar />
        <div className="bg-gray-700 flex flex-col flex-1">
          <div className=" flex-1">Chat</div>
          <footer className="bg-gray-800 p-10">Footer</footer>
        </div>
      </div>
    </>
  );
}
